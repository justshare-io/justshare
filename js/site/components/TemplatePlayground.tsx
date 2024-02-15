/* global Go, ExpRenderGoTemplate, ExpConvertData */

import React, { useState, useEffect } from 'react';

const Format = {
    YAML: 'YAML',
    JSON: 'JSON',
};

const Defaults = {
    template: 'Hello, {{ .Name }}!',
    data: 'Name: World',
    dataFormat: Format.YAML,
    enableSprig: true,
    autoRender: true,
};

interface PlaygroundProps {
    wasm: string; // Assuming this prop is required for WebAssembly initialization
}

export const TemplatePlayground: React.FC<PlaygroundProps> = ({ wasm }) => {
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

    const gridClasses = 'group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500';

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
            <div className={gridClasses}>
                <label>Template</label>
                <textarea
                    className="form-control mono"
                    id="templateTextArea"
                    value={state.template}
                    onInput={updateTemplate}
                />
            </div>
            <div className={gridClasses}>
                <div className="form-group">
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
                    <textarea
                        className="form-control mono"
                        id="dataTextArea"
                        value={state.data}
                        onInput={updateData}
                    />
                </div>
            </div>
            <div className={gridClasses}>
                <div className="form-group">
                    <label>Rendered</label>
                    <iframe
                        title="Example Iframe"
                        srcDoc={htmlContent}
                        width="100%"
                        height="300px"
                        style={{ border: '2px solid #ccc' }}
                    />
                </div>
            </div>
            <div className={gridClasses}>
                <div className="form-group">
                    <label>Configuration</label>
                    <div className="form-inline">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={state.autoRender}
                            onClick={updateRendered}
                        >
                            Render
                        </button>
                        <div className="custom-control custom-switch ml-3">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="autoRender"
                                checked={state.autoRender}
                                onChange={toggleAutoRender}
                            />
                            <label className="custom-control-label">
                                Auto-render
                            </label>
                        </div>
                    </div>
                    <div className="form-inline mt-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={setDefaults}
                        >
                            Restore Defaults
                        </button>
                    </div>
                    <div className="form-inline mt-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="enableSprig"
                                checked={state.enableSprig}
                                onChange={toggleEnableSprig}
                            />
                            <label className="form-check-label">
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://masterminds.github.io/sprig/"
                                >
                                    Enable Sprig
                                </a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};