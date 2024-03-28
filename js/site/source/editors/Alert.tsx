import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Menu } from "@mantine/core";
import { MdCancel, MdCheckCircle, MdError, MdInfo } from "react-icons/md";

// The types of alerts that users can choose from.
export const alertTypes = [
    {
        title: "Warning",
        value: "warning",
        icon: MdError,
        color: "#e69819",
        backgroundColor: {
            light: "#fff6e6",
            dark: "#805d20",
        },
    },
    {
        title: "Error",
        value: "error",
        icon: MdCancel,
        color: "#d80d0d",
        backgroundColor: {
            light: "#ffe6e6",
            dark: "#802020",
        },
    },
    {
        title: "Info",
        value: "info",
        icon: MdInfo,
        color: "#507aff",
        backgroundColor: {
            light: "#e6ebff",
            dark: "#203380",
        },
    },
    {
        title: "Success",
        value: "success",
        icon: MdCheckCircle,
        color: "#0bc10b",
        backgroundColor: {
            light: "#e6ffe6",
            dark: "#208020",
        },
    },
] as const;

// The Alert block.
export const Alert = createReactBlockSpec(
    {
        type: "codeBlock",
        propSchema: {
            textAlignment: defaultProps.textAlignment,
            textColor: defaultProps.textColor,
            type: {
                default: "warning",
                values: ["warning", "error", "info", "success"],
            },
        },
        content: "inline",
    },
    {
        render: (props) => {
            return (
                <pre>
                    <code className={"language-javascript"} ref={props.contentRef}></code>
                </pre>
            );
        },
    }
);