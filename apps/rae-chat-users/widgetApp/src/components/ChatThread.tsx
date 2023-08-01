import { getBaseApiUrl } from '../lib/constants';
import { useChat } from 'ai/react';

const ChatThread = () => {
    const baseApiUrl = getBaseApiUrl();
    const { messages, input, handleInputChange, handleSubmit } =
        useChat({ api: `${baseApiUrl}/api/stream` });

    return (
        <div>
            <h1>Rae Chat:</h1>
            {messages.map((m) => (
                <div key={m.id}>
                    {m.role}: {m.content}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
};

export default ChatThread;
