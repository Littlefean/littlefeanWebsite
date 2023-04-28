/**
 *
 * by littlefean
 */
const BODY = document.querySelector("body");
const YUAN_BODY_BGC = "wheat";
const G = 0.01;
const WIDTH = BODY.clientWidth;
const HEIGHT = BODY.clientHeight;

let fruitDestroySound = document.querySelector("#fruitDestroySound");
let bomberDestroySound = document.querySelector("#bomberDestroySound");

let score = 0;  // 最终的分
const SCORE_SPAN = document.querySelector("#scoreNum");
SCORE_SPAN.innerHTML = `${score}`;

let life = 3;  // 生命值
const LIFE_SPAN = document.querySelector("#lifeNum");
LIFE_SPAN.innerHTML = `${life}`;

/**
 * 加分
 * @param num {Number}
 */
function addScore(num) {
    score += num;
    SCORE_SPAN.innerHTML = `${score}`;
}

function addLife(num) {
    life += num;
    LIFE_SPAN.innerHTML = `${life}`;
}

function setLife(num) {
    life = num;
    LIFE_SPAN.innerHTML = `${life}`;
}

// /**
//  * 设置得分
//  * @param num {Number}
//  */
// function setScore(num) {
//     score = num;
//     SCORE_SPAN.innerHTML = `${score}`;
// }

/**
 * 矢量类
 */
class Vector {
    /**
     * 构造一个二维矢量
     * @param x {Number}
     * @param y {Number}
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * 静态果汁类
 */
class StaticJuice {
    constructor(x, y, large) {
        this.x = x;
        this.y = y;
        this.large = large;
    }

    static init(x, y) {
        let l = 100 + Math.random() * 100;
        return new StaticJuice(x, y, l);
    }

    bind() {
        let div = document.createElement("div");
        div.classList.add("staticJuice");
        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;
        div.style.width = `${this.large}px`;
        div.style.height = `${this.large}px`;

        div.style.marginLeft = `${-this.large / 2}px`;
        div.style.marginTop = `${-this.large / 2}px`;
        BODY.appendChild(div);
        setTimeout(() => {
            BODY.removeChild(div);
        }, 5 * 1000);
    }
}

class Effect {
    /**
     * 改变背景效果 bgStr 颜色 ns 秒
     * @param bgStr {String}
     * @param ns {Number}
     */
    static changeBgc(bgStr, ns) {
        BODY.style.backgroundColor = bgStr;  // 炸弹爆炸后会把背景变色
        setTimeout(() => {
            BODY.style.backgroundColor = YUAN_BODY_BGC;
        }, ns * 1000);
    }

    /**
     * 闪烁背景一段时间
     * @param bgStr1 {String}
     * @param bgStr2 {String}
     * @param ms {Number}
     */
    static flashBgc(bgStr1, bgStr2, ms) {
        let count = 0;
        let time = 0;
        let flashAni = setInterval(function () {
            count++;
            time += 100 * count;
            if (count % 2 === 0) {
                BODY.style.backgroundColor = bgStr1;
            } else {
                BODY.style.backgroundColor = bgStr2;
            }
            if (time >= ms) {
                BODY.style.backgroundColor = YUAN_BODY_BGC;
                clearInterval(flashAni);
            }
        }, 100);
    }

    /**
     * 在某个位置蹦出来个文字
     * @param text {String}
     * @param position {Vector}
     * @param color {String}
     */
    static textShow(text, position, color) {
        let textEle = document.createElement("p");
        textEle.classList.add("shortText");
        textEle.innerText = text;
        textEle.style.left = `${position.x}px`;
        textEle.style.top = `${position.y}px`;
        textEle.style.color = color;
        console.log(position.x, position.y);
        BODY.appendChild(textEle);
        let t = 1;
        textEle.style.animationDuration = t + "s";
        setTimeout(function () {
            BODY.removeChild(textEle);
        }, t * 1000);
    }

}

/**
 * 投掷物品类
 */
class ThrowObject {
    /**
     * 构造一个标签
     * @param w {Number}
     * @param h {Number}
     * @param v {Vector}
     * @param p {Vector}
     * @param className {String}
     */
    constructor(w, h, v, p, className) {
        this.ele = document.createElement("div");
        this.ele.classList.add(className);

        // 设置大小
        this.ele.style.width = w + "px";
        this.ele.style.height = h + "px";

        // 设置位置
        this.ele.style.left = `${p.x}px`;
        this.ele.style.top = `${p.y}px`;
        this.position = p;

        // 设置速度
        this.speed = v;

        // 设置鼠标事件
        this.stage = false;
        this.ele.addEventListener("mouseenter", (e) => {
            if (this.stage === false) {
                this.stage = true;
                this.mouseHover(e);
            }
        });

    }

