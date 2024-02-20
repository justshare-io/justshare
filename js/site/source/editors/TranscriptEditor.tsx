import React, { useState, useEffect, useRef } from 'react';
import {Segment, Token, Transcript} from "@/rpc/content/content_pb";

export const TranscriptViewer: React.FC<{ transcript: Transcript; audioUrl: string; contentId: string }> = ({ transcript, audioUrl, contentId }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [slice, setSlice] = useState<{ startTime: number; endTime: number } | null>(null);
    const [slices, setSlices] = useState<{ startTime: number; endTime: number }[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleSliceClick = () => {
        if (slice) {
            setSlices([...slices, slice]);
            setSlice(null); // Reset slice after adding
        }
    };

    const handleTokenClick = (token: Token) => {
        // set current time
        if (audioRef.current) {
            audioRef.current.currentTime = Number(token.startTime) / 100;
        }
    };

    const handleSegmentClick = (segment: Segment) => {
        // set current time
        if (audioRef.current) {
            audioRef.current.currentTime = Number(segment.startTime) / 1000;
            console.log(Number(segment.startTime) / 1000)
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className={"flex flex-row space-x-2"}>
                <button className="btn btn-primary mt-4" onClick={handleSliceClick}>
                    sdd slice
                </button>
                <button className="btn btn-primary mt-4" onClick={handleSliceClick}>
                    save
                </button>
                <div className="mt-4">
                    {slices.map((slice, index) => (
                        <div key={index}>
                            Slice {index + 1}: {slice.startTime} - {slice.endTime}
                        </div>
                    ))}
                </div>
            </div>
            <audio
                ref={audioRef}
                src={audioUrl}
                controls
                onTimeUpdate={handleTimeUpdate}
            ></audio>
            <div>
                {transcript.segments.map((segment) => (
                    <div key={segment.num}>
                        {false ? (
                            <>
                                {segment.tokens.map((token) => (
                                    <span
                                        key={token.id + token.startTime.toString() + token.endTime.toString()}
                                        className={`cursor-pointer ${currentTime * 100 >= token.startTime && currentTime * 100 <= token.endTime ? 'bg-yellow-300' : ''}`}
                                        onClick={() => handleTokenClick(token)}
                                        title={`Start: ${Number(token.startTime) / 100}s, End: ${Number(token.endTime) / 100}s`}
                                    >
                                      {token.text}{' '}
                                    </span>
                                ))}
                            </>
                        ) : (
                            <span
                                key={segment.startTime.toString() + segment.endTime.toString()}
                                className={`cursor-pointer ${currentTime * 100 >= segment.startTime && currentTime * 100 <= segment.endTime ? 'bg-yellow-300' : ''}`}
                                onClick={() => handleSegmentClick(segment)}
                                title={`Start: ${Number(segment.startTime) / 100}s, End: ${Number(segment.endTime) / 100}s`}
                            >
                                {segment.text}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
