/**
 *
 * by littlefean
 */

class Ball {

    constructor(id) {
        this.id = id;

        this.r = 10;
        this.color = CIRCLE_BODY_COLOR;
        this.borderColor = LINE_COLOR;
        this.strokeWidth = 1;
        // this.bindBoard = null;
        this.marked = false;  // 是否着重标记？用于渲染
        this.loc = new Vector(0, 0);
        this.speed = Vector.randCircle();

        this.weight = 1;  // 这个数值越小，表示越容易走
    }

    rend(ctx) {
        ctx.fillStyle = this.color;
        if (this.marked) {
            ctx.fillStyle = RED_COLOR;
        }
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.borderColor;
        ctx.beginPath();
        let R = this.r / this.weight;  // 实际显示的半径
        ctx.arc(this.loc.x, this.loc.y, R, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        let text = this.id.toString();
        ctx.fillStyle = CIRCLE_BODY_COLOR;
        ctx.font = "20px Microsoft YaHei";
        ctx.textAlign = "center";
        //垂直对齐方式
        ctx.textBaseline = "top";
        ctx.fillText(text, this.loc.x, this.loc.y - R - 2.5 * 7 + 1);
    }
}