    /**
     * 保证只会调用一次的鼠标触碰函数
     * @param e {MouseEvent}
     */
    mouseHover(e) {
        // 下移图层
        this.ele.style.zIndex = "-100";
        // 变小
        this.ele.style.width = "10px";
        this.ele.style.height = "10px";
    }

    goStep() {
        this.speed.y += G;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // 根据实际位置更新显示位置
        this.ele.style.top = this.position.y + "px";
        this.ele.style.left = this.position.x + "px";
    }

    /**
     * 随机化实例对象
     */
    randomInstance() {
        this.ele.style.animationDuration = Math.random() + 1 + "s";
        this.ele.style.animationDelay = -(Math.random() + 1) + "s";
    }

    /**
     * 把此对象添加到场景
     */
    addToScene() {
        BODY.appendChild(this.ele);
        setTimeout(() => {
            try {
                BODY.removeChild(this.ele);
            } catch (DOMException) {
                console.log("已经去掉了");
            }
        }, 5000);  // 五秒钟清除这个对象
        setInterval(() => {
            this.goStep();
        }, 5);
    }

    /**
     * 返回一个合适的随机投掷位置和速度
     * 这个位置是从底部飞上来的 一般水果都会是这个位置
     * @returns {Vector[]}
     */
    static randPV() {
        // 随机速度
        let vx = Math.random() * 5;
        let vy = 0;

        // 随机位置
        let leftRate = Math.random();
        let topRate = 1;
        let p = new Vector(leftRate * WIDTH, topRate * HEIGHT);
        if (leftRate > 0.5) {
            vx *= -1;
        }
        if (topRate > 0.5) {
            vy = -(Math.random() * 3 + 2);
        }
        let v = new Vector(vx, vy);
        return [p, v];
    }
}

/**
 * 炸弹类
 */
class Bomber extends ThrowObject {
    constructor(w, h, v, p) {
        super(w, h, v, p, "bomber");
    }

    static randInit() {
        let pv = super.randPV();
        let res = new Bomber(100, 100, pv[1], pv[0]);
        res.randomInstance();
        return res;
    }

    mouseHover(e) {
        super.mouseHover(e);
        Effect.changeBgc("gray", 0.5);
        addScore(-10);
        bomberDestroySound.play();
        addLife(-1);
    }
}

/**
 * 超级炸弹类
 */
class SuperBomber extends ThrowObject {
    constructor(w, h, v, p) {
        super(w, h, v, p, "superBomber");
    }

    static randInit() {
        let pv = super.randPV();
        let res = new this(100, 100, pv[1], pv[0]);
        res.randomInstance();
        return res;
    }

    mouseHover(e) {
        super.mouseHover(e);
        // Effect.changeBgc("darkred", 0.8);
        Effect.flashBgc("gray", "darkgray", 1000);
        addScore(-50);
        bomberDestroySound.play();
    }
}


/**
 * 水果类
 */
class Fruit extends ThrowObject {
    /**
     * 构造一个水果盒子
     * @param w {Number}  宽度
     * @param h {Number}  高度
     * @param v {Vector}  速度
     * @param p {Vector}  位置
     */
    constructor(w, h, v, p) {
        super(w, h, v, p, "fruit");
    }

    mouseHover(e) {
        super.mouseHover(e);
        // 添加爆浆
        StaticJuice.init(e.clientX, e.clientY).bind();
        // 加分
        addScore(1);
        Effect.textShow("+1", new Vector(e.clientX, e.clientY), "green");

        // 播放声音
        fruitDestroySound.play();
        // 水果被切了之后，一段时间之后删除
        setTimeout(() => {
            try {
                BODY.removeChild(this.ele);
            } catch (DOMException) {
                console.log("删除失败？");
            }
        }, 2000);
    }

    /**
     * 随机水果贴纸的名字
     * @returns {string}
     */
    static randBackgroundName() {
        return `url("imgs/水果${Math.floor(Math.random() * 4) + 1}.png")`;
    }

