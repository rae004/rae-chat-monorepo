import { SetStateAction, useEffect, useState } from 'react';
import {
    addResponseMessage,
    Widget,
    toggleMsgLoader,
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {
    getRaeChatUserDetails,
    getBaseApiUrl,
} from '../lib/constants';
import getChatGptMessagesFromResponse from '../lib/getChatGptMessagesFromResponse';
const ChatWidget = () => {
    const title = 'RAE Chat';
    const subtitle = 'Your friendly-ish chat-bot';
    const initialAgentMessage =
        'Type your questions; an agent will be with you momentarily.';
    const baseApiUrl = getBaseApiUrl();
    const { apiKey, apiUserEmail } = getRaeChatUserDetails();
    const [, setChatWindowOpen] = useState(true);
    const [userChatMessages, setUserChatMessages] = useState(
        [],
    );
    const [, setResponseChatMessages] = useState([]);

    const handleToggle = (chatWindowOpen: boolean) => {
        setChatWindowOpen(!chatWindowOpen);
    };

    const handleNewUserMessage = (message: string) => {
        const fetchBody = {
            messages: [
                {
                    content: message,
                    role: 'user',
                },
            ],
        };

        const fetchResult = async (): Promise<any[]> => {
            if (message.length) {
                toggleMsgLoader();
                const result = await fetch(
                    `${baseApiUrl}/api/chat?apiKey=${apiKey}&apiUserEmail=${apiUserEmail}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify(fetchBody),
                    },
                );
                const json = await result.json();

                return getChatGptMessagesFromResponse(json);
            }
            return [];
        };
        fetchResult()
            .then((res) => {
                for (const message of res) {
                    addResponseMessage(message.content);
                    setResponseChatMessages(message.content);
                }
            })
            .finally(() => {
                toggleMsgLoader();
            });

        const newUserMessage = message as never;
        const newUserMessages = [
            ...userChatMessages,
            newUserMessage,
        ];

        setUserChatMessages(newUserMessages);
    };

    useEffect(() => {
        addResponseMessage(initialAgentMessage);
        setResponseChatMessages(initialAgentMessage as never);
    }, []);

    return (
        <Widget
            handleNewUserMessage={handleNewUserMessage}
            handleToggle={handleToggle}
            title={title}
            subtitle={subtitle}
            emojis={true}
        />
    );
};

export default ChatWidget;
