import { useNavigate } from 'react-router-dom';
import styles from './home.module.scss';

export default function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/three');
    };

    return (
        <div className={styles.homePage}>
            <button className={styles.button} onClick={handleClick}>
                ENTER PAGE
            </button>
        </div>
    );
}
