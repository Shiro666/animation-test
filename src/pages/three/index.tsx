import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import gameMap from './map';

export default function ThreePage() {
    const canvasDomRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasDomRef.current) {
            return;
        }
        gameMap.init(canvasDomRef.current);
        gameMap.start();
    }, [canvasDomRef]);
    return (
        <div className={styles.threePage}>
            <canvas className={styles.canvas} ref={canvasDomRef}></canvas>
        </div>
    );
}
