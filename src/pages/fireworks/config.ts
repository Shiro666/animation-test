export const config = {
    width: 1920,
    height: 1080,
    canvases: ['bg', 'firework'],
    skyColor: '(210, 60%, 5%, 0.2)',
    fireworkTime: { min: 30, max: 60 },
    //烟花参数本身有默认值 传入undefined则使用默认参数
    fireworkOpt: {
        x: undefined,
        y: undefined,
        xEnd: undefined,
        yEnd: undefined,
        count: 300, // 炸裂后粒子数
        wait: undefined // 消失后 => 炸裂  等待时间
    }
};
