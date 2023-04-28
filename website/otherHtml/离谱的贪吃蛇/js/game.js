/**
 *
 * by littlefean
 */
/**
 * 世界二维数组
 * 0 表示空气
 * 0.1~1 表示食物
 * -1 表示墙
 */
let gameObj = {
    air: 0,
    food: 1,
    wall: -1,
    cleaner: 2,
    foodPackage: 3,
    cutBody: 4,
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
    }

    eq(x, y) {
        return this.x === x && this.y === y;
    }

    eqVec(otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y;
    }

    /**
     * 自加
     * @param addX
     * @param addY
     */
    plus(addX, addY) {
        this.x += addX;
        this.y += addY;
    }

    plusVec(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    getReversed() {
        return new Vector(-this.x, -this.y);
    }

    /**
     * 返回这个向量的弧度制形式数
     */
    toTheta() {
        let alpha = Math.atan(this.x / this.y);
        if (this.y < 0) {
            alpha *= -1;
        }
        return alpha;
    }
}

/**
 * 此类表示一个贪吃蛇身体方块的对象
 */
class BodyBox {
    /**
     *
     * @param locVec {Vector}
     * @param speedVec {Vector}
     */
    constructor(locVec, speedVec) {
        this.loc = locVec;
        this.vec = speedVec;
    }
}

class Snake {
    /**
     * 蛇的构造方法，传入蛇头的位置
     * @param loc {Vector}
     * @param bindGame {Game}
     */
    constructor(loc, bindGame) {
        // 前进方向矢量
        this.speed = new Vector(1, 0);
        // 身体队列
        // [头部，身体，，，尾部]
        /**
         *
         * @type {BodyBox[]}
         */
        this.bodyList = [new BodyBox(loc, this.speed.copy())];

        // 绑定的game
        this.bindGame = bindGame;
    }

    /**
     * 蛇向前走一步
     */
    goStep() {
        // 如果长度只有1个蛇头
        if (this.bodyList.length === 1) {
            this.bodyList[0].loc.plusVec(this.speed);
        } else {
            // 获取头部的位置
            let headLoc = this.bodyList[0].loc;

            // 获取最后一个元素
            let lastBody = this.bodyList.pop();
            lastBody.loc = headLoc.copy();
            lastBody.loc.plusVec(this.speed);
            this.bodyList.unshift(lastBody);
        }
        // 判断当前是否吃了一个食物
        const headLoc = this.getHeadLoc();
        const locCode = this.bindGame.getCodeByLoc(headLoc);
        if (locCode === gameObj.food) {
            this.bindGame.score++;
            this.extend();
            // 清除这个食物
            this.bindGame.setCodeByLoc(headLoc, gameObj.air);
        } else if (locCode === gameObj.cleaner) {
            // 十字清除
            for (let y = 0; y < this.bindGame.size.h; y++) {
                this.bindGame.clearWall(headLoc.x, y);
            }
            for (let x = 0; x < this.bindGame.size.w; x++) {
                this.bindGame.clearWall(x, headLoc.y);
            }
            this.bindGame.score += 10;
            this.extend();
            this.bindGame.setCodeByLoc(headLoc, gameObj.air);
            this.bindGame.bindEle.style.animation = "split 0.2s linear";
            setTimeout(() => {
                this.bindGame.bindEle.style.animation = "";
            }, 200);

        } else if (locCode === gameObj.foodPackage) {
            const range = 2;
            for (let dy = -range; dy <= range; dy++) {
                for (let dx = -range; dx <= range; dx++) {
                    let loc = new Vector(headLoc.x + dx, headLoc.y + dy);
                    if (this.bindGame.getCodeByLoc(loc) === gameObj.air) {
                        this.bindGame.setCodeByLoc(loc, gameObj.food);
                    }
                }
            }
        } else if (locCode === gameObj.cutBody) {
            let res = [];
            for (let i = 0; i < this.bodyList.length; i++) {
                if (i % 2 === 0) {
                    res.push(this.bodyList[i]);
                }
            }
            this.bodyList = res;
        }
    }

    /**
     * 获取头部的位置
     * @returns {Vector}
     */
    getHeadLoc() {
        return this.bodyList[0].loc;
    }

    /**
     * 蛇身体增长一个格子
     */
    extend() {
        let lastLoc = this.bodyList[this.bodyList.length - 1].loc.copy();
        let lastSpeed = this.bodyList[this.bodyList.length - 1].vec.copy();
        this.bodyList.push(new BodyBox(lastLoc, lastSpeed));
    }

