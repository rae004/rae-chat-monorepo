import { useEffect, useState } from 'react';
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getBaseApiUrl } from '../lib/constants';
import getChatGptMessagesFromResponse from '../lib/getChatGptMessagesFromResponse';
const ChatWidget = () => {
    const baseApiUrl = getBaseApiUrl();
    const title = 'RAE Chat';
    const subtitle = 'Your friendly-ish chat-bot';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setChatWindowOpen] = useState(true);
    const [userChatMessages, setUserChatMessages] = useState(
        [],
    );

    const handleToggle = (chatWindowOpen: boolean) => {
        setChatWindowOpen(!chatWindowOpen);
    };

    const handleNewUserMessage = (message: string) => {
        const newUserMessage = message as never;
        const newUserMessages = [
            ...userChatMessages,
            newUserMessage,
        ];

        setUserChatMessages(newUserMessages);
        // Now send the message throught the backend API
    };

    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
        const fetchBody = {
            messages: [
                {
                    content: 'Hello!',
                    role: 'user',
                },
            ],
        };
        console.log('our fetchBody in widget', fetchBody);

        const fetchResult = async (): Promise<void> => {
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
            const messages =
                getChatGptMessagesFromResponse(json);
            console.log('our result in widget', messages);
        };
        fetchResult();
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
