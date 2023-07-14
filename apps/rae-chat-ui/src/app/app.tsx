import styles from './app.module.css';
import { ReactElement, useEffect, useState } from 'react';
import { getBaseApiUrl } from '../lib/constants';
import ChatWidget from '../components/Widget';
import Cta from '../components/Cta';
import apiKeyCheck from '../lib/checkApiKey';

export function App(): ReactElement {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('Hello!');
    const baseApiUrl = getBaseApiUrl();
    apiKeyCheck(setIsAuthed).then((res) => {
        console.log('Are we authed? ', res);
    });

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

    return isAuthed ? (
        <div className={styles.app}>
            <Cta {...{ title }} />
            {/*<ChatThread />*/}
            <ChatWidget />
        </div>
    ) : (
        <div className={styles.app}>
            <h1>Not Authorized</h1>
        </div>
    );
}

export default App;
