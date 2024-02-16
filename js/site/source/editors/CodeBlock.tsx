import {
    defaultBlockSchema,
    defaultBlockSpecs,
    defaultProps,
} from "@blocknote/core";
import {createReactBlockSpec, ReactSlashMenuItem} from "@blocknote/react";
import React from "react";
import {RiText} from "react-icons/ri";
import {TemplatePlayground} from "@/components/TemplatePlayground";

export const CodeBlock = createReactBlockSpec(
    {
        type: "codeBlock",
        propSchema: {
            ...defaultProps,
            code: {
                default: "<h1>Hello, World!</h1>",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            return (
                <div id={"template-playground"}>
                    <TemplatePlayground ref={contentRef} />
                </div>
            );
        },
        toExternalHTML: ({ contentRef }) => <div ref={contentRef} />,
        parse: (element) => {
            const code = element.textContent;

            if (code === "") {
                return;
            }

            return {
                code: code || undefined,
            };
        },
    }
);

export const blockSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the font paragraph.
    codeBlock: CodeBlock.config,
};

// Creates a slash menu item for inserting a font paragraph block.
export const insertCode: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Insert Code",
    execute: (editor) => {
        editor.insertBlocks(
            [
                {
                    type: "codeBlock",
                    props: {},
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );
    },
    aliases: ["code"],
    group: "Other",
    icon: <RiText />,
};