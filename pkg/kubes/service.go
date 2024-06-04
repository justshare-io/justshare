package kubes

import (
	"context"
	"fmt"
	"github.com/bufbuild/connect-go"
	"github.com/google/wire"
	"github.com/justshare-io/justshare/pkg/content"
	"github.com/justshare-io/justshare/pkg/gen/kubes"
	"github.com/justshare-io/justshare/pkg/gen/kubes/kubesconnect"
	"github.com/justshare-io/justshare/pkg/providers/openai"
	corev1 "k8s.io/api/core/v1"
	networkingv1 "k8s.io/api/networking/v1"
	kerrors "k8s.io/apimachinery/pkg/api/errors"
	"log/slog"
	"os"
	"path/filepath"
	"regexp"

	appsv1 "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

var ProviderSet = wire.NewSet(
	New,
	NewConfig,
)

type Service struct {
	c Config
	// TODO breadchris process should load config from file
	oc        openai.Config
	cc        content.Config
	clientSet *kubernetes.Clientset
}

const (
	configMapName = "gcs-config"
	port          = int32(80)
)

var _ kubesconnect.KubesServiceHandler = (*Service)(nil)

func New(c Config, oc openai.Config, cc content.Config) (*Service, error) {
	if !c.Enabled {
		slog.Warn("kubes service is disabled")
		return nil, nil
	}

	kubeconfig := filepath.Join(homedir.HomeDir(), ".kube", "config")

	// Build the configuration from the kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// Create a clientset for interacting with the Kubernetes cluster
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}
	return &Service{
		c:         c,
		oc:        oc,
		cc:        cc,
		clientSet: clientset,
	}, nil
}

func (s *Service) BuildImage(ctx context.Context, c *connect.Request[kubes.BuildImageRequest]) (*connect.Response[kubes.BuildImageResponse], error) {
	slog.Debug("building image", "dockerfile", c.Msg.Dockerfile, "image", c.Msg.Image)
	taggedImage, err := BuildAndTagImage(c.Msg.Context, c.Msg.Dockerfile, c.Msg.Image)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&kubes.BuildImageResponse{
		TaggedImage: taggedImage,
	}), nil
}

// TODO breadchris check user
func (s *Service) UpdateDeployment(ctx context.Context, c *connect.Request[kubes.UpdateDeploymentRequest]) (*connect.Response[kubes.UpdateDeploymentResponse], error) {
	_, err := s.clientSet.AppsV1().Deployments(s.c.DefaultNamespace).Get(ctx, c.Msg.Name, metav1.GetOptions{})
	if err != nil {
		if kerrors.IsNotFound(err) {
			return nil, fmt.Errorf("deployment %s in namespace %s not found", c.Msg.Name, s.c.DefaultNamespace)
		}
		return nil, fmt.Errorf("error getting deployment: %v", err)
	}

	container, err := addHashToImage("ghcr.io/justshare-io/justshare")
	if err != nil {
		return nil, err
	}

	if err = s.UpsertConfigMap(ctx); err != nil {
		return nil, err
	}

	d := NewDeployment(container, c.Msg.Name, configMapName, port, s.oc, s.cc)

	_, err = s.clientSet.AppsV1().Deployments(s.c.DefaultNamespace).Update(ctx, d, metav1.UpdateOptions{})
	if err != nil {
		return nil, fmt.Errorf("failed to update deployment: %v", err)
	}
	return connect.NewResponse(&kubes.UpdateDeploymentResponse{}), nil
}

func (s *Service) ListDeployments(ctx context.Context, c *connect.Request[kubes.ListDeploymentsRequest]) (*connect.Response[kubes.ListDeploymentsResponse], error) {
	deployments, err := s.deploymentsForNamespace(ctx, s.c.DefaultNamespace)
	if err != nil {
		return nil, err
	}

	var deploymentList []*kubes.Deployment
	for _, deployment := range deployments.Items {
		deploymentList = append(deploymentList, &kubes.Deployment{
			Id:        string(deployment.UID),
			Name:      deployment.Name,
			Namespace: deployment.Namespace,
			Image:     deployment.Spec.Template.Spec.Containers[0].Image,
			Replicas:  *deployment.Spec.Replicas,
			Status:    deployment.Status.String(),
		})
	}

	return connect.NewResponse(&kubes.ListDeploymentsResponse{
		Deployments: deploymentList,
	}), nil
}

