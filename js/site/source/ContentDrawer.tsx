import React from "react";
import {useContentEditor, useSources} from "@/source/state";
import {ListBulletIcon, TrashIcon} from "@heroicons/react/24/outline";
import {AddTagBadge} from "@/tag/AddTagBadge";
import {Content, DisplayContent} from "@/rpc/content/content_pb";
import {contentService} from "@/service";
import toast from "react-hot-toast";
import {notEmpty} from "@/util/predicates";
import {Splide, SplideSlide} from "@splidejs/react-splide";

export const ContentDrawer: React.FC<{}> = () => {
    const {
        selected,
        setTypes,
        setTags,
        tags,
    } = useSources();

    const toggleType = (type: string) => async () => {
        setTypes((types) => {
            if (types.includes(type)) {
                return types.filter((t) => t !== type);
            }
            return [...types, type];
        });
    }
    return (
        <div className="content-drawer z-50">
            <input id="my-drawer" type="checkbox" className="content-drawer-toggle" />
            <div className="content-drawer-content">
                <label htmlFor="my-drawer" className="btn content-drawer-button">
                    content
                </label>
            </div>
            <div className="content-drawer-side fixed w-screen">
                {selected && (
                    // <ContentCards displayContent={selected.displayContent} />
                    <div className={"flex flex-col p-4 w-screen h-96 bg-base-200 text-base-content"}>
                        <div className={"flex justify-between"}>
                            <div className={"flex flex-row space-y-2"}>
                                <div>
                                    <details className={"dropdown"}>
                                        <summary className={"btn"}>type</summary>
                                        <ul className={"p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"}>
                                            <li onClick={toggleType('site')}>site</li>
                                            <li onClick={toggleType('post')}>post</li>
                                        </ul>
                                    </details>
                                </div>
                                <AddTagBadge onNewTag={(t) => {
                                    setTags((tags) => {
                                        if (tags.includes(t)) {
                                            return tags;
                                        }
                                        return [...tags, t];
                                    });
                                }} />
                                {tags.map((tag) => (
                                    <span key={tag} className="badge badge-outline badge-sm" onClick={() => {
                                        setTags((tags) => tags.filter((t) => t !== tag));
                                    }}>{tag}</span>
                                ))}
                            </div>
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="btn content-drawer-overlay">close</label>
                        </div>
                        <div className={""}>
                            <div className="flex flex-row space-x-2">
                                <ContentTable displayContent={selected.displayContent} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const ContentTable: React.FC<{displayContent: DisplayContent[]}> = ({displayContent}) => {
    const {selectedContent, selectContent} = useContentEditor();
    const { getSources } = useSources();
    const handleCheckboxChange = (content: Content|undefined, isChecked: boolean) => {
        if (isChecked && content) {
            selectContent(content);
        }
        if (!isChecked) {
            selectContent(undefined);
        }
    };

    const handleDelete = async () => {
        if (!selectedContent) {
            return;
        }
        try {
            // TODO breadchris save content to group
            const resp = await contentService.delete({
                contentIds: [selectedContent.id],
            });
            void getSources();
            toast.success('Deleted content');
        } catch (e) {
            toast.error('Failed to delete content');
            console.error('failed to delete', e)
        }
    }
    return (
        <div className={"h-96 carousel rounded-box"}>
            {displayContent.filter(notEmpty).map((item, index) => (
                <div key={index} className={"carousel-item h-full"}>
                    <div className={`flex flex-col p-4 w-96 bg-base-200 text-base-content ${selectedContent?.id === item.content?.id ? 'bg-accent' : ''}`}
                        onClick={(e) => handleCheckboxChange(item.content, true)}
                    >
                        <div className="flex justify-between">
                            <div>
                                {item.title}
                            </div>
                            <div>
                                <TrashIcon onClick={handleDelete} className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="gap-3 space-x-1">
                            {item.content?.tags.map((tag) => (
                                <span key={tag} className="badge badge-outline badge-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

