/// <reference path="../../../node_modules/highlight.js/types/index.d.ts" />
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './editor.css';
import {editorContent, useContentEditor, useSources, useVoice} from "@/source/state";
import {Content, GRPCTypeInfo, Post, Section, Site, File} from "@/rpc/content/content_pb";
import {
    AdjustmentsHorizontalIcon,
    MicrophoneIcon,
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
import {ContentDrawer} from "@/source/ContentDrawer";
import {postContent, siteContent, urlContent} from "../../extension/util";
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import go from 'highlight.js/lib/languages/go'
import {createLowlight} from 'lowlight'
import {ResizeImage} from "@/source/ResizeImage";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {Modal} from "@/components/modal";
import {FilteredTagInput} from "@/tag/FilteredTagInput";
import {BlockNoteEditor, defaultBlockSchema, defaultBlockSpecs} from "@blocknote/core";
import {
    BlockNoteView,
    FormattingToolbarPositioner, getDefaultReactSlashMenuItems,
    HyperlinkToolbarPositioner, ImageToolbarPositioner, SideMenuPositioner,
    SlashMenuPositioner,
    useBlockNote
} from "@blocknote/react";
import "@blocknote/react/style.css";
import {CommandMenu} from "@/components/CommandMenu";
import {JustShareSideMenu} from "@/components/JustShareSideMenu";
import {blockSchema, CodeBlock, insertCode} from "@/source/editors/CodeBlock";

const lowlight = createLowlight();

lowlight.register({html})
lowlight.register({css})
lowlight.register({js})
lowlight.register({ts})
lowlight.register({go})

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
    const abortControllerRef = useRef<AbortController|undefined>(undefined);
    const [state, setState] = useState<{
        editor: { blocks: string, html: string, } | undefined
    }>({
        editor: undefined,
    });

    const [relatedContent, setRelatedContent] = useState<string[]>([]);

    // TODO breadchris this will become problematic with multiple forms on the page, need provider
    useEffect(() => {
        void loadFormTypes();
        setFormControl(fc);
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
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

    const setEditorContent = (content: Content) => {
        setTimeout(async () => {
            const c = await getContent(content);
            editor.replaceBlocks(editor.topLevelBlocks, c);
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

    const inferFromSelectedText = async (prompt: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const res = contentService.infer({
                prompt,
            }, {
                timeoutMs: undefined,
                signal: controller.signal,
            })
            for await (const exec of res) {
                // for every newline in the response, add a new paragraph. split on newline and then
                // enter after each line
                const parts = exec.text?.split('\n');
                if (parts) {
                    for (let i = 0; i < parts.length; i++) {
                        // TODO breadchris
                    }
                }
            }
        } catch (e: any) {
            toast.error(e.message);
            console.log(e);
        } finally {
            abortControllerRef.current = undefined;
        }
    }

    const onEditorContentChange = async (editor: BlockNoteEditor) => {
        const newEditor = {
            blocks: JSON.stringify(editor.topLevelBlocks),
            html: await editor.blocksToHTMLLossy(editor.topLevelBlocks),
        };
        localStorage.setItem(editorContent, newEditor.blocks);
        setState({
            editor: newEditor,
        });
    };

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

    const editor: BlockNoteEditor = useBlockNote({
        blockSpecs: {
            ...defaultBlockSpecs,
            codeBlock: CodeBlock,
        },
        slashMenuItems: [
            ...getDefaultReactSlashMenuItems(blockSchema),
            insertCode,
        ],
        onEditorContentChange: onEditorContentChange,
        onEditorReady: (editor) => {
            if (content) {
                setEditorContent(content);
            }
        }
    });


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
            toast.success('Saved content');
            editContent(resp.content);
            void getSources();
        } catch (e) {
            toast.error('Failed to save content');
            console.error('failed to save', e)
        }
    }

    const onStop = () => {
        abortControllerRef.current?.abort();
    }

    // TODO breadchris setRelatedContent([...relatedContent, url]);

    return (
        <div className={"sm:mx-4 lg:mx-16"}>
            <CommandMenu />
            <div className="mb-32 flex flex-col">
                <div className="flex flex-row justify-between">
                    <span>
                        {content?.tags.map((tag) => (
                            <span key={tag} className="badge badge-outline badge-sm" onClick={() => removeTag(tag)}>{tag}</span>
                        ))}
                    </span>
                    <button onClick={() => settingsModal.current?.showModal()}>
                        <AdjustmentsHorizontalIcon className="h-6 w-6" />
                    </button>
                </div>
                {editor && <ContentTypeEditor content={content} onUpdate={editContent} editor={editor} />}
                {/*<Splide aria-label="referenced content" options={{*/}
                {/*    perPage: 3,*/}
                {/*}}>*/}
                {/*    {relatedContent.map((src) => (*/}
                {/*        <SplideSlide>*/}
                {/*            <img src={src} />*/}
                {/*        </SplideSlide>*/}
                {/*    ))}*/}
                {/*</Splide>*/}
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
            <BottomNav
                changeContent={changeContent}
                addTag={addTag}
                onSend={onSubmit}
                onStop={onStop}
                actionRunning={abortControllerRef.current !== undefined}
            />
        </div>
    );
};

const BottomNav: React.FC<{
    changeContent: (c: Content) => void,
    addTag: (tag: string) => void,
    onSend: () => void,
    onStop: () => void,
    actionRunning: boolean,
}> = ({changeContent, addTag, onSend, actionRunning, onStop}) => {
   const [newContent, setNewContent] = useState(false);
   const [addingTag, setAddingTag] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string>('');
    const onAddTag = (tag: string) => {
        if (tag) {
            setAddingTag(false);
            addTag(tag);
        }
    };
   const onNewClose = () => {
       setNewContent(false);
   }

   return (
       <div className="btm-nav">
           <ContentDrawer />
           <Modal open={newContent} onClose={onNewClose}>
               <div className="flex flex-col">
                   <button className={"btn"} onClick={() => {
                       changeContent(urlContent('https://example.com', []));
                       setNewContent(false);
                   }}>url</button>
                   <button className={"btn"} onClick={() => {
                       changeContent(postContent("Don't think, write."));
                       setNewContent(false);
                   }}>
                       post
                   </button>
                   <li onClick={() => {
                       changeContent(siteContent());
                       setNewContent(false);
                   }}>
                       <a>site</a>
                   </li>
                   <button className={"btn"} onClick={onNewClose}>close</button>
               </div>
           </Modal>
           <Modal open={addingTag} onClose={() => setAddingTag(false)}>
               <div className={"space-y-2"}>
                   <FilteredTagInput
                       selectedTag={selectedTag}
                       setSelectedTag={setSelectedTag}
                       onAddTag={onAddTag}
                   />
                   <button className={"btn"} onClick={() => setAddingTag(false)}>close</button>
               </div>
            </Modal>
           <button onClick={() => setAddingTag(true)}>
               <TagIcon className="h-6 w-6" />
           </button>
           <button onClick={() => setNewContent(true)}>
               <PlusIcon className="h-6 w-6" />
           </button>
           {actionRunning && (
               <button onClick={onStop}>
                   <StopIcon className="h-6 w-6" />
               </button>
           )}
           <button onClick={onSend}>
               <PaperAirplaneIcon className="h-6 w-6" />
           </button>
       </div>
   )
}

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
    editor: BlockNoteEditor,
}> = ({content, onUpdate, editor}) => {
    const blockNoteView = (
        <BlockNoteView className={"h-96 touch-pan-y"} editor={editor}>
            <FormattingToolbarPositioner editor={editor} />
            <HyperlinkToolbarPositioner editor={editor} />
            <SlashMenuPositioner editor={editor} />
            <SideMenuPositioner editor={editor} sideMenu={(props) => <JustShareSideMenu editor={editor} />} />
            <ImageToolbarPositioner editor={editor} />
        </BlockNoteView>
    )
    const getContent = (content: Content|undefined) => {
        if (content) {
            switch (content.type.case) {
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