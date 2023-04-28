/**
 *
 * by littlefean
 */
class Position {
    /**
     *
     * @param x {Number}
     * @param y {Number}
     */
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
}

{
    let canvas = document.getElementById("bgCanvas");
    let ctx = canvas.getContext("2d");


    window.addEventListener("mousemove", function (e) {
        // console.log("mouse::", e.clientX, e.clientY)
        ctx.fillStyle = "#b6fff1";
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.lineTo(e.clientX, e.clientY);
        ctx.closePath();
        ctx.stroke();
        // ctx.fillRect(e.clientX, e.clientY, 12, 12);
    })
}
