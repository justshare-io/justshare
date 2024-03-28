import React, {useEffect} from "react";
import {kubesService} from "@/service";
import {Deployment} from "@/rpc/kubes/kubes_pb";
import toast from "react-hot-toast";

type DeployState = {
    name: string,
    domain: string,
    image: string,
    deployments: Deployment[],
}

export const Deploy: React.FC = () => {
    const [state, setState] = React.useState<DeployState>({
        name: '',
        domain: '',
        image: 'ghcr.io/justshare-io/justshare',
        deployments: [],
    });

    useEffect(() => {
        void loadDeployments();
    }, []);

    const loadDeployments = async () => {
        const res = await kubesService.listDeployments({});
        setState((s) => ({...s, deployments: res.deployments}));
    }

    const setImage = (image: string) => {
        setState((s) => ({...s, image: image}));
    }

    const setName = (name: string) => {
        setState((s) => ({...s, name: name}));
    }

    const setDomain = (domain: string) => {
        setState((s) => ({...s, domain: domain}));
    }

    return (
        <div className="mx-[3vw] lg:mx-[6vw] mt-8">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">image</span>
                </div>
                <input
                    type="text"
                    value={state.image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="container image"
                    className="input input-bordered w-full max-w-xs"
                />
            </label>
            <button className="btn" onClick={() => buildImage(state)}>build</button>
            <h3>New</h3>
            <input
                className="input input-bordered"
                aria-label={"name"}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="input input-bordered"
                aria-label={"domain-name"}
                placeholder="Domain"
                onChange={(e) => setDomain(e.target.value)}
            />
            <button className="btn" aria-label={"create"} onClick={() => newDeployment(state)}>Create</button>
            <hr />
            <ul>
                {state.deployments.map((d) => {
                    return (
                        <li key={d.id}>
                            <div className={"flex flex-row"}>
                                {d.name}
                                <button className="btn" onClick={() => updateDeployment(state, d.name)}>update</button>
                                <button className="btn btn-accent" onClick={() => deleteDeployment(state, d.name)}>delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const newDeployment = async (state: DeployState) => {
    try {
        const res = await kubesService.newDeployment({
            name: state.name,
            domainName: state.domain,
            image: state.image,
        });
    } catch (e: any) {
        console.error(e);
        toast.error(e.message);
    }
}
const deleteDeployment = async (state: DeployState, deploymentName: string) => {
    try {
        const res = await kubesService.deleteDeployment({
            name: deploymentName,
            domainName: state.domain,
        });
    } catch (e: any) {
        console.error(e);
        toast.error(e.message);
    }
}
const updateDeployment = async (state: DeployState, name: string) => {
    try {
        const res = await kubesService.updateDeployment({
            name: name,
            image: state.image,
        });
    } catch (e: any) {
        console.error(e);
        toast.error(e.message);
    }
}
const buildImage = async (state: DeployState) => {
    try {
        const res = await kubesService.buildImage({
            image: state.image,
            context: '.',
            dockerfile: 'Dockerfile',
        });
    } catch (e: any) {
        console.error(e);
        toast.error(e.message);
    }
}
