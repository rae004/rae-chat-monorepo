import { ReactElement, useEffect, useState } from 'react';
import styles from './app.module.css';

export function App(): ReactElement {
  const [title, setTitle] = useState<string>('');
  console.log('our title: ', title);
  useEffect(() => {
    const fetchResult = async (): Promise<void> => {
      const result = await fetch('http://localhost:3333/api', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await result.json();

      setTitle(json.message);
    };
    fetchResult();
  }, []);

  return (
    <div className={styles.title}>
      {title}{' '}
      <span role={'img'} aria-label={'Waving hand emoji'}>
        👋
      </span>
    </div>
  );
}

export default App;
