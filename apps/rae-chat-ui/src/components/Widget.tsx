import { useState } from 'react';
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getBaseApiUrl } from '../lib/constants';
import getChatGptMessagesFromResponse from '../lib/getChatGptMessagesFromResponse';
const ChatWidget = () => {
    const baseApiUrl = getBaseApiUrl();
    const title = 'RAE Chat';
    const subtitle = 'Your friendly-ish chat-bot';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                const result = await fetch(
                    `${baseApiUrl}/api/hello`,
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
        fetchResult().then((res) => {
            for (const message of res) {
                addResponseMessage(message.content);
                setResponseChatMessages(message.content);
            }
        });

        const newUserMessage = message as never;
        const newUserMessages = [
            ...userChatMessages,
            newUserMessage,
        ];

        setUserChatMessages(newUserMessages);
    };

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
