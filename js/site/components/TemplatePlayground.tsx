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
</body>
</html>
`

const Defaults = {
    content: new Content({
        type: {
            case: 'page',
            value: new Page({}),
        },
    }),
    page: new Page({
        html: html,
        data: `Chat:
- Msg: what did react say to vue?
  Class: chat-start
- Msg: "Want to go to the spa?"
  Class: chat-end
`
    }),
    dataFormat: Format.YAML,
};

export const TemplatePlayground = React.forwardRef(( props, ref ) => {
    // TODO breadchris make configurable
    const wasm = "/app/go.wasm";
    const { user} = useAuth();
    const [authModal, setAuthModal] = useState(false);

    const [state, setState] = useState({
        ...Defaults,
        loading: true,
        error: null,
        rendered: '',
    });

    const { id } = useParams();

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

    const share = async () => {
        await navigator.clipboard.writeText(`https://justshare.io/@demo/${state.content.id}`);
        toast.success("Copied to clipboard");
    }

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
        } catch (error) {
            console.error(error);
            toast.error("Failed to save content: " + error);
        }
    }

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

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className={"flex-1"}>
                    <a className="btn btn-ghost text-xl">JustShare</a>
                </div>
                <div className="flex-none gap-2">
                    <div className={"flex flex-row justify-end my-2 space-x-2"}>
                        <button className={"btn w-fit"} onClick={save}>save</button>
                        <button className={"btn w-fit"} onClick={share}>share</button>
                    </div>
                    <Modal open={authModal} onClose={() => setAuthModal(false)}>
                        <AuthForm allowRegister={true} next={'/app/chat'} />
                    </Modal>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div ref={ref} className="grid grid-cols-4 gap-4">
                <div className={"col-span-2 flex flex-col"}>
                    <Editor
                        height="60vh"
                        defaultLanguage="html"
                        defaultValue={state.page.html}
                        onMount={(editor, monaco) => {
                            editorRef.current = editor;
                        }}
                        onChange={(value, event) => {
                            if (value) {
                                setState((prevState) => ({...prevState, template: value}));
                            }
                        }}
                    />
                    <div className="form-group h-32">
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
                            height="30vh"
                            defaultLanguage="yaml"
                            defaultValue={state.page.data}
                            onMount={(editor) => {
                                editorRef.current = editor;
                            }}
                            onChange={(value, event) => {
                                if (value) {
                                    setState((prevState) => ({...prevState, data: value}));
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={"col-span-2"}>
                    <div className="form-group h-full">
                        <label>Rendered</label>
                        <iframe
                            title="Example Iframe"
                            srcDoc={htmlContent}
                            className={"w-full h-full"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
