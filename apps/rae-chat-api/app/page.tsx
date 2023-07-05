'use client';

import { useChat } from 'ai/react';
import styles from './page.module.css';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } =
        useChat();

    return (
        <div>
            <h1 className={styles.title}>Rae Chat:</h1>
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
}
