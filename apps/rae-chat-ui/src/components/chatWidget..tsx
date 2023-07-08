import { useState } from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const ChatWidget = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setChatWindowOpen] = useState(true);
    const [userChatMessages, setUserChatMessages] = useState(
        [],
    );

    const handleToggle = (chatWindowOpen: boolean) => {
        setChatWindowOpen(!chatWindowOpen);
    };

    const handleNewUserMessage = (message: any) => {
        console.log(`New message incoming! ${message}`);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUserChatMessages([...userChatMessages, message]);
        // Now send the message throught the backend API
    };

    return (
        <Widget
            handleNewUserMessage={handleNewUserMessage}
            handleToggle={handleToggle}
            title="RAE Chat"
            subtitle="Your friendlyish chatbot"
        />
    );
};

export default ChatWidget;
