/* global Go, ExpRenderGoTemplate, ExpConvertData */

import React, {useState, useEffect, useRef} from 'react';
import {Editor, useMonaco} from "@monaco-editor/react";
import { editor } from 'monaco-editor';
import {contentService} from "@/service";
import toast from "react-hot-toast";
import {Content, Contents, Page, StoredContent} from "@/rpc/content/content_pb";
import {useParams} from "react-router";
import {Modal} from "@/components/modal";
import {AuthForm} from "@/auth/AuthForm";
import {useAuth} from "@/auth/state";
import {Tabs} from "@/components/Tabs";
import {Codicon} from "vscode-lib/types/downloaded/vscode-main/src/vs/base/common/codicons";

const Format = {
    YAML: 'YAML',
    JSON: 'JSON',
};

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.9.0/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="container mx-auto w-96 mt-8">
        <div class="my-3">
            <a class="btn" href="https://pkg.go.dev/html/template@go1.22.1">learn go templates</a>
            <a class="btn btn-primary" href="https://daisyui.com/components/">learn daisyui</a>
            <h1 class="text-3xl font-bold underline">
                <a href="https://tailwindcomponents.com/cheatsheet/">learn tailwind</a>
            </h1>
        </div>
        {{ range .Chat }}
        <div class="chat {{ .Class }}">
            <div class="chat-bubble">{{ .Msg }}</div>
        </div>
        {{end}}
    </div>
</body>
</html>
`

export const TemplatePlayground: React.FC<{
    page: Page;
    onChange?: (p: Page) => void;
}> = React.forwardRef(( {page, onChange}, ref ) => {
    // TODO breadchris make configurable
    const wasm = "/app/go.wasm";
    const { user} = useAuth();
    const [authModal, setAuthModal] = useState(false);

    const [state, setState] = useState<{
        page: Page;
        dataFormat: string;
        loading: boolean;
        error: string | null;
        rendered: string;
        layout: 'horizontal' | 'vertical' | 'preview-only' | 'responsive';
    }>({
        page: page.html !== '' ? page : new Page({
            html: html,
            data: `Chat:
- Msg: what did react say to vue?
  Class: chat-start
- Msg: "Want to go to the spa?"
  Class: chat-end
