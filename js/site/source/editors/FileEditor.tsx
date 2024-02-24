// TODO breadchris component only designed for audio files with transcripts
import React, {useEffect, useState} from "react";
import {contentService} from "@/service";
import {File, Transcript} from "@/rpc/content/content_pb";
import {FileDrop} from "@/file/FileDrop";
import {TranscriptViewer} from "@/source/editors/TranscriptEditor";
import { ReactReader } from 'react-reader'
import type { Contents, Rendition } from 'epubjs'


export const FileEditor: React.FC<{id: string, file: File, onChange: (file: File) => void}> = ({id, file, onChange}) => {
    const [relatedContent, setRelatedContent] = useState<string[]>([]);
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    const [selectedTranscript, setSelectedTranscript] = useState<Transcript | undefined>(undefined);
    useEffect(() => {
        (async () => {
            if (!id) {
                return;
            }
            const res = await contentService.search({
                contentID: id,
            });
            const newTranscripts: Transcript[] = [];
            res.storedContent.forEach((c) => {
                c.related.forEach((r) => {
                    switch (r.type.case) {
                        case 'normalized':
                            const n = r.type.value;
                            switch (n.type.case) {
                                case 'transcript':
                                    newTranscripts.push(n.type.value);
                                    break;
                            }
                            break;
                    }
                });
            });
            setTranscripts(newTranscripts);
            if (newTranscripts.length > 0) {
                setSelectedTranscript(newTranscripts[newTranscripts.length - 1]);
            }
        })();
    }, [id]);
    return (
        <>
            <FileDrop>
            </FileDrop>
            {file.file && (<p>{file.file}</p>)}
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">transcripts</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {transcripts.map((t) => (
                        <li key={t.id} onClick={() => setSelectedTranscript(t)}><a>{t.name}</a></li>
                    ))}
                </ul>
            </div>
            {/*<EpubReader url={file.url} />*/}
            {file.url && selectedTranscript && (
                <TranscriptViewer transcript={selectedTranscript} audioUrl={file.url} contentId={id} />
            )}
        </>
    )
}

type ITextSelection = {
    text: string
    cfiRange: string
}

export const EpubReader: React.FC<{url: string}> = ({url}) => {
    const [selections, setSelections] = useState<ITextSelection[]>([])
    const [rendition, setRendition] = useState<Rendition | undefined>(undefined)
    const [location, setLocation] = useState<string | number>(0)
    useEffect(() => {
        if (rendition) {
            function setRenderSelection(cfiRange: string, contents: Contents) {
                if (rendition) {
                    setSelections((list) =>
                        list.concat({
                            text: rendition.getRange(cfiRange).toString(),
                            cfiRange,
                        })
                    )
                    rendition.annotations.add(
                        'highlight',
                        cfiRange,
                        {},
                        undefined,
                        'hl',
                        { fill: 'red', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
                    )
                    const selection = contents.window.getSelection()
                    selection?.removeAllRanges()
                }
            }
            rendition.on('selected', setRenderSelection)
            return () => {
                rendition?.off('selected', setRenderSelection)
            }
        }
    }, [setSelections, rendition])
    return (
        <div style={{ height: '100vh' }}>
            <div className="border border-stone-400 bg-white min-h-[100px] p-2 rounded">
                <h2 className="font-bold mb-1">Selections</h2>
                <ul className="grid grid-cols-1 divide-y divide-stone-400 border-t border-stone-400 -mx-2">
                    {selections.map(({ text, cfiRange }, i) => (
                        <li key={i} className="p-2">
                            <span>{text}</span>
                            <button
                                className="underline hover:no-underline text-sm mx-1"
                                onClick={() => {
                                    rendition?.display(cfiRange)
                                }}
                            >
                                Show
                            </button>

                            <button
                                className="underline hover:no-underline text-sm mx-1"
                                onClick={() => {
                                    rendition?.annotations.remove(cfiRange, 'highlight')
                                    setSelections(selections.filter((item, j) => j !== i))
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <ReactReader
                url={url}
                epubInitOptions={{ openAs: 'epub' }}
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            />
        </div>
    )
}
