import { ReactElement } from 'react';
import styles from './app.module.css';

export function App(): ReactElement {
    return (
        <div className={styles.title}>
            Welcome rae-chat-ui{' '}
            <span role={'img'} aria-label={'Waving hand emoji'}>
                👋
            </span>
        </div>
    );
}

export default App;