    /**
     * 随机获得一个水果盒子
     * @returns {Fruit}
     */
    static randInit() {
        // 随机大小
        let w = Math.random() * 50 + 100;
        let h = w;

        let pv = super.randPV();
        let res = new Fruit(w, h, pv[1], pv[0]);
        res.ele.style.backgroundImage = this.randBackgroundName();
        res.randomInstance();
        return res;
    }
}

/**
 * 超级水果类
 */
class SuperFruit extends Fruit {
    constructor(w, h, v, p) {
        super(w, h, v, p);
        this.ele.classList.add("superFruit");
    }

    static randInit() {
        let pv = super.randPV();
        let res = new SuperFruit(50, 50, pv[1], pv[0]);
        res.ele.style.backgroundImage = `url("imgs/特殊水果1.png")`;
        return res;
    }

    mouseHover(e) {
        super.mouseHover(e);
        addScore(19);  // 再额外加分
        Effect.textShow("+10", new Vector(e.clientX, e.clientY), "yellow");
        Effect.changeBgc("yellow", 0.5);
    }
}

window.onload = function () {
    BODY.style.cursor = `url("cur/鼠标.cur") 5 5, default`;

    /**
     * 接机模式
     */
    function gameStart() {
        const countDownSecond = 60;
        let cd = countDownSecond;
        // 普通水果
        setInterval(function () {
            let num = Math.floor(1 + Math.random() * 5);
            for (let i = 0; i < num; i++) {
                Fruit.randInit().addToScene();
            }
        }, 1000);

        // 炸弹
        setInterval(function () {
            Bomber.randInit().addToScene();
        }, 3000);
        // 超级炸弹
        setInterval(function () {
            SuperBomber.randInit().addToScene();
        }, 6000);
        // 超级水果
        setInterval(function () {
            SuperFruit.randInit().addToScene();
        }, 5000);
        // 刷新倒计时
        setInterval(function () {
            document.querySelector(".countDown").innerHTML = String(cd--);
        }, 1000);
        // 游戏结束
        setTimeout(function () {
            let common;
            if (score < 0) {
                common = "你他妈故意找茬是吧？"
            } else if (score < 150) {
                common = "你太逊了啦"
            } else if (score < 250) {
                common = "你一般般了啦"
            } else if (score < 300) {
                common = "你还行"
            } else {
                common = "你他娘的真是个天才"
            }
            alert(`游戏结束了，你他妈得了${score}分，${common}`);
            location.reload();
        }, countDownSecond * 1000);
    }

    /**
     * 困难生存模式
     */
    function infernoMode() {
        let time = 0;
        setInterval(function () {
            time++;
            if (life < 0) {
                alert("结束了");
                location.reload();
            }
        }, 1000);
        // 普通水果
        setInterval(function () {
            let num = Math.floor(1 + Math.random() * 5);
            for (let i = 0; i < num; i++) {
                Fruit.randInit().addToScene();
            }
        }, 1000);
        // 超级水果
        setInterval(function () {
            SuperFruit.randInit().addToScene();
        }, 5000);
        // 炸弹
        setInterval(function () {
            let num = Math.floor(time / 20);
            for (let i = 0; i < num; i++) {
                Bomber.randInit().addToScene();
            }
        }, 3000);
    }

    /**
     * 魔鬼极限模式
     */
    function impossibleMode() {
        setLife(0);
        let time = 0;
        setInterval(function () {
            time++;
            if (life < 0) {
                alert("结束了" + score + "分" + "，坚持了" + time + "秒！");
                setLife(0);
                location.reload();
            }
        }, 1000);
        // 普通水果
        setInterval(function () {
            let num = Math.floor(1 + Math.random() * 5);
            for (let i = 0; i < num; i++) {
                Fruit.randInit().addToScene();
            }
        }, 1000);
        // 炸弹
        setInterval(function () {
            let num = Math.floor(time / 5);
            for (let i = 0; i < num; i++) {
                Bomber.randInit().addToScene();
            }
        }, 3000);
        // 超级炸弹
        setInterval(function () {
            let num = Math.floor(time / 10);
            for (let i = 0; i < num; i++) {
                SuperBomber.randInit().addToScene();
            }
        }, 6000);
    }

    gameStart();
    // infernoMode();
    // impossibleMode();

}
