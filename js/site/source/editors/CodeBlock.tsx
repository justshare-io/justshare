import {
    createBlockSpecFromStronglyTypedTiptapNode,
    createStronglyTypedTiptapNode,
    defaultBlockSchema,
    defaultBlockSpecs,
    defaultProps,
} from "@blocknote/core";
import {createReactBlockSpec} from "@blocknote/react";
import React from "react";
import {RiText} from "react-icons/ri";
import {backtickInputRegex, tildeInputRegex} from "@tiptap/extension-code-block";
import {mergeAttributes, textblockTypeInputRule} from "@tiptap/core";
import {LowlightPlugin} from "@/source/editors/lowlight-plugin";
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import go from 'highlight.js/lib/languages/go'
import {createLowlight} from 'lowlight'

const lowlight = createLowlight();

lowlight.register({html})
lowlight.register({css})
lowlight.register({js})
lowlight.register({ts})
lowlight.register({go})

const languageClassPrefix = 'language-';

const CodeBlockContent = createStronglyTypedTiptapNode({
    name: 'codeBlock',

    addOptions() {
        return {
            ...this.parent?.(),
            lowlight: lowlight,
        }
    },
    content: 'inline*',
    addProseMirrorPlugins() {
        return [
        ...this.parent?.() || [],
            LowlightPlugin({
                name: this.name,
                lowlight: this.options.lowlight,
                defaultLanguage: this.options.defaultLanguage,
            }),
        ];
    }
});

export const CodeBlock = createBlockSpecFromStronglyTypedTiptapNode(
    CodeBlockContent,
    defaultProps,
);

// blockquote block
export const Blockquote = createReactBlockSpec(
    {
        type: "blockquote",
        propSchema: {
            ...defaultProps,
            cite: {
                default: "",
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            return (
                <blockquote ref={contentRef} cite={block.props.cite} />
            );
        },
        parse: (element) => {
            const cite = element.getAttribute("cite");

            return {
                cite: cite || undefined,
            };
        },
    }
);

export const AIBlock = createReactBlockSpec(
    {
        type: "aiBlock",
        propSchema: {
            ...defaultProps,
            result: {
                default: '',
            },
        },
        content: "inline",
    },
    {
        render: ({ block, contentRef }) => {
            console.log("block", block, contentRef)
            return (
                <p id={"ai-result"} />
            );
        },
        toExternalHTML: ({ contentRef }) => <div ref={contentRef} />,
        parse: (element) => {
            const result = element.textContent;

            if (result === "") {
                return;
            }

            return {
                result: result || undefined,
            };
        },
    }
);

export const blockSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the font paragraph.
    codeBlock: CodeBlock.config,
    aiBlock: AIBlock.config,
    blockquote: Blockquote.config,
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

export const insertBlockquote: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Insert Blockquote",
    execute: (editor) => {
        editor.insertBlocks(
            [
                {
                    type: "blockquote",
                    props: {},
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );
    },
    aliases: ["blockquote"],
    group: "Other",
    icon: <RiText />,
};
