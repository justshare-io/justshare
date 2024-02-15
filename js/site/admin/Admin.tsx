import React, {useEffect, useMemo} from 'react';
import {Form, formControlAtom, useProtoForm} from "@/form/Form";
import {Content, TypesResponse} from "@/rpc/content/content_pb";
import {cleanObject} from "@/util/form";
import {Provider, useAtom} from "jotai";
import {useForm} from "react-hook-form";
import {Deploy} from "@/deploy/Deploy";

const tabs = ["deploy", "ui"] as const;
type Tab = typeof tabs[number];

export const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<Tab>(tabs[0]);
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">admin</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {tabs.map((t) => (
                            <li key={t}>
                                <a
                                    className={`${t === activeTab ? 'btn-active' : ''}`}
                                    onClick={() => setActiveTab(t)}
                                >
                                    {t}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <TabDisplay tab={activeTab} />
        </>
    )
}

const TabDisplay: React.FC<{tab: Tab}> = ({tab}) => {
    switch (tab) {
        case "ui":
            return <UI />;
        case "deploy":
            return <Deploy />;
    }
}

const UI: React.FC = () => {
    return (
        <div className="container mx-auto">
            <Provider>
                <UIFormTest />
            </Provider>
        </div>
    )
}

const UIFormTest: React.FC = () => {
    const [formControl, setFormControl] = useAtom(formControlAtom);
    const {fields, loadFormTypes} = useProtoForm();
    const fc = useForm();

    useEffect(() => {
        void loadFormTypes();
        setFormControl(fc);
    }, []);

    if (fields === undefined) {
        return null;
    }

    return (
        <>
            <Form fields={fields} />
            <button className="btn btn-primary" onClick={() => {
                const c = cleanObject(formControl?.getValues().data);
                console.log(Content.fromJson(c));
            }}>submit</button>
        </>
    )
}