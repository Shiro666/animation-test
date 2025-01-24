interface ParticleInfo {
    x: number;
    y: number;
    size?: number;
}

export default class Particle {
    private x: number;
    private y: number;
    private size: number;
    private vx: number;
    private vy: number;

    constructor({ x, y, size }: ParticleInfo) {
        this.x = x;
        this.y = y;
        this.size = size || 1;
        const rate = Math.random();
        const angle = Math.PI * 2 * Math.random();
        this.vx = rate * Math.cos(angle);
        this.vy = rate * Math.sin(angle);
    }

    private go = () => {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // 重力影响
        this.vx *= 0.98;
        this.vy *= 0.98;
    };

    public render = (ctx: CanvasRenderingContext2D) => {
        this.go();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };
}
