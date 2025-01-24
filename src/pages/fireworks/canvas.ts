import { config } from './config';
import FireWork, { FireWorkInfo } from './firework';

const FPS = 60;

class Canvas {
    private fireworks: FireWork[] = [];
    private width = 0;
    private height = 0;
    private fireworkTime = 0;
    private bgCtx: CanvasRenderingContext2D | null = null;
    private fireworkCtx: CanvasRenderingContext2D | null = null;
    private lastTime = 0;

    public init = () => {
        this.setProperty();
        this.renderBg();
        this.loop(0);
    };

    public setProperty = () => {
        this.fireworks = [];
        this.width = config.width;
        this.height = config.height;
        const { min, max } = config.fireworkTime;
        this.fireworkTime = (min + (max - min) * Math.random()) | 0;
        this.bgCtx = (document.querySelector('#bg') as HTMLCanvasElement).getContext('2d');
        this.fireworkCtx = (document.querySelector('#bg') as HTMLCanvasElement).getContext('2d');
    };

    public renderBg = () => {
        (this.bgCtx as CanvasRenderingContext2D).fillStyle = config.skyColor;
        (this.bgCtx as CanvasRenderingContext2D).fillRect(0, 0, this.width, this.height);
    };

    public loop = (time: number) => {
        if (!time || time - this.lastTime > 1000 / FPS) {
            this.lastTime = time;
            this.fireworkCtx?.fillRect(0, 0, this.width, this.height);

            if (--this.fireworkTime <= 0) {
                this.fireworks.push(new FireWork({} as FireWorkInfo));
                const { min, max } = config.fireworkTime;
                this.fireworkTime = (min + (max - min) * Math.random()) | 0;
            }

            for (let i = this.fireworks.length - 1; i >= 0; i--) {
                !this.fireworks[i].render(this.fireworkCtx as CanvasRenderingContext2D) &&
                    this.fireworks.splice(i, 1);
            }
        }
        window.requestAnimationFrame(this.loop);
    };
}

const canvas = new Canvas();
export default canvas;