func isValidK8sServiceName(name string) bool {
	if len(name) == 0 || len(name) > 63 {
		return false
	}

	// Kubernetes service names must conform to RFC 1123. This includes the DNS label standard,
	// which requires the name to consist of only lowercase alphanumeric characters or '-',
	// and must start and end with an alphanumeric character.
	match, _ := regexp.MatchString("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$", name)

	return match
}

func deploymentName(name string) string {
	return fmt.Sprintf("%s-justshare", name)
}

func hostName(name string) string {
	if name == "" {
		return "justshare.io"
	}
	// TODO breadchris make this domain configurable
	return fmt.Sprintf("%s.justshare.io", name)
}

func serviceName(name string) string {
	return fmt.Sprintf("%s-svc", name)
}

func (s *Service) UpsertConfigMap(ctx context.Context) error {
	b, err := os.ReadFile(s.c.GcsAccount)
	if err != nil {
		return err
	}

	cd, err := os.ReadFile(s.c.GcsAccountDeploy)
	if err != nil {
		return err
	}

	gcsAccount := map[string]string{
		"gcs_account.json":        string(b),
		"gcs_account_deploy.json": string(cd),
	}
	return createConfigMap(s.clientSet, s.c.DefaultNamespace, configMapName, gcsAccount)
}

func (s *Service) NewDeployment(ctx context.Context, c *connect.Request[kubes.NewDeploymentRequest]) (*connect.Response[kubes.NewDeploymentResponse], error) {
	image := c.Msg.Image
	name := deploymentName(c.Msg.Name)
	service := serviceName(name)
	domain := hostName(name)
	//imageName := "ghcr.io/justshare-io/justshare"
	namespace := s.c.DefaultNamespace

	if c.Msg.DomainName != "" {
		domain = c.Msg.DomainName
	}

	if !isValidK8sServiceName(name) {
		return nil, fmt.Errorf("invalid service name: %s", name)
	}

	if err := s.UpsertConfigMap(ctx); err != nil {
		return nil, err
	}

	//container, err := addHashToImage(imageName)
	//if err != nil {
	//	return nil, err
	//}

	slog.Debug("creating deployment", "name", name, "namespace", namespace, "image", image)
	_, err := s.newDeployment(ctx, namespace, NewDeployment(image, name, configMapName, port, s.oc, s.cc))
	if err != nil {
		return nil, err
	}

	err = createService(s.clientSet, service, name, namespace)
	if err != nil {
		return nil, err
	}

	err = s.updateIngress(ctx, namespace, s.c.DefaultIngress, NewIngressRule(domain, service, port))
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&kubes.NewDeploymentResponse{}), nil
}

func (s *Service) DeleteDeployment(ctx context.Context, c *connect.Request[kubes.DeleteDeploymentRequest]) (*connect.Response[kubes.DeleteDeploymentResponse], error) {
	name := c.Msg.Name
	domain := hostName(name)
	namespace := s.c.DefaultNamespace

	// TODO breadchris domain name should be set on label of deployment
	if c.Msg.DomainName != "" {
		domain = c.Msg.DomainName
	}

	err := s.deleteDeployment(s.clientSet, namespace, name)
	if err != nil {
		return nil, err
	}

	err = s.deleteService(ctx, serviceName(name), namespace)
	if err != nil {
		return nil, err
	}

	err = s.removeIngressRule(ctx, namespace, s.c.DefaultIngress, domain)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(&kubes.DeleteDeploymentResponse{}), nil
}

func (s *Service) NewIngress(ctx context.Context, c *connect.Request[kubes.NewIngressRequest]) (*connect.Response[kubes.NewIngressResponse], error) {
	_, err := s.newIngress(ctx, s.c.DefaultNamespace, s.c.DefaultIngress)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&kubes.NewIngressResponse{}), nil
}

func createService(clientset *kubernetes.Clientset, serviceName, deploymentName, namespace string) error {
	service := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name: serviceName,
		},
		Spec: corev1.ServiceSpec{
			Selector: map[string]string{
				"app": deploymentName,
			},
			Ports: []corev1.ServicePort{
				{
					Port: 80,
				},
			},
			Type: corev1.ServiceTypeClusterIP,
		},
	}

	_, err := clientset.CoreV1().Services(namespace).Create(context.TODO(), service, metav1.CreateOptions{})
	if err != nil {
		return err
	}
	return nil
}

