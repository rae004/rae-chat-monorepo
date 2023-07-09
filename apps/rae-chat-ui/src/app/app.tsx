import styles from './app.module.css';
import { ReactElement, useEffect, useState } from 'react';
import { getBaseApiUrl } from '../lib/constants';
import ChatWidget from '../components/Widget';
import Cta from '../components/Cta';

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

            const json = await result.json();
            setTitle(json.message);
        };
        fetchResult();
    }, []);

    return (
        <div className={styles.app}>
            <Cta {...{ title }} />
            {/*<ChatThread />*/}
            <ChatWidget />
        </div>
    );
}

export default App;
