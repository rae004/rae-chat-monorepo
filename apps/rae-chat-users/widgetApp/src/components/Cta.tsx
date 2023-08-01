import styles from '../app/app.module.css';
import Arrow from './Arrow';

const Cta = ({ ...props }) => {
    const { title } = props;
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
            <div className={styles.cta}>
                <span className={styles.title}>
                    Click the Chat Widget to start a chat!
                </span>
                <span>
                    <Arrow />
                </span>
            </div>
        </>
    );
};

export default Cta;