func (s *Service) deleteService(ctx context.Context, serviceName, namespace string) error {
	deletePolicy := metav1.DeletePropagationForeground
	err := s.clientSet.CoreV1().Services(namespace).Delete(ctx, serviceName, metav1.DeleteOptions{
		PropagationPolicy: &deletePolicy,
	})
	return err
}

func (s *Service) deleteDeployment(clientset *kubernetes.Clientset, namespace string, deploymentName string) error {
	deletePolicy := metav1.DeletePropagationForeground
	return clientset.AppsV1().Deployments(namespace).Delete(context.TODO(), deploymentName, metav1.DeleteOptions{
		PropagationPolicy: &deletePolicy,
	})
}

func (s *Service) deploymentsForNamespace(ctx context.Context, namespace string) (*appsv1.DeploymentList, error) {
	deploymentsClient := s.clientSet.AppsV1().Deployments(namespace)
	return deploymentsClient.List(ctx, metav1.ListOptions{})
}

func (s *Service) newDeployment(ctx context.Context, namespace string, deployment *appsv1.Deployment) (*appsv1.Deployment, error) {
	deploymentsClient := s.clientSet.AppsV1().Deployments(namespace)
	return deploymentsClient.Create(ctx, deployment, metav1.CreateOptions{})
}

func (s *Service) updateIngress(ctx context.Context, namespace, ingressName string, ingressRule *networkingv1.IngressRule) error {
	ingress, err := s.clientSet.NetworkingV1().Ingresses(namespace).Get(ctx, ingressName, metav1.GetOptions{})
	if err != nil {
		return err
	}

	// TODO breadchris check if rule already exists?
	ingress.Spec.Rules = append(ingress.Spec.Rules, *ingressRule)

	// TODO breadchris check if host already exists?
	hosts := ingress.Spec.TLS[0].Hosts
	hosts = append(hosts, ingressRule.Host)
	ingress.Spec.TLS[0].Hosts = hosts

	_, err = s.clientSet.NetworkingV1().Ingresses(namespace).Update(ctx, ingress, metav1.UpdateOptions{})
	return err
}

func (s *Service) removeIngressRule(ctx context.Context, namespace, ingressName, hostToRemove string) error {
	ingress, err := s.clientSet.NetworkingV1().Ingresses(namespace).Get(ctx, ingressName, metav1.GetOptions{})
	if err != nil {
		return err
	}

	var updatedRules []networkingv1.IngressRule
	for _, rule := range ingress.Spec.Rules {
		if rule.Host != hostToRemove {
			updatedRules = append(updatedRules, rule)
		}
	}
	ingress.Spec.Rules = updatedRules

	var updatedTLS []networkingv1.IngressTLS
	for _, tls := range ingress.Spec.TLS {
		var hosts []string
		for _, host := range tls.Hosts {
			if host != hostToRemove {
				hosts = append(hosts, host)
			}
		}
		tls.Hosts = hosts
		updatedTLS = append(updatedTLS, tls)
	}
	ingress.Spec.Rules = updatedRules
	ingress.Spec.TLS = updatedTLS

	_, err = s.clientSet.NetworkingV1().Ingresses(namespace).Update(ctx, ingress, metav1.UpdateOptions{})
	return err
}

func (s *Service) newIngress(ctx context.Context, namespace, name string) (*networkingv1.Ingress, error) {
	ingressClient := s.clientSet.NetworkingV1().Ingresses(namespace)
	ingress := &networkingv1.Ingress{
		ObjectMeta: metav1.ObjectMeta{
			Name:      name,
			Namespace: namespace,
			Annotations: map[string]string{
				"kubernetes.io/ingress.class":                 "nginx",
				"nginx.ingress.kubernetes.io/ssl-redirect":    "true",
				"kubernetes.io/ingress.global-static-ip-name": "34.125.64.174",
				"cert-manager.io/cluster-issuer":              "letsencrypt-prod",
				"acme.cert-manager.io/http01-edit-in-place":   "true",
			},
		},
		Spec: networkingv1.IngressSpec{
			TLS: []networkingv1.IngressTLS{
				{
					Hosts:      []string{},
					SecretName: "ctfg-cert-secret",
				},
			},
			// TODO breadchris this does not resolve to anything
			DefaultBackend: &networkingv1.IngressBackend{
				Service: &networkingv1.IngressServiceBackend{
					Name: "default-service",
					Port: networkingv1.ServiceBackendPort{
						Number: 80,
					},
				},
			},
		},
	}
	return ingressClient.Create(ctx, ingress, metav1.CreateOptions{})
}
