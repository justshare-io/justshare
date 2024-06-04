import React, {useEffect, useState} from 'react';
import {TemplatePlayground} from "@/source/editors/TemplatePlayground";
import {Content, Contents, Page, Route, Site} from "@/rpc/content/content_pb";
import {useParams} from "react-router";
import {contentService} from "@/service";
import toast from "react-hot-toast";
import {useAuth} from "@/auth/state";
import {Modal} from "@/components/modal";
import {AuthForm} from "@/auth/AuthForm";
import {parseRoutes, RouteTreeView} from "@/source/editors/RouteTree";

export const WebsiteEditor = () => {
    const { id } = useParams();

    const { user} = useAuth();
    const [authModal, setAuthModal] = useState(false);

    const [state, setState] = React.useState<{
        content: Content
        site: Site
        selectedRoute: Route | undefined,
        newPath: string,
    }>({
        content: new Content({
            type: {
                case: 'site',
                value: new Site({}),
            },
        }),
        site: new Site({
            routes: [new Route({
                path: '/',
                page: new Page({
                    html: '',
                    data: '',
                }),
            })],
        }),
        selectedRoute: undefined,
        newPath: "/",
    });

    useEffect(() => {
        if (!id) {
            return;
        }
        (async () => {
            try {
                const res = await contentService.search({
                    contentID: id,
                })
                if (res.storedContent.length === 0) {
                    return;
                }
                const c = res.storedContent[0].content;
                switch (c?.type?.case) {
                    case 'site':
                        const site = c.type.value;
                        setState((prevState) => ({
                            ...prevState,
                            site,
                            content: c,
                        }));
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.error('failed to get sources', e);
            }
        })();
    }, [id]);

    const save = async () => {
        if (!user) {
            setAuthModal(true);
            return;
        }
        try {
            state.content.type.value = state.site;
            const res = await contentService.save(new Contents({
                content: state.content,
            }));
            toast.success("Saved");

            window.history.pushState({}, '', `/app/web/${res.content?.id}`);
            const c = res.content;
            if (c === undefined) {
                return;
            }
            setState((prevState) => ({ ...prevState, content: c }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to save content: " + error);
        }
    }

    return (
        <div className={"p-5 flex flex-row w-full"}>
            <Modal open={authModal} onClose={() => setAuthModal(false)}>
                <AuthForm allowRegister={true} next={'/app/chat'} />
            </Modal>
            <div className={"flex flex-col"}>
                {state.site.routes && (
                    <>
                        <div className={"flex flex-row w-full"}>
                            <input className={"flex input"} onChange={(e) => {
                                setState({
                                    ...state,
                                    newPath: e.target.value
                                })
                            }} value={state.newPath} />
                            <button className={"btn"} onClick={() => {
                                setState({
                                    ...state,
                                    site: new Site({
                                        routes: [
                                            ...state.site.routes,
                                            new Route({
                                                path: state.newPath,
                                                page: new Page(),
                                            })
                                        ]

                                })
                            })}}>new path</button>
                        </div>
                        <RouteTreeView routes={parseRoutes(state.site.routes)} onRouteClick={(r) => {
                            setState({
                                ...state,
                                selectedRoute: r.contentRoute,
                            })
                        }} />
                    </>
                )}
            </div>
            {state.selectedRoute === undefined || state.selectedRoute.page === undefined ? (
                <div className={"flex"}>
                    <div className={"flex flex-col w-full"}>
                        <h1 className={"text-2xl"}>No route selected</h1>
                    </div>
                </div>
            ) : (
                <div className={"flex flex-col w-full"}>
                    <div className={"p-5 flex flex-row w-full space-x-2"}>
                        <input className={"text-2xl"} onChange={(e) => {
                        }} value={state.selectedRoute.path}></input>
                        <span className={"badge"}>page</span>
                        <span className={"badge"}>layout</span>
                        <button className={"btn"} onClick={save}>save</button>
                    </div>
                    <div className={"flex w-full"}>
                        <TemplatePlayground page={state.selectedRoute.page} onChange={(p) => {
                            if (state.selectedRoute !== undefined) {
                                state.selectedRoute.page = p;
                            }
                        }} />
                    </div>
                </div>
            )}
        </div>
    )
}
