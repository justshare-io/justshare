import React, {useEffect, useRef, useState} from 'react';
import {List, PrimaryButton, Stack, TextField} from "@fluentui/react";
import { Segment } from '@/rpc/protoflow_pb';
import {Message, messageColumns, SubtleSelection} from "@/components/Chat/MessageList";
import {useProjectContext} from "@/providers/ProjectProvider";

interface WindowProps {
}

export const Window: React.FC<WindowProps> = ({  }) => {
    const [inputValue, setInputValue] = useState<string | undefined>('');
    const { messages, setMessages } = useProjectContext();

    const handleSend = () => {
        if (inputValue && inputValue.trim() !== '') {
            setMessages([...messages, {text: inputValue, sender: 'user', segment: new Segment({})}]);
            setInputValue('');
        }
    };

    return (
        <Stack>
            <Stack verticalFill verticalAlign="space-between"
                   styles={{root: {height: '90vh', overflowY: 'auto', width: '100%', margin: '0 auto', paddingTop: 10, display: 'flex', flexDirection: 'column'}}}>
                {messages.length === 0 ? (
                    <div style={{textAlign: 'center', color: '#0078d4', fontSize: 20, fontWeight: 'bold'}}>
                        Welcome to LunaBrain Chat! Type, talk, or drag something!
                    </div>
                ) : (
                    <SubtleSelection
                        style={{ maxHeight: '90vh' }}
                        columns={messageColumns}
                        items={messages}
                    />
                )}
            </Stack>
            <Stack horizontal verticalAlign="end" horizontalAlign="center"
                   styles={{root: {width: '100%', gap: 15, marginBottom: 20, relative: true}}}>
                <>
                    <TextField
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e, newValue) => setInputValue(newValue)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                        underlined
                        styles={{root: {width: '100%'}}}
                    />
                    <PrimaryButton text="Send" onClick={handleSend}/>
                </>
            </Stack>
        </Stack>
    )
}
