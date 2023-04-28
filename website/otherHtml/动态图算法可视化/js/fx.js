/**
 * 特效线
 * by littlefean
 */
class Fx {
    /**
     *
     * @param loc1 {Vector}
     * @param loc2 {Vector}
     * @param delay {Number}
     */
    constructor(loc1, loc2, delay) {
        this.time = 0;
        this.delay = delay;
        this.loc1 = loc1;
        this.loc2 = loc2;
        this.color = "rgba(0, 200, 255, 0.8)";
        this.width = 10;
        this.duration = DFS_DURATION;
    }

    tick() {
        this.time++;
    }

    rend(ctx) {
        if (this.delay <= this.time && this.time <= this.duration + this.delay) {
            ctx.beginPath();
            ctx.lineWidth = this.width;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.loc1.x, this.loc1.y);
            ctx.lineTo(this.loc2.x, this.loc2.y);
            ctx.closePath();
            ctx.stroke();
        }
    }
}
