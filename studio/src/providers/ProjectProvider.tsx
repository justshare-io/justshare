import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {projectService} from "@/lib/api";
import {Message} from "@/components/Chat/MessageList";
import {Code, ConnectError} from "@bufbuild/connect";
import toast from "react-hot-toast";
import {TabValue} from "@fluentui/react-components";
import {ChatResponse, Segment, Session} from "@/rpc/protoflow_pb";

const ProjectContext = createContext<ProjectContextType>({} as any);
export const useProjectContext = () => useContext(ProjectContext);

type ProjectProviderProps = {
    children: React.ReactNode;
};

type ProjectContextType = {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    isRecording: boolean;
    setIsRecording: (isRecording: boolean) => void;
    selectedValue: TabValue;
    setSelectedValue: (selectedValue: TabValue) => void;
    streamMessages: (res: AsyncIterable<ChatResponse>) => void;
    session: Session | undefined;
    inferFromMessages: (prompt: string) => void;
};

export default function ProjectProvider({children}: ProjectProviderProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<TabValue>('');
    const [session, setSession] = useState<Session|undefined>(undefined);

    const inferFromMessages = async (prompt: string) => {
        const mIdx = messages.length + 1;
        const m: Message = {text: prompt, sender: 'user', segment: new Segment()};
        setMessages((prev) => [...prev, m, {...m, text: ''}]);
        try {
            const res = projectService.infer( {
                text: messages.map((m) => m.text),
                prompt,
            })
            for await (const exec of res) {
                setMessages((prev) => {
                    prev[mIdx].text = prev[mIdx].text + exec.text;
                    return prev;
                });
            }
        } catch (e: any) {
            toast.error(e.message);
            console.log(e);
        }
    };

    useEffect(() => {
        if (selectedValue !== '') {
            (async () => {
                const res = await projectService.getSession({
                    id: selectedValue as string,
                })
                setSession(res.session);
                setMessages(res.session?.segments.map((m) => ({text: m.text || '', sender: 'bot', segment: m})) || []);
            })();
        }
    }, [selectedValue]);

    async function streamMessages(res: AsyncIterable<ChatResponse>) {
        setMessages([]);
        for await (const exec of res) {
            setMessages((prev) => {
                if (!exec.segment) {
                    return prev;
                }
                const newMsg: Message = {text: exec.segment?.text || '', sender: 'bot', segment: exec.segment};
                const i = prev.findIndex((m) => m.segment.num === exec.segment?.num);
                if (i !== -1) {
                    let newPrev = [...prev];
                    newPrev[i] = newMsg;
                    return newPrev;
                }
                return [...prev, newMsg];
            });
        }
    }

    useEffect(() => {
        if (!isRecording) {
            return;
        }
        (async () => {
            try {
                const res = projectService.chat({}, {
                    timeoutMs: undefined,
                });
                await streamMessages(res);
            } catch (e) {
                if (e instanceof ConnectError && e.code != Code.Canceled) {
                    toast.error(e.message);
                    console.log(e);
                }
            }
        })();
    }, [isRecording]);

    return (
        <ProjectContext.Provider
            value={{
                messages,
                setMessages,
                isRecording,
                setIsRecording,
                selectedValue,
                setSelectedValue,
                streamMessages,
                session,
                inferFromMessages,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}
