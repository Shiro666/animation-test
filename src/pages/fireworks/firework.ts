import { config } from './config';
import Particle from './particle';

export interface FireWorkInfo {
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
    count: number;
    wait: number;
}

export enum FireSatus {
    RISE = 1,
    WAIT = 2,
    EXPLODE = 3
}

export default class FireWork {
    private x: number;
    private y: number;
    private yEnd: number;
    private size: number;
    private vy: number;
    private opacity: number;
    private color: string;
    private wait: number;
    private count: number;
    private particles: Particle[];
    private status: FireSatus;

    constructor({ x, y, yEnd, count, wait }: FireWorkInfo) {
        this.x = x || config.width / 8 + ((config.width * 3) / 4) * Math.random();
        this.y = y || config.height;
        this.yEnd = yEnd || config.width / 8 + ((config.width * 3) / 8) * Math.random();
        this.size = 2;
        this.vy = -3;
        this.opacity = 0.8;
        this.color = `hsla(${(360 * Math.random()) | 0}, 80%, 60%, 1)`;
        this.wait = wait || 30 + Math.random() * 30;
        this.count = count || 300;
        this.particles = [];
        this.createParticles();
        this.status = FireSatus.RISE;
    }

    createParticles = () => {
        for (let i = 0; i < this.count; i++) {
            this.particles.push(new Particle({ x: this.x, y: this.yEnd }));
        }
    };

    rise = () => {
        this.y += this.vy;
        this.vy += 0.005;
        if (this.y - this.yEnd <= 50) {
            this.opacity = (this.y - this.yEnd) / 50;
        }
        if (this.y <= this.yEnd) {
            this.status = FireSatus.WAIT;
        }
    };

    render = (ctx: CanvasRenderingContext2D) => {
        switch (this.status) {
            case FireSatus.RISE: {
                ctx.save();
                ctx.beginPath();
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = this.opacity;
                ctx.translate(this.x, this.y);
                ctx.scale(0.8, 2.3);
                ctx.translate(-this.x, -this.y);
                ctx.fillStyle = this.color;
                ctx.arc(
                    this.x + Math.sin(Math.PI * 2 * Math.random()) / 1.2,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2,
                    false
                );
                ctx.fill();
                ctx.restore();

                this.rise();
                return true;
            }
            case FireSatus.WAIT: {
                if (--this.wait <= 0) {
                    this.opacity = 1;
                    this.status = FireSatus.EXPLODE;
                }
                return true;
            }
            case FireSatus.EXPLODE: {
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                for (let i = 0; i < this.particles.length; i++) {
                    this.particles[i].render(ctx);
                }
                ctx.restore();
                this.opacity -= 0.01;
                return this.opacity > 0;
            }
            default:
                return false;
        }
    };
}
