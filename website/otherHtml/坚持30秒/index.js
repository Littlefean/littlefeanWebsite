/**
 *
 * by littlefean
 */
class Vector {
    /**
     *
     * @param x {Number}
     * @param y {Number}
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    multiple(n) {
        return new Vector(this.x * n, this.y * n);
    }
}

let time = 0;

class Stone {
    constructor() {
        this.pos = new Vector(1, 1);
        this.speed = new Vector(5, 5);
        this.ele = document.createElement("div");
        this.ele.classList.add("stone");

        this.ele.addEventListener("mouseenter", () => {
            this.ele.style.backgroundColor = "red";
            if (time >= 30) {
                alert("你成功了，你坚持了" + time + "s");
                location.reload();
            } else {
                alert("你输了，你坚持了" + time + "s");
                location.reload();
            }

        })
    }

    /**
     *
     * @param mousePos {Vector}
     */
    static randInit(mousePos) {
        let res = new Stone();
        // 左右上下
        let rand = Math.random();
        if (rand < 0.25) {
            // 上边
            res.pos.y = 0;
            res.pos.x = Math.random() * BODY.clientWidth;
        } else if (rand < 0.5) {
            // 下边
            res.pos.y = BODY.clientHeight;
            res.pos.x = Math.random() * BODY.clientWidth;
        } else if (rand < 0.75) {
            // 左边
            res.pos.x = 0;
            res.pos.y = Math.random() * BODY.clientHeight;
        } else {
            // 右边
            res.pos.x = BODY.clientWidth;
            res.pos.y = Math.random() * BODY.clientHeight;
        }
        // let speed = Math.random() * 100 + 50;
        let speed = 200;
        res.speed.x = (mousePos.x - res.pos.x) / speed;
        res.speed.y = (mousePos.y - res.pos.y) / speed;

        res.ele.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        return res;
    }

    bind() {
        BODY.appendChild(this.ele);
        console.log("bind");
        let t = 0;
        let moveAni = setInterval(() => {
            this.step(t);
            this.renew();
            t++;
            if (t * 10 > 3000) {
                BODY.removeChild(this.ele);
                clearInterval(moveAni);
            }
        }, 10);
    }

    renew() {
        this.ele.style.left = this.pos.x + "px";
        this.ele.style.top = this.pos.y + "px";
    }

    step(t) {
        if (t > 100) {
            this.pos.add(this.speed);
        } else {
            this.pos.add(this.speed);
        }

    }

}

const BODY = document.querySelector("body");


function getMousePos(event) {            //event是一个声明了全局变量的一个对象
    let e = event || window.event;       //Firefox下是没有event这个对象的！！
    return new Vector(e.screenX, e.screenY);
}

window.onload = function () {
    console.log(BODY.clientWidth);
    console.log(BODY.clientHeight);
    let mouseLoc = new Vector(0, 0);
    window.addEventListener("mousemove", function (e) {
        mouseLoc.x = e.clientX;
        mouseLoc.y = e.clientY;
    })
    setInterval(() => {
        time++;
    }, 1000);

    setInterval(() => {
        if (mouseLoc.x === 0 || mouseLoc.x === BODY.clientWidth ||
            mouseLoc.y === 0 || mouseLoc.y === BODY.clientHeight) {
            alert("你触碰边缘了");
            location.reload();
        }
    }, 100);

    setInterval(() => {
        for (let i = 0; i < time; i++) {
            Stone.randInit(mouseLoc).bind();
        }
    }, 500);
}
