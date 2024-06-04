import React, {useEffect, useRef, useState} from 'react';
import {TemplatePlayground} from "@/source/editors/TemplatePlayground";
import {Code, Contents, Page, Site} from "@/rpc/content/content_pb";
import {useParams} from "react-router";
import {contentService, deployService} from "@/service";
import toast from "react-hot-toast";
import {Editor} from "@monaco-editor/react";
import {editor} from "monaco-editor";
import {useAuth} from "@/auth/state";

export const CodeEditor = () => {
    const { id } = useParams();

    const editorRef = useRef<editor.IStandaloneCodeEditor|null>(null);

    // useEffect(() => {
    //     if (editorRef.current) {
    //         console.log('hello')
    //         monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    //             target: monaco.languages.typescript.ScriptTarget.ESNext,
    //             allowNonTsExtensions: true,
    //             moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    //             module: monaco.languages.typescript.ModuleKind.CommonJS,
    //             noEmit: true,
    //             typeRoots: ["node_modules/@types"]
    //         });
    //
    //         monaco.languages.typescript.typescriptDefaults.addExtraLib(
    //             [
    //                 'declare module "react" {',
    //                 '  export class Component<P = {}, S = {}> extends React.Component<P, S> {}',
    //                 '  export function createElement<P extends {}>(type: any, props: P, ...children: ReactNode[]): ReactElement<P>;',
    //                 '}',
    //             ].join('\n'),
    //             'node_modules/@types/react/index.d.ts'
    //         );
    //
    //     }
    // }, []);

    const [state, setState] = React.useState<{
        site: Site
        selectedRoute?: string
        name: string,
        url: string|undefined,
        code: string|undefined,
        deploying: boolean,
    }>({
        site: new Site(),
        selectedRoute: undefined,
        name: 'demo',
        url: undefined,
        code: undefined,
        deploying: false,
    });

    const { user} = useAuth();
    const [authModal, setAuthModal] = useState(false);

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
            setState((prevState) => ({ ...prevState, deploying: true }));
            const res = await deployService.deploy({
                code: new Code({
                    name: state.name,
                    code: editorRef.current?.getValue() || ''
                }),
            });
            toast.success("Saved");
            setState((prevState) => ({ ...prevState, url: res.endpoint }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to save content: " + error);
        } finally {
            setState((prevState) => ({ ...prevState, deploying: false }));
        }
        // try {
        //     state.content.type.value = state.page;
        //     const res = await contentService.save(new Contents({
        //         content: state.content,
        //     }));
        //     toast.success("Saved");
        //
        //     window.history.pushState({}, '', `/app/web/${res.content?.id}`);
        //     if (!res.content) {
        //         return;
        //     }
        //     setState((prevState) => ({ ...prevState, content: res.content }));
        // } catch (error) {
        //     console.error(error);
        //     toast.error("Failed to save content: " + error);
        // }
    }
    const route = state.site.routes.find(r => r.path === state.selectedRoute);
    return (
        <div className={"p-5 flex flex-col w-full space-y-2"}>
            {state.url && <div className={"text-sm text-gray-500"}>{state.url}</div>}
            <div className={"flex flex-row justify-between"}>
                <input className={"input w-full"} placeholder={"function name..."} type={"text"} value={state.name} onChange={(e) => {
                    setState((prevState) => ({...prevState, name: e.target.value}));
                }}></input>
                {state.deploying ? (
                    <div className={"text-sm text-gray-500"}>Deploying...</div>
                ) : (
                    <div className={"flex flex-row"}>
                        <button className={"btn"} onClick={save}>Save</button>
                    </div>
                )}
            </div>
            <Editor
                height="60vh"
                defaultLanguage="typescript"
                defaultValue={`const functions = require('@google-cloud/functions-framework');

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('helloGET', (req, res) => {
    res.send('Hello World!');
});`}
                onMount={(editor) => {
                    editorRef.current = editor;
                }}
                onChange={(value, event) => {
                    if (value) {
                        setState((prevState) => ({...prevState, code: value}));
                    }
                }}
            />
        </div>
    )
}