`
        }),
        dataFormat: Format.YAML,
        loading: true,
        error: null,
        rendered: '',
        layout: 'horizontal',
    });

    const editorRef = useRef<editor.IStandaloneCodeEditor|null>(null);

    useEffect(() => {
        // Placeholder for WebAssembly initialization logic
        // Replace this with your actual initialization code
        //@ts-ignore
        const go = new Go();
        WebAssembly.instantiateStreaming(fetch(wasm), go.importObject)
            .then((result) => {
                go.run(result.instance);
                setState((prevState) => ({ ...prevState, loading: false }));
            })
            .catch((error) => {
                console.error('error initializing Wasm:', error);
                setState((prevState) => ({ ...prevState, loading: false, error }));
            });
    }, [wasm]);

    useEffect(() => {
        if (!state.loading) {
            updateRendered();
            editorRef.current?.layout();
        }
    }, [state.loading]);

    useEffect(() => {
        if (!state.loading) {
            updateRendered();
        }
    }, [state.page, state.dataFormat]);

    // const share = async () => {
    //     await navigator.clipboard.writeText(`https://justshare.io/@demo/${state.content.id}`);
    //     toast.success("Copied to clipboard");
    // }

    // const save = async () => {
    //     if (!user) {
    //         setAuthModal(true);
    //         return;
    //     }
    //     try {
    //         state.content.type.value = state.page;
    //         const res = await contentService.save(new Contents({
    //             content: state.content,
    //         }));
    //         toast.success("Saved");
    //
    //         window.history.pushState({}, '', `/app/web/${res.content?.id}`);
    //         if (!res.content) {
    //             return;
    //         }
    //         setState((prevState) => ({ ...prevState, content: res.content }));
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Failed to save content: " + error);
    //     }
    // }
    //
    const updateTemplate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, template: e.target.value }));
    };

    const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, data: e.target.value }));
    }

    const updateDataFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState((prevState) => ({ ...prevState, dataFormat: e.target.value }));
    };

    const updateRendered = () => {
        //@ts-ignore
        const rendered = ExpRenderGoTemplate(state.page.html, state.page.data, state.dataFormat, false);
        setState((prevState) => ({ ...prevState, rendered }));
    };

    if (state.loading) {
        return <div className="alert alert-info">Loading WebAssembly...</div>;
    }

    if (state.error) {
        return (
            <div className="alert alert-error">
                <p>Error loading WebAssembly: {state.error}</p>
            </div>
        );
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>sandbox</title>
    </head>
    <body>
    ${state.rendered}
    </body>
    </html>
  `;

    const layoutActiveClass = 'fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400';
    const layoutInactiveClass = 'fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400';
    const layoutClass = (layout: string) => {
        return state.layout === layout ? layoutActiveClass : layoutInactiveClass;
    }

    const editorLayout = {
        'horizontal': {
            'container': 'flex-row',
            'editor': 'w-1/2',
            'preview': 'w-1/2',
            'previewDiv': 'h-full',
        },
        'vertical': {
            'container': 'flex-col',
            'editor': 'h-1/2',
            'preview': 'h-1/2',
            'previewDiv': 'h-96',
        },
        'preview-only': {
            'container': 'flex-col',
            'editor': 'hidden',
            'preview': 'h-full',
            'previewDiv': 'h-full',
        },
        'responsive': {
            'container': 'flex-col',
            'editor': 'h-1/2',
            'preview': 'h-1/2',
            'previewDiv': 'h-full',
        },
    }

    return (
        <div className={"w-full"}>
            <div ref={ref} className={`flex space-x-3 ${editorLayout[state.layout].container}`}>
                <div className={`flex ${editorLayout[state.layout].editor}`}>
                    <Tabs className={'h-full w-full'} sources={{
                        'HTML': (
                            <Editor
                                height="60vh"
                                defaultLanguage="html"
                                defaultValue={state.page.html}
                                onMount={(editor, monaco) => {
                                    editorRef.current = editor;
                                }}
                                onChange={(value, event) => {
                                    if (value) {
                                        setState((prevState) => ({...prevState, page: new Page({
                                                ...prevState.page,
                                                html: value,
                                            })}));
                                    }
                                }}
                            />
                        ),
                        'Data': (
                            <div className="form-group h-full">
                                <div className="form-inline">
                                    <label>Data</label>
                                    <label className="sr-only">
                                        Format
                                    </label>
                                    <select
                                        className="custom-select custom-select-sm ml-2 mb-1"
                                        id="dataFormat"
                                        value={state.dataFormat}
                                        onChange={updateDataFormat}
                                    >
                                        {Object.keys(Format).map((v) => (
                                            <option key={v} value={v}>
                                                {v}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Editor
                                    height="60vh"
                                    defaultLanguage="yaml"
                                    defaultValue={state.page.data}
                                    onMount={(editor) => {
                                        editorRef.current = editor;
                                    }}
                                    onChange={(value, event) => {
                                        if (value) {
                                            setState((prevState) => ({...prevState, page: new Page({
                                                    ...prevState.page,
                                                    data: value,
                                                })}));
                                        }
                                    }}
                                />
                            </div>
                        ),
                    }}></Tabs>
                </div>
                <div className={`flex ${editorLayout[state.layout].preview}`}>
                    <div className={`form-group ${editorLayout[state.layout].previewDiv} w-full`}>
                        <iframe
                            sandbox={"allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals"}
                            title="Example Iframe"
                            srcDoc={htmlContent}
                            className={"w-full h-full"}
                        />
                    </div>
                </div>
            </div>
            <div className="navbar bg-base-100">
                <div className={"flex-1"}>
                </div>
                <div className="flex-none gap-2">
                    <div className={"flex flex-row justify-end my-2 space-x-2"}>
                        <div className="lg:flex items-center ml-6 rounded-md ring-1 ring-gray-900/5 shadow-sm dark:ring-0 dark:bg-gray-800 dark:shadow-highlight/4">
                            <button type="button" onClick={() => {
                                setState((prevState) => ({...prevState, layout: 'horizontal'}));
                            }} className={'group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500'}>
                                <span className="sr-only">
                                    Switch to vertical split layout
                                </span>
                                <svg width="42" height="36" viewBox="-8 -7 42 36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={layoutClass('horizontal')}>
                                    <path d="M12 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9" fill="none"></path><path d="M3 17V5a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2Z"></path>
                                </svg>
                            </button>
                            <button type="button" onClick={() => {
                                setState((prevState) => ({...prevState, layout: 'vertical'}));
                            }} className={'group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500'}>
                                <span className="sr-only">Switch to horizontal split layout</span>
                                <svg width="42" height="36" viewBox="-8 -7 42 36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={layoutClass('vertical')}>
                                    <path d="M23 11V3H3v8h20Z" strokeWidth="0"></path><path d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2ZM22 11H4" fill="none"></path>
                                </svg>
                            </button>
                            <button type="button" onClick={() => {
                                setState((prevState) => ({...prevState, layout: 'preview-only'}));
                            }} className={'group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500'}>
                                <span className="sr-only">Switch to preview-only layout</span>
                                <svg width="42" height="36" viewBox="-8 -7 42 36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={layoutClass('preview-only')}>
                                    <path d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" fill="none"></path>
                                </svg>
                            </button>
                            <button type="button" onClick={() => {
                                setState((prevState) => ({...prevState, layout: 'responsive'}));
                            }} className={'group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500'}>
                                <span className="sr-only">Toggle responsive design mode</span>
                                <svg width="42" height="36" viewBox="-8 -7 42 36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={layoutClass('responsive')}>
                                    <path d="M15 19h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a1 1 0 0 0-1 1" fill="none"></path><path d="M12 17V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {/*<Modal open={authModal} onClose={() => setAuthModal(false)}>*/}
                    {/*    <AuthForm allowRegister={true} next={'/app/chat'} />*/}
                    {/*</Modal>*/}
                </div>
            </div>
        </div>
    );
});
