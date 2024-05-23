import React, {useEffect} from 'react';
import {TemplatePlayground} from "@/source/editors/TemplatePlayground";
import {Contents, Page, Site} from "@/rpc/content/content_pb";
import {useParams} from "react-router";
import {contentService} from "@/service";
import toast from "react-hot-toast";

export const WebsiteEditor = () => {
    const { id } = useParams();

    const [state, setState] = React.useState<{
        site: Site
        selectedRoute?: string
    }>({
        site: new Site(),
        selectedRoute: undefined
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
                if (c !== undefined && c.type.case === 'page' && c.type.value !== undefined) {
                    const html = c.type.value.html;
                    const data = c.type.value.data;
                    setState((prevState) => ({
                        ...prevState,
                        page: new Page({html, data}),
                        content: c,
                    }));
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
            state.content.type.value = state.page;
            const res = await contentService.save(new Contents({
                content: state.content,
            }));
            toast.success("Saved");

            window.history.pushState({}, '', `/app/web/${res.content?.id}`);
            if (!res.content) {
                return;
            }
            setState((prevState) => ({ ...prevState, content: res.content }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to save content: " + error);
        }
    }
    const route = state.site.routes.find(r => r.path === state.selectedRoute);
    return (
        <div className={"p-5 flex flex-row w-full"}>
            <div className={"flex"}>
                <ul className="menu bg-base-200 w-56 rounded-box">
                    {state.site.routes.map(r => {
                        return <li key={r.path}><a>{r.path}</a></li>
                    })}
                    <li><button className={"btn"} onClick={() => {
                        setState({
                            site: new Site({
                                ...state.site,
                                routes: [...state.site.routes, {path: '/new'}]
                            })
                        })
                    }}>add</button></li>
                </ul>
            </div>
            <div className={"flex w-full"}>
                <TemplatePlayground />
            </div>
        </div>
    )
}
