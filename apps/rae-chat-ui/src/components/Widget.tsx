import { useEffect, useState } from 'react';
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const ChatWidget = () => {
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
