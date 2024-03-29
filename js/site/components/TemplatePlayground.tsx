/* global Go, ExpRenderGoTemplate, ExpConvertData */

import React, {useState, useEffect, useRef} from 'react';
import {Editor} from "@monaco-editor/react";
import { editor } from 'monaco-editor';

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
    template: html,
    data: `Chat:
- Msg: what did react say to vue?
  Class: chat-start
- Msg: "Want to go to the spa?"
  Class: chat-end`,
    dataFormat: Format.YAML,
    enableSprig: true,
    autoRender: true,
};

export const TemplatePlayground = React.forwardRef(( props, ref ) => {
    // TODO breadchris make configurable
    const wasm = "/app/go.wasm";

    const editorRef = useRef<editor.IStandaloneCodeEditor|null>(null);

    const [state, setState] = useState({
        ...Defaults,
        loading: true,
        error: null,
        rendered: '',
    });

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
        if (!state.loading && state.autoRender) {
            updateRendered();
        }
    }, [state.template, state.data, state.dataFormat, state.autoRender, state.enableSprig]);

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
        const rendered = ExpRenderGoTemplate(state.template, state.data, state.dataFormat, state.enableSprig);
        setState((prevState) => ({ ...prevState, rendered }));
    };

    const toggleAutoRender = () => {
        setState((prevState) => ({ ...prevState, autoRender: !prevState.autoRender }));
    };

    const setDefaults = () => {
        setState({ ...Defaults, loading: false, error: null, rendered: '' });
    };

    const toggleEnableSprig = () => {
        setState((prevState) => ({ ...prevState, enableSprig: !prevState.enableSprig }));
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
        <div ref={ref} className="grid grid-cols-4 gap-4">
            <div className={"col-span-2"}>
                <Editor
                    height="60vh"
                    defaultLanguage="html"
                    defaultValue={state.template}
                    onMount={(editor) => {
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
                        defaultValue={state.data}
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
    );
});
