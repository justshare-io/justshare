// TODO breadchris component only designed for audio files with transcripts
import {useEffect, useState} from "react";
import {contentService} from "@/service";
import {File, Transcript} from "@/rpc/content/content_pb";
import {FileDrop} from "@/file/FileDrop";
import {TranscriptViewer} from "@/source/editors/TranscriptEditor";

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
                <button
                    type="button"
                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </button>
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
            {file.url && selectedTranscript && (
                <TranscriptViewer transcript={selectedTranscript} audioUrl={file.url} contentId={id} />
            )}
        </>
    )
}
