import React, {useEffect, useState} from "react";
import { Tag } from "@/rpc/content/content_pb";
import { FilteredTagInput } from "@/tag/FilteredTagInput";
import {contentService} from "@/service";

export const TagManager = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('');

    useEffect(() => {
        void loadTags();
    }, []);

    const loadTags = async () => {
        const res = await contentService.getTags({
            groupId: undefined,
        });
        setTags(res.tags);
    }

    const addFilteredTag = (tag: string) => {
        setFilteredTags((prev) => [...prev, tag]);
    }

    const removeFilteredTag = (tag: string) => {
        setFilteredTags((prev) => prev.filter((t) => t !== tag));
    }

    const onAddTag = (tag: string) => {
        if (tag) {
            addFilteredTag(tag);
        }
    };

    return (
        <div>
            <div className="p-4">
                <FilteredTagInput onAddTag={onAddTag} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
                <ul className="list-none">
                    {filteredTags.map((g, idx) => (
                        <li key={`${g}-${idx}`} className="badge badge-primary cursor-pointer" onClick={() => removeFilteredTag(g)}>
                            {g}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="overflow-y-auto h-screen">
                <TagTree tags={tags} setSelectedTag={setSelectedTag} />
            </div>
        </div>
    );
};

const TagTree: React.FC<{
    tags: Tag[];
    setSelectedTag: (tag: string) => void;
    path?: string;
}> = ({ tags, path, setSelectedTag }) => {
    return (
        <ul className="tree" aria-label="Default">
            {tags.map((t, idx) => {
                const tagPath = path ? `${path}/${t.name}` : t.name;
                return (
                    <li key={idx} className={`tree-item ${t.subTags.length > 0 ? "tree-branch" : "tree-leaf"}`}>
                        <div onClick={() => setSelectedTag(tagPath)}>{t.name}</div>
                        {t.subTags.length > 0 && (
                            <TagTree tags={t.subTags} path={tagPath} setSelectedTag={setSelectedTag} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};