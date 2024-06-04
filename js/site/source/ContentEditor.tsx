/// <reference path="../../../node_modules/highlight.js/types/index.d.ts" />
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './editor.css';
import {editorContent, useContentEditor, useSources, useVoice} from "@/source/state";
import {Content, GRPCTypeInfo, Post, Section, Site, File} from "@/rpc/content/content_pb";
import {
    AdjustmentsHorizontalIcon,
    MicrophoneIcon, MinusIcon,
    PaperAirplaneIcon,
    PlusIcon,
    StopIcon,
    TagIcon
} from "@heroicons/react/24/outline";
import {contentService, projectService} from "@/service";
import toast from "react-hot-toast";
import {URLEditor} from "@/source/URLEditor";
import {Form, formControlAtom, useProtoForm} from "@/form/Form";
import {Provider, useAtom} from "jotai";
import {useForm} from "react-hook-form";
import {cleanObject} from "@/util/form";
import {FileEditor} from "@/source/editors/FileEditor";
import {SiteEditor} from "@/source/editors/SiteEditor";
import {ChatGPTConversationEditor} from "@/source/editors/ChatGPTConversationEditor";
import '@splidejs/react-splide/css';
import {FilteredTagInput} from "@/tag/FilteredTagInput";
import {
    BlockNoteEditor,
    BlockNoteSchema,
    defaultBlockSchema,
    defaultBlockSpecs, DefaultSuggestionItem,
    filterSuggestionItems, insertOrUpdateBlock
} from "@blocknote/core";
import {
    BlockNoteView, DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems, SuggestionMenuController,
    useCreateBlockNote
} from "@blocknote/react";
import "@blocknote/react/style.css";
import {CommandMenu} from "@/components/CommandMenu";
import {AIBlock, Blockquote, blockSchema, CodeBlock, insertBlockquote, insertCode} from "@/source/editors/CodeBlock";
import {RiAlertFill, RiText} from "react-icons/ri";
import {TemplatePlayground} from "@/source/editors/TemplatePlayground";
import {Alert} from "@/source/editors/Alert";
import {Code} from "@connectrpc/connect";

const schema = BlockNoteSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
        codeBlock: CodeBlock,
    }
});