    /**
     * 重新设定蛇的速度
     * 如果是正在向上走，就不能设定向下走的方向
     * @param x
     * @param y
     */
    resetSpeed(x, y) {
        // 检测是否能够设定这个方向
        // 也就是检测新设定的速度是不是当前速度的反向
        if (!new Vector(x, y).eqVec(this.speed.getReversed())) {
            this.speed.reset(x, y);
        }
    }

    /**
     * 将整个蛇整体移动
     * @param vec 移动矢量
     */
    move(vec) {
        for (let body of this.bodyList) {
            body.loc.plusVec(vec);
        }
    }
}

class Game {
    constructor(bindEle) {
        this.bindEle = bindEle
        this.length = 30;
        this.speed = 200;  //  setInterval里的参数
        this.time = 0;  // 记录这个游戏经过了多少个时间数
        this.score = 0;  // 分数

        this.size = {w: this.length, h: this.length};
        this.userSnake = new Snake(new Vector(5, 5), this);

        // 初始化棋盘
        this.arr = [];
        for (let y = 0; y < this.size.h; y++) {
            let line = [];
            for (let x = 0; x < this.size.w; x++) {
                line.push(gameObj.air);
            }
            this.arr.push(line);
        }
        // animation二维网格
        this.aniArr = [];
        for (let y = 0; y < this.size.h; y++) {
            let line = [];
            for (let x = 0; x < this.size.w; x++) {
                line.push("");
            }
            this.aniArr.push(line);
        }

        // this.initWall();
        // this.initWallLine();
        // this.initWallCol();
        this.initWallSquare();

        // 初始化html显示
        let boardEle = this.bindEle.querySelector(".board");
        for (let y = 0; y < this.size.h; y++) {
            let lineEle = newDiv("line");
            for (let x = 0; x < this.size.w; x++) {
                let box = newDiv("box");
                lineEle.appendChild(box);
            }
            boardEle.appendChild(lineEle);
        }

        // 添加按键控制效果
        window.addEventListener("keydown", (e) => {
            console.log(e.key)
            if (e.key === "ArrowUp") {
                this.userSnake.resetSpeed(0, -1);
            } else if (e.key === "ArrowDown") {
                this.userSnake.resetSpeed(0, 1);
            } else if (e.key === "ArrowLeft") {
                this.userSnake.resetSpeed(-1, 0);
            } else if (e.key === "ArrowRight") {
                this.userSnake.resetSpeed(1, 0);
            }
            // 添加斜着走的效果
            if (e.key === "7") {
                this.userSnake.resetSpeed(-1, -1);
            } else if (e.key === "9") {
                this.userSnake.resetSpeed(1, -1);
            } else if (e.key === "1") {
                this.userSnake.resetSpeed(-1, 1);
            } else if (e.key === "3") {
                this.userSnake.resetSpeed(1, 1);
            }
        })
    }

    initWall() {
        for (let y = 0; y < this.size.h; y++) {
            for (let x = 0; x < this.size.w; x++) {
                if (Math.random() < 0.1) {
                    this.arr[y][x] = gameObj.wall;
                }
            }
        }
    }

    inBoard(x, y) {
        if (0 <= x && x < this.size.w) {
            if (0 <= y && y < this.size.h) {
                return true;
            }
        }
        return false;
    }

    setWall(x, y) {
        if (this.inBoard(x, y)) {
            this.arr[y][x] = gameObj.wall;
        }
    }

    clearWall(x, y) {
        if (this.inBoard(x, y)) {
            this.arr[y][x] = gameObj.air;
        }
    }

    initWallLine() {
        for (let y = 0; y < this.size.h; y++) {
            let startX = randInt(this.size.w);
            let randomLen = randInt(this.size.w / 3);
            for (let x = startX; x < startX + randomLen; x++) {
                this.setWall(x, y);
            }
        }
    }

    initWallCol() {
        for (let x = 0; x < this.size.w; x++) {
            let startY = randInt(this.size.h);
            let randomLen = randInt(this.size.h / 3);
            for (let y = startY; y < startY + randomLen; y++) {
                this.setWall(x, y);
            }
        }
    }

    initWallSquare() {
        for (let y = 0; y < this.size.h; y++) {
            for (let x = 0; x < this.size.w; x++) {
                if (Math.random() < 0.05) {
                    let large = randInt(5);
                    for (let dy = 0; dy < large; dy++) {
                        for (let dx = 0; dx < large; dx++) {
                            this.setWall(x + dx, y + dy);
                        }
                    }
                }
            }
        }
    }

