package publish

import (
	md "github.com/JohannesKaufmann/html-to-markdown"
	"github.com/lunabrain-ai/lunabrain/pkg/bucket"
	"github.com/lunabrain-ai/lunabrain/pkg/gen/content"
	"github.com/lunabrain-ai/lunabrain/pkg/publish/templates"
	"github.com/lunabrain-ai/lunabrain/pkg/util"
	"gopkg.in/yaml.v3"
	"os"
	"os/exec"
	"path"
	"strings"
	"time"
)

type Blog struct {
	b *bucket.Builder
}

func NewBlog(
	b *bucket.Builder,
) *Blog {
	return &Blog{
		b: b,
	}
}

func (s *Blog) Publish(name string, site *content.Site, cnt []*content.Content) error {
	d := s.b.Dir(name)
	sd, err := d.Build()
	if err != nil {
		return err
	}
	if err = util.RemoveAllFilesInDir(sd); err != nil {
		return err
	}

	td, err := d.Dir("themes").Build()
	if err != nil {
		return err
	}
	if err = util.CopyDir(templates.FS, "papermod", td); err != nil {
		return err
	}

	nc, err := util.SnakeToCamelCase(site.HugoConfig)
	if err != nil {
		return err
	}
	o, err := yaml.Marshal(nc)
	if err != nil {
		return err
	}

	if err = os.WriteFile(path.Join(sd, "config.yaml"), o, 0644); err != nil {
		return err
	}

	converter := md.NewConverter("", true, nil)

	posts, err := d.Dir("content/posts").Build()
	if err != nil {
		return err
	}
	for _, c := range cnt {
		switch t := c.Type.(type) {
		case *content.Content_Post:
			markdown, err := converter.ConvertString(t.Post.Content)
			if err != nil {
				return err
			}
			d, err := time.Parse(time.RFC3339, c.CreatedAt)
			if err != nil {
				return err
			}
			sb, err := marshalArticleWithContent(Article{
				Author: t.Post.Authors,
				Title:  t.Post.Title,
				Tags:   c.Tags,
				Date: ArticleTime{
					Time: d,
				},
			}, markdown)
			if err != nil {
				return err
			}
			if err = os.WriteFile(path.Join(posts, c.Id+".md"), []byte(sb), 0644); err != nil {
				return err
			}
		}
	}

	if err = runHugo(sd); err != nil {
		return err
	}

	return nil
}

func marshalArticleWithContent(article Article, content string) (string, error) {
	yamlData, err := yaml.Marshal(article)
	if err != nil {
		return "", err
	}

	var sb strings.Builder
	sb.WriteString("---\n")
	sb.Write(yamlData)
	sb.WriteString("---\n\n")
	sb.WriteString(content)

	return sb.String(), nil
}

// TODO breadchris figure out how to run hugo from go
func runHugo(dir string) error {
	cmd := exec.Command("hugo")
	cmd.Dir = dir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}
