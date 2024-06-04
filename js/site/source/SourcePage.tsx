import React, {useEffect, useState} from "react";
import {useContentEditor, useSources} from "@/source/state";
import {Content, DisplayContent, EnumeratedSource, Post} from "@/rpc/content/content_pb";
import {ContentCard} from "@/source/ContentCard";
import {contentService, userService} from "@/service";
import toast from "react-hot-toast";
import {useParams} from "react-router";
import {ListBulletIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline";
import {notEmpty} from "@/util/predicates";
import {ContentEditor} from "@/source/ContentEditor";
import {useAuth} from "@/auth/state";
import {FileDrop} from "@/file/FileDrop";
import {AddTagBadge} from "@/tag/AddTagBadge";
import {fileContent, pageContent, postContent, siteContent, urlContent} from "../../extension/util";
import {GroupDialog} from "@/auth/GroupManager";
import {TagManager} from "@/tag/TagManager";
import {ContentDrawer} from "@/source/ContentDrawer";

export const SourcePage: React.FC = () => {
    const {
        sources,
        types,
        setSelected,
        getSources,
        tags,
    } = useSources();
    const {editContent} = useContentEditor();
    const { id } = useParams();
    const { logout } = useAuth();
    const [groupsOpen, setGroupsOpen] = useState(false);
    const {
        changeContent
    } = useContentEditor();

    useEffect(() => {
        void getSources();
    }, [types, tags]);

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
                editContent(res.storedContent[0].content || undefined);
            } catch (e) {
                console.error('failed to get sources', e);
            }
        })();
    }, [id]);

    const handleSelectSource = (source: EnumeratedSource) => {
        setSelected(source);
    };

    const handleGroups = () => {
        setGroupsOpen(true);
    }

    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <div className="p-5 h-[95vh] flex flex-col">
            <div className={"navbar bg-base-100"}>
                <div className="flex-1">
                    <p className="text-xl">just share.</p>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a onClick={() => window.location.href = '/app/web'}>web</a></li>
                        <li><a onClick={() => window.location.href = '/app/code'}>code</a></li>
                        <li><a onClick={handleGroups}>groups</a></li>
                        <li><a onClick={logout}>logout</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex-grow">
                <GroupDialog open={groupsOpen} onClose={() => setGroupsOpen(false)} />
                <input type={"checkbox"} className={"toggle toggle-accent"} checked={sidebarVisible} onChange={(e) => setSidebarVisible(e.target.checked)} />
                <div className={"flex flex-row"}>
                    <div className={`flex flex-col ${!sidebarVisible && 'hidden'}`}>
                        <ContentDrawer />
                        <details className={"dropdown"}>
                            <summary className={"m-1 btn"}>new</summary>
                            <ul className={"p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 space-y-2"}>
                                <li>
                                    <button className={"btn"} onClick={() => {
                                        changeContent(urlContent('https://example.com', []));
                                    }}>url</button>
                                </li>
                                <li>
                                    <button className={"btn"} onClick={() => {
                                        changeContent(postContent("Don't think, write."));
                                    }}>
                                        post
                                    </button>
                                </li>
                                <li>
                                    <button className={"btn"} onClick={() => {
                                        changeContent(siteContent());
                                    }}>
                                        <a>site</a>
                                    </button>
                                </li>
                                <li>
                                    <button className={"btn"} onClick={() => {
                                        changeContent(fileContent());
                                    }}>
                                        <a>file</a>
                                    </button>
                                </li>
                                <li>
                                    <button className={"btn"} onClick={() => {
                                        changeContent(pageContent());
                                    }}>
                                        <a>page</a>
                                    </button>
                                </li>
                            </ul>
                        </details>
                        <TagManager />
                    </div>
                    <ContentEditor />
                </div>
                {/*{sources.length > 1 && (*/}
                {/*    <Tabs sources={sources} selected={selected} onSelectSource={handleSelectSource} />*/}
                {/*)}*/}
            </div>
        </div>
    );
}

interface TabsProps {
    sources: EnumeratedSource[];
    selected: EnumeratedSource|undefined;
    onSelectSource: (source: EnumeratedSource) => void;
}

const Tabs: React.FC<TabsProps> = ({ sources, selected, onSelectSource }) => {
    return (
        <div className="tabs tabs-bordered my-6">
            {sources.map((source, index) => (
                <a
                    className={`tab ${selected?.source?.name === source.source?.name ? 'tab-active' : ''}`}
                    key={index}
                    onClick={() => onSelectSource(source)}
                >
                    {source.source?.name}
                </a>
            ))}
        </div>
    );
};

interface ContentCardsProps {
    displayContent: DisplayContent[];
}

const ContentCards: React.FC<ContentCardsProps> = ({ displayContent }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {displayContent.map((item, index) => (
                <ContentCard key={index} displayContent={item} />
            ))}
        </div>
    );
};