    getCodeByLoc(loc) {
        if (0 <= loc.y && loc.y < this.size.h) {
            if (0 <= loc.x && loc.x < this.size.w) {
                return this.arr[loc.y][loc.x];
            }
        }
    }

    setCodeByLoc(loc, value) {
        if (0 <= loc.y && loc.y < this.size.h) {
            if (0 <= loc.x && loc.x < this.size.w) {
                this.arr[loc.y][loc.x] = value;
            }
        }
    }

    /**
     * 随机增添食物
     */
    addFood(val) {
        let x = randInt(this.size.w);
        let y = randInt(this.size.h);
        this.arr[y][x] = val;
        // todo 可能会增加到身体重合的位置上
    }

    /**
     * 检测游戏是否结束
     * @returns {boolean}
     */
    isGameOver() {
        let headLoc = this.userSnake.getHeadLoc();
        // 越界检测
        if (!(headLoc.x >= 0 && headLoc.x < this.size.w)) {
            return true;
        }
        if (!(headLoc.y >= 0 && headLoc.y < this.size.h)) {
            return true;
        }
        // 撞墙检测
        if (this.arr[headLoc.y][headLoc.x] === gameObj.wall) {
            return true;
        }
        // 自己咬到自己的检测
        if (this.userSnake.bodyList.length > 3) {
            for (let i = 1; i < this.userSnake.bodyList.length; i++) {
                if (this.userSnake.bodyList[i].loc.eq(headLoc.x, headLoc.y)) {
                    return true;
                }
            }
        }
        return false;
    }

    tick() {
        this.time++;
        this.userSnake.goStep();
        if (this.time % 4 === 0) {
            this.addFood(gameObj.food);
        }
        if (this.time % 10 === 0) {
            this.addFood(gameObj.cleaner);
        }
        if (this.time % 15 === 0) {
            this.addFood(gameObj.foodPackage);
        }
        if (this.time % 20 === 0) {
            this.addFood(gameObj.cutBody);
        }
    }

    /**
     * 渲染
     */
    rend() {
        let boardEle = this.bindEle.querySelector(".board");
        let scoreEle = this.bindEle.querySelector("#score");
        scoreEle.innerHTML = this.score.toString();

        // 先渲染一遍大背景
        let classArr = [];
        for (let y = 0; y < this.size.h; y++) {
            let line = [];
            for (let x = 0; x < this.size.w; x++) {
                switch (this.arr[y][x]) {
                    case gameObj.air:
                        line.push("air");
                        break;
                    case gameObj.food:
                        line.push("food");
                        break;
                    case gameObj.wall:
                        line.push("wall");
                        break;
                    case gameObj.cleaner:
                        line.push("cleaner");
                        break;
                    case gameObj.foodPackage:
                        line.push("foodPackage");
                        break;
                    case gameObj.cutBody:
                        line.push("cutBody");
                        break;
                }
            }
            classArr.push(line);
        }
        // 设置transformCss
        let transArr = [];
        for (let y = 0; y < this.size.h; y++) {
            let line = [];
            for (let x = 0; x < this.size.w; x++) {
                line.push("");
            }
            transArr.push(line);
        }

        // 把蛇叠加上去
        for (let snakeBody of this.userSnake.bodyList) {
            let loc = snakeBody.loc;
            // 蛇身体的loc属性坐标与数组索引二维一一对应
            classArr[loc.y][loc.x] = "user";
        }
        // 添加蛇头
        let head = this.userSnake.bodyList[0];
        transArr[head.loc.y][head.loc.x] = this.userSnake.speed.toTheta();
        classArr[head.loc.y][head.loc.x] = "userHead";

        // 根据css二维数组 添加盒子
        let lineEleList = boardEle.getElementsByClassName("line");
        for (let y = 0; y < this.size.h; y++) {
            let boxList = lineEleList[y].getElementsByClassName("box");
            for (let x = 0; x < this.size.w; x++) {
                let ele = boxList[x];
                ele.className = "box";
                ele.classList.add(classArr[y][x]);  // 加类
                ele.style.animation = this.aniArr[y][x];
                ele.style.transform = `rotate(${transArr[y][x]}rad)`; // 旋转
            }
        }
    }
}

function newDiv(className) {
    let res = document.createElement("div");
    res.classList.add(className);
    return res;
}

function randInt(n) {
    return Math.floor(Math.random() * n);
}

function choice(arr) {
    return arr[randInt(arr)];
}
