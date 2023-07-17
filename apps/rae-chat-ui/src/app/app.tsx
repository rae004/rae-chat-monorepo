import styles from './app.module.css';
import { ReactElement, useState } from 'react';
import ChatWidget from '../components/Widget';
import Cta from '../components/Cta';
import apiKeyCheck from '../lib/checkApiKey';

export function App(): ReactElement {
    const title = 'Hello from RAE Chat!!!';
    const [isAuthed, setIsAuthed] = useState<boolean>(false);

    apiKeyCheck(setIsAuthed).then((res) => {
        console.log('Are we authed? ', res);
    });

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
