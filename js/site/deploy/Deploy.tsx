import React, {useEffect} from "react";
import {kubesService} from "@/service";
import {Deployment} from "@/rpc/kubes/kubes_pb";
import toast from "react-hot-toast";

export const Deploy: React.FC = () => {
    const [deployments, setDeployments] = React.useState<Deployment[]>([]);
    const [name, setName] = React.useState<string>('');
    const [domain, setDomain] = React.useState<string>('');

    // TODO breadchris should come from server
    const [image, setImage] = React.useState<string>('ghcr.io/justshare-io/justshare');

    useEffect(() => {
        (async () => {
            const res = await kubesService.listDeployments({});
            setDeployments(res.deployments);
        })();
    }, []);
    const newDeployment = async () => {
        try {
            const res = await kubesService.newDeployment({
                name,
                domainName: domain,
            });
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }
    const deleteDeployment = async (deploymentName: string) => {
        try {
            const res = await kubesService.deleteDeployment({
                name: deploymentName,
                domainName: domain,
            });
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }
    const updateDeployment = async (name: string) => {
        try {
            const res = await kubesService.updateDeployment({
                name: name,
                image: image,
            });
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }
    const buildImage = async () => {
        try {
            const res = await kubesService.buildImage({
                image: image,
                context: '.',
                dockerfile: 'Dockerfile',
            });
        } catch (e: any) {
            console.error(e);
            toast.error(e.message);
        }
    }
    return (
        <div className="mx-[3vw] lg:mx-[6vw] mt-8">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">image</span>
                </div>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="container image" className="input input-bordered w-full max-w-xs" />
            </label>
            <button className="btn" onClick={buildImage}>build</button>
            <h3>New</h3>
            <input className="input input-bordered" aria-label={"name"} placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input className="input input-bordered" aria-label={"domain-name"} placeholder="Domain" onChange={(e) => setDomain(e.target.value)} />
            <button className="btn" aria-label={"create"} onClick={newDeployment}>Create</button>
            <hr />
            <ul>
                {deployments.map((d) => {
                    return (
                        <li key={d.id}>
                            <div className={"flex flex-row"}>
                                {d.name}
                                <button className="btn" onClick={() => updateDeployment(d.name)}>update</button>
                                <button className="btn btn-accent" onClick={() => deleteDeployment(d.name)}>delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
