import styles from './app.module.css';
import { ReactElement, useEffect, useState } from 'react';
import { getBaseApiUrl } from '../lib/constants';
import ChatThread from '../components/ChatThread';
import ChatWidget from '../components/Widget';

export function App(): ReactElement {
    const [title, setTitle] = useState<string>('Hello!');
    const baseApiUrl = getBaseApiUrl();

    useEffect(() => {
        const fetchResult = async (): Promise<void> => {
            const result = await fetch(
                `${baseApiUrl}/api/hello`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                },
            );
            console.log('our result', result);
            const json = await result.json();
            setTitle(json.message);
        };
        fetchResult();
    }, []);

    return (
        <>
            <div className={styles.title}>
                {title}{' '}
                <span
                    role={'img'}
                    aria-label={'Waving hand emoji'}
                >
                    👋
                </span>
            </div>
            <ChatThread />
            <ChatWidget />
        </>
    );
}

export default App;