export const ContentEditor: React.FC<{}> = ({}) => {
    const settingsModal = useRef(null);
    const {
        editedContent: content,
        editContent, selectedContent,
        newContent,
        setNewContent,
        changeContent
    } = useContentEditor();
    const { getSources } = useSources();
    const [formControl, setFormControl] = useAtom(formControlAtom);
    const {fields, loadFormTypes} = useProtoForm();

    const fc = useForm();
    const { setValue } = fc;

    const [relatedContent, setRelatedContent] = useState<string[]>([]);
    const [state, setState] = useState<{
        editor: { blocks: string, html: string, } | undefined,
        initialChanges: number,
    }>({
        editor: undefined,
        initialChanges: 0,
    });

    useEffect(() => {
        void loadFormTypes();
        setFormControl(fc);
    }, []);

    useEffect(() => {
        if (content && state.editor?.blocks) {
            switch (content.type.case) {
                case 'post':
                    editContent(new Content({
                        ...content,
                        type: {
                            case: 'post',
                            value: {
                                ...content.type.value,
                                // TODO breadchris deprecate
                                content: state.editor.html,
                                ...state.editor,
                            }
                        }
                    }));
                    break;
            }
        }
    }, [state.editor]);

    useEffect(() => {
        // anytime the content changes outside of this editor, update the editor
        if (content) {
            setValue('data', content.toJson() as any);
        }
    }, [content]);

    useEffect(() => {
        // TODO breadchris handle editor updates independently since content will be updated every editor change
        if (newContent) {
            if (content) {
                setEditorContent(content);
            }
            setNewContent(false);
        }
    }, [newContent, content]);

    useEffect(() => {
        if (selectedContent) {
            setValue('data', selectedContent.toJson() as any);

            // TODO breadchris we probably want to have this, but it causes the editor to lose focus
            setEditorContent(selectedContent);
            editContent(selectedContent);
        }
    }, [selectedContent]);

    useEffect(() => {
        if (content) {
            setEditorContent(content);
        }
    }, []);

    useEffect(() => {
        // Define a type for touch points to store the start and end positions of a touch
        type TouchPoint = {
            startX: number;
            startY: number;
            endX: number;
            endY: number;
        };

        let touchPoint: TouchPoint = { startX: 0, startY: 0, endX: 0, endY: 0 };

        // Function to handle the start of a touch
        const handleTouchStart = (e: TouchEvent) => {
            touchPoint.startX = e.touches[0].clientX;
            touchPoint.startY = e.touches[0].clientY;
        };

        // Function to handle the end of a touch
        const handleTouchEnd = (e: TouchEvent) => {
            touchPoint.endX = e.changedTouches[0].clientX;
            touchPoint.endY = e.changedTouches[0].clientY;
            handleSwipeGesture(touchPoint);
        };

        // Function to handle the swipe gesture and determine its direction
        const handleSwipeGesture = (touchPoint: TouchPoint) => {
            const deltaX = touchPoint.endX - touchPoint.startX;
            const deltaY = touchPoint.endY - touchPoint.startY;

            // Minimum distance for a swipe gesture
            const minDistance = 50;

            // Check if the horizontal movement is greater than the vertical movement and meets the minimum distance
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minDistance) {
                const cur = editor.getTextCursorPosition()
                if (deltaX > 0) {
                    if (editor.canNestBlock()) {
                        editor.nestBlock()
                    }
                } else {
                    if (editor.canUnnestBlock()) {
                        editor.unnestBlock()
                    }
                }
            }
        };

        // Add event listeners
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        // Clean up the event listeners on component unmount
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const setEditorContent = (content: Content) => {
        setTimeout(async () => {
            const c = await getContent(content);
            editor.replaceBlocks(editor.document, c);
        });
    };

    const getContent = async (c: Content) => {
        switch (c.type.case) {
            case 'post':
                // TODO breadchris remove
                if (c.type.value.content) {
                    return await editor.tryParseHTMLToBlocks(c.type.value.content);
                }
                if (!c.type.value.blocks) {
                    return [];
                }
                return JSON.parse(c.type.value.blocks);
        }
        return []
    }

    const addTag = async (tag: string) => {
        if (!content) {
            return;
        }
        editContent(new Content({
            ...content,
            tags: [...content.tags, tag],
        }));
    }

    const removeTag = async (tag: string) => {
        if (!content) {
            return;
        }
        editContent(new Content({
            ...content,
            tags: content.tags.filter((t) => t !== tag),
        }));
    }

    function scrollToMakeBottomVisible(element: Element): void {
        const elementBottomPosition = element.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        const navHeight = document.querySelector('.btm-nav')?.scrollHeight;
        if (!navHeight) {
            return;
        }

        if (elementBottomPosition > (viewportHeight - navHeight)) {
            const scrollAmount = elementBottomPosition - viewportHeight + navHeight;
            // TODO breadchris unexpected scrolls when the page is not at the bottom
            // window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }

    const editor = useCreateBlockNote({
        schema,
    });

    const onEditorContentChange = async () => {
        if (!editor) {
            return;
        }
        // TODO breadchris when the editor loads, a few changes are made that would otherwise cause the editor to scroll to the bottom
        const tryToScroll = (state: {initialChanges: number}) => {
            const blockId = editor.getTextCursorPosition().block.id;
            const e = document.querySelector(`[data-id="${blockId}"]`);
            if (state.initialChanges < 1 && editor.getTextCursorPosition().block.content?.length == 0) {
                return state.initialChanges + 1;
            } else {
                if (state.initialChanges >= 1 && e) {
                    scrollToMakeBottomVisible(e);
                }
            }
            return state.initialChanges;
        }

        const newEditor = {
            blocks: JSON.stringify(editor.document),
            html: await editor.blocksToHTMLLossy(editor.document),
        };
        localStorage.setItem(editorContent, newEditor.blocks);
        setState((state) => ({
            ...state,
            editor: newEditor,
            initialChanges: tryToScroll(state),
        }));
    };

    const contentFromForm = (): Content|undefined => {
        if (!formControl) {
            return undefined;
        }
        const data = cleanObject(formControl.getValues().data);
        try {
            return Content.fromJson(data);
        } catch (e) {
            console.error('failed to parse content', e, 'data', cleanObject(data));
            return content;
        }
        // TODO breadchris the editor should have ui controls in protobuf to set this
    }

    const onSubmit = async () => {
        try {
            // TODO breadchris save content to group
            const resp = await contentService.save({
                content: contentFromForm(),
                related: []
            });
            editContent(resp.content);
            void getSources();
        } catch (e) {
            toast.error('Failed to save content');
            console.error('failed to save', e)
        }
        try {
            // TODO breadchris save content to group
            const resp = await contentService.publish({});
            toast.success('Published content');
        } catch (e) {
            toast.error('Failed to publish content');
            console.error('failed to publish', e)
        }
    }

    const [selectedTag, setSelectedTag] = useState<string>('');
    const onAddTag = (tag: string) => {
        if (tag) {
            addTag(tag);
        }
    };

    const [tagInputOpen, setTagInputOpen] = useState<boolean>(false);

    // TODO breadchris setRelatedContent([...relatedContent, url]);

    return (
        <div className={"sm:mx-4 lg:mx-16 w-full"}>
            <CommandMenu />
            <div className="mb-64 flex flex-col">
                <div className="flex flex-row justify-between">
                    <div>
                        <span className={"space-x-1"}>
                            <span onClick={() => setTagInputOpen(!tagInputOpen)} className={"badge badge-outline badge-sm"}>
                                {tagInputOpen ? '-' : '+'}
                            </span>
                            {content?.tags.map((tag) => (
                              <span key={tag} className="badge badge-outline badge-sm" onClick={() => removeTag(tag)}>{tag}</span>
                            ))}
                            {tagInputOpen && (
                                <FilteredTagInput
                                    selectedTag={selectedTag}
                                    setSelectedTag={setSelectedTag}
                                    onAddTag={onAddTag}
                                />
                            )}
                        </span>
                    </div>
                    <div className={"flex space-x-2 items-center"}>
                        <button onClick={() => settingsModal.current?.showModal()}>
                            <AdjustmentsHorizontalIcon className="h-6 w-6" />
                        </button>
                        <button className={"btn"} onClick={onSubmit}>save</button>
                    </div>
                </div>
                {editor && <ContentTypeEditor onChange={onEditorContentChange} content={content} onUpdate={editContent} editor={editor} />}
                <dialog id="my_modal_1" className="modal" ref={settingsModal}>
                    <div className="modal-box">
                        {fields && <Form fields={fields} />}
                        <form method="dialog">
                            <div className="modal-action">
                                <button className="btn" onClick={() => {
                                    editContent(contentFromForm());
                                }}>save</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            {/*<BottomNav*/}
            {/*    changeContent={changeContent}*/}
            {/*    addTag={addTag}*/}
            {/*    onSend={onSubmit}*/}
            {/*    onStop={onStop}*/}
            {/*    actionRunning={abortControllerRef.current !== undefined}*/}
            {/*/>*/}
        </div>
    );
};

// TODO breadchris useful for when OS does not support voice input, browsers don't have great support
const VoiceInputButton: React.FC<{onText: (text: string) => void}> = ({onText}) => {
    const { start, stop, recording } = useVoice();
    return (
        <button className={"btn"} onClick={recording ? () => {
            stop();
        } : () => {
            start(onText);
        }}>
            {recording ? <StopIcon className={"h-6 w-6"} /> : <MicrophoneIcon className="h-6 w-6" />}
        </button>
    )
}

const ContentTypeEditor: React.FC<{
    content: Content|undefined,
    onUpdate: (content: Content) => void,
    editor: typeof schema.BlockNoteEditor,
    onChange: () => void,
}> = ({content, onUpdate, editor, onChange}) => {
    const abortControllerRef = useRef<AbortController|undefined>(undefined);

    // TODO breadchris this will become problematic with multiple forms on the page, need provider
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const onStop = () => {
        abortControllerRef.current?.abort();
    }
    const insertCode = (editor: typeof schema.BlockNoteEditor): DefaultReactSuggestionItem => ({
        title: "Code",
        onItemClick: () => {
            insertOrUpdateBlock(editor, {
                type: "codeBlock",
            });
        },
        aliases: ["codeBlock"],
        group: "Other",
        subtext: "Insert a code block",
        icon: <RiText size={18} />,
    })

    const inferFromSelectedText = async (prompt: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const aiBlocks = editor.insertBlocks(
            [
                {
                    content: "let me think...",
                },
            ],
            editor.getTextCursorPosition().block,
            "after"
        );

        function countIndentationDepth(inputString: string): number {
            const match = inputString.match(/^( {4}|\t)*/);
            if (!match) {
                return 0;
            }
            const matchedString = match[0];
            return matchedString.split(/( {4}|\t)/).filter(Boolean).length;
        }

        try {
            const res = contentService.infer({
                prompt,
            }, {
                timeoutMs: undefined,
                signal: controller.signal,
            })
            let content = '';
            let lastBlock = aiBlocks[0];

            let prevDepth = -1;
            let count = 0;
            const insertLine = (text: string) => {
                const newBlocks = editor.insertBlocks(
                    [
                        {
                            content: text,
                        },
                    ],
                    lastBlock,
                    count === 0 ? "nested" : "after"
                );
                return newBlocks[0];
            }
            for await (const exec of res) {
                // keep collecting until a newline is found
                content += exec.text;
                if (content.includes('\n')) {
                    const depth = countIndentationDepth(content);
                    content = content.trim()

                    lastBlock = insertLine(content);
                    content = '';
                    prevDepth = depth;
                    count += 1;
                }
            }
            if (content) {
                insertLine(content);
            }
        } catch (e: any) {
            toast.error(e.message);
            console.log(e);
        } finally {
            abortControllerRef.current = undefined;
        }
    }

    const insertAI = (editor: typeof schema.BlockNoteEditor): DefaultReactSuggestionItem => ({
        title: "Ask AI",
        onItemClick: () => {
            // editor.insertBlocks(
            //     [
            //         {
            //             type: "aiBlock",
            //             props: {},
            //         },
            //     ],
            //     editor.getTextCursorPosition().block,
            //     "after"
            // );
            const content = editor.getTextCursorPosition().block.content;
            if (content && content.length > 0 && content[0].type === "text") {
                const text = content[0].text;
                void inferFromSelectedText(text);
            }
        },
        aliases: ["ai"],
        group: "Other",
        icon: <RiText />,
    });
    const items = [
        ...getDefaultReactSlashMenuItems(editor),
        insertAI(editor),
        insertCode(editor),
    ];
    const blockNoteView = (
        <BlockNoteView className={"touch-pan-y"} editor={editor} onChange={onChange} slashMenu={false}>
            <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query) =>
                    filterSuggestionItems(items,
                        query
                    )
                }
            />
        </BlockNoteView>
    )
    const getContent = (content: Content|undefined) => {
        if (content) {
            switch (content.type.case) {
                case 'page':
                    return <TemplatePlayground page={content.type.value} />
                case 'chatgptConversation':
                    return <ChatGPTConversationEditor
                        className={'space-y-2'}
                        conversation={content.type.value} onUpdate={(c) => {
                        onUpdate(new Content({
                            ...content,
                            type: {
                                case: 'chatgptConversation',
                                value: c,
                            }
                        }));
                    }} />;
                case 'site':
                    return (
                        <SiteEditor site={content.type.value} onUpdate={(s) => {
                            onUpdate(new Content({
                                ...content,
                                type: {
                                    case: 'site',
                                    value: s,
                                }
                            }));
                        }} />
                    )
                case 'post':
                    const p = content.type.value;
                    return (
                        <div className={"space-y-2"}>
                            <input type="text" value={p.title} onChange={(e) => {
                                onUpdate(new Content({
                                    ...content,
                                    type: {
                                        case: 'post',
                                        value: {
                                            ...p,
                                            title: e.target.value,
                                        }
                                    }
                                }));
                            }} placeholder="title" className="input w-full max-w-xs" />
                            {blockNoteView}
                        </div>
                    )
                case 'data':
                    const d = content.type.value;
                    switch (d.type.case) {
                        case 'file':
                            return <FileEditor id={content.id} file={d.type.value} onChange={(file) => {
                                onUpdate(new Content({
                                    ...content,
                                    type: {
                                        case: 'data',
                                        value: {
                                            ...content.type.value,
                                            type: {
                                                case: 'file',
                                                value: file,
                                            }
                                        }
                                    }
                                }));
                            }} />
                        case 'url':
                            const u = d.type.value;
                            return <URLEditor id={content.id} url={u.url} onChange={(url) => {
                                onUpdate(new Content({
                                    ...content,
                                    type: {
                                        case: 'data',
                                        value: {
                                            ...content.type.value,
                                            type: {
                                                case: 'url',
                                                value: {
                                                    ...u,
                                                    url: url,
                                                }
                                            }
                                        }
                                    }
                                }));
                            }} />
                    }
            }
        }
        return blockNoteView;
    }
    return (
        <div>
            {getContent(content)}
        </div>
    );
}
