import { useEffect } from 'react';
import canvas from './canvas';

export default function FireWorksPage() {
    useEffect(() => {
        canvas.init();
    }, []);

    return (
        <div className="w-100vw h-100vh relative overflow-hidden">
            <canvas id="bg" width={1920} height={1080} className="w-full h-full"></canvas>
            <canvas
                id="firework"
                width={1920}
                height={1080}
                className="absolute w-full h-full top-0 left-0"
            ></canvas>
        </div>
    );
}
