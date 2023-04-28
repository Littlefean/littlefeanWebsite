/**
 * 棋盘类
 * by littlefean
 */
class Board {
    /**
     *
     * @param w {Number}
     * @param h {Number}
     * @param ele {HTMLElement}
     * @param humanFirst {Boolean}
     */
    constructor(w, h, ele, humanFirst) {
        this.w = w;
        this.h = h;
        this.ele = ele;
        // todo 有待改成class类名的方式
        this.ele.style.backgroundColor = "sandybrown";
        this.array = [];
        // 0 表示没有，1表示玩家下的，-1表示Ai下的
        this.humanFirst = humanFirst;
        this.ai = null;
        this.init();
        this.maxConnect = 5;  // 规则，五子棋
        this.stage = 0;  // 表示还没有人获胜
    }

    /**
     * 棋盘初始化，建立数据
     */
    init() {
        for (let y = 0; y < this.h; y++) {
            let line = [];
            for (let x = 0; x < this.w; x++) {
                line.push(0);
            }
            this.array.push(line);
        }
    }

    /**
     * 获取棋盘上所有左斜线组成的数组 / ，用于斜向判断
     */
    getLeftSlashArr() {
        let res = [];
        for (let x = 0; x < this.w; x++) {
            let len = Math.min(x + 1, Math.min(this.h, this.w));
            let slashLine = [];
            for (let i = 0; i < len; i++) {
                slashLine.push(this.getPoint(x - i, i));
            }
            res.push(slashLine);
        }
        for (let y = 1; y < this.h; y++) {
            let x = this.w - 1;
            let dx = 0;
            let dy = 0;
            let slashLine = [];
            while (this.inRange(x + dx, y + dy)) {
                slashLine.push(this.getPoint(x + dx, y + dy));
                dx -= 1;
                dy += 1;
            }
            res.push(slashLine);
        }
        return res;
    }

    getRightSlashArr() {
        let res = [];
        for (let y = 0; y < this.h; y++) {
            let x = 0;
            let dx = 0;
            let dy = 0;
            let slashLine = [];
            while (this.inRange(x + dx, y + dy)) {
                slashLine.push(this.getPoint(x + dx, y + dy));
                dx++;
                dy++;
            }
            res.push(slashLine);
        }
        for (let x = 1; x < this.w; x++) {
            let y = 0;
            let dx = 0;
            let dy = 0;
            let slashLine = [];
            while (this.inRange(x + dx, y + dy)) {
                slashLine.push(this.inRange(x + dx, y + dy));
                dx++;
                dy++;
            }
            res.push(slashLine);
        }
        return res;
    }

    /**
     * 判定一次游戏胜利还是失败
     * 返回 1 表示玩家胜利
     * 返回 -1 表示电脑胜利
     * 返回 0 表示还可以继续
     */
    gameOver() {
        // ---
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                if (this.getPoint(x, y) !== 0) {
                    let sum = 0;
                    for (let dx = 0; dx < this.maxConnect; dx++) {
                        sum += this.getPoint(x + dx, y);
                    }
                    if (Math.abs(sum) >= this.maxConnect) {
                        return this.getPoint(x, y);
                    }
                }
            }
        }
        // |||
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                if (this.getPoint(x, y) !== 0) {
                    let sum = 0;
                    for (let dy = 0; dy < this.maxConnect; dy++) {
                        sum += this.getPoint(x, y + dy);
                    }
                    if (Math.abs(sum) >= this.maxConnect) {
                        return this.getPoint(x, y);
                    }
                }
            }
        }
        let judge = (line) => {
            for (let i = 0; i < line.length; i++) {
                if (line[i] !== 0) {
                    let sum = 0;
                    for (let di = 0; di < this.maxConnect; di++) {
                        if (i + di < line.length) {
                            sum += line[i + di];
                        }
                    }
                    if (Math.abs(sum) >= this.maxConnect) {
                        return line[i];
                    }
                }
            }
            return 0;
        }
        // ///
        let leftArr = this.getLeftSlashArr();
        for (let line of leftArr) {
            let lineRes = judge(line);
            if (lineRes !== 0) {
                return lineRes;
            }
        }
        // \\\
        let rightArr = this.getRightSlashArr();
        for (let line of rightArr) {
            let lineRes = judge(line);
            if (lineRes !== 0) {
                return lineRes;
            }
        }
        return 0;
    }

    /**
     * 进行一次判断，并返回游戏结束
     */
    overShutDown() {
        if (this.stage !== 0) {
            return;
        }
        let res = this.gameOver();
        if (res === 1) {
            this.stage = 1;
            this.ele.style.backgroundColor = "green";
        }
        if (res === -1) {
            this.stage = -1;
            this.ele.style.backgroundColor = "red";
        }
        if (res !== 0) {
            // location.reload();
            console.log("游戏结束了呢");
        }
    }

    /**
     * 为这个棋盘设置一个ai
     * @param ai {Ai}
     */
    setAi(ai) {
        this.ai = ai;
        this.ai.board = this;
    }

    /**
     * 下一个棋在棋盘内
     * @param x {Number}
     * @param y {Number}
     * @param value {Number} -1 1 0 三种值
     */
    setPoint(x, y, value) {
        if (this.inRange(x, y)) {
            this.array[y][x] = value;
        }
    }

    // 判断一个点是否在棋盘内
    inRange(x, y) {
        if (0 <= x && x < this.w) {
            if (0 <= y && y < this.h) {
                return true;
            }
        }
        return false;
    }

    /**
     * 返回棋盘上的一个值，如果这个点越界了，返回和空气等价的值
     * @param x {Number}
     * @param y {Number}
     * @returns {number|*}
     */
    getPoint(x, y) {
        if (this.inRange(x, y)) {
            return this.array[y][x];
        } else {
            // console.log(`出现了尝试访问越界点x${x}y${y}`);
            return 0;
        }
    }

    // 更新分数
    countScoreUpdate() {
        // 白色是-1，黑色是1
        let blackScore = 0;
        let whiteScore = 0;

        let leftArr = this.getLeftSlashArr();
        for (let leftLine of leftArr) {
            for (let num of leftLine) {
                // if (num === 1)
            }
        }
    }

    /**
     * 更新在界面上的显示
     */
    updateHtml() {
        console.log("正在更新棋盘显示");
        // 先清除
        let lines = this.ele.querySelector(".lines");
        lines.innerHTML = "";
        for (let y = 0; y < this.h; y++) {
            let line = document.createElement("div");
            line.classList.add("line");
            for (let x = 0; x < this.w; x++) {
                // console.log(x);
                let cell = document.createElement("div");
                let typeNumber = this.getPoint(x, y);
                cell.classList.add("cell");
                cell.classList.add(`type${typeNumber}`);
                if (typeNumber === 0) {
                    // 在这个位置下棋子的方法
                    cell.addEventListener("click", () => {
                        // console.log("你点了", x, y);
                        this.setPoint(x, y, 1);
                        this.updateHtml();

                        this.overShutDown();

                        this.ai.go();
                        this.updateHtml();

                        this.overShutDown();
                        // this.printData();

                    });
                }
                line.appendChild(cell);
            }
            lines.appendChild(line);
        }
    }

    getAirCollections() {
        let res = [];
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                let typeNumber = this.getPoint(x, y);
                if (typeNumber === 0) {
                    res.push([x, y]);
                }
            }
        }
        return res;
    }

    printData() {
        let res = ""
        for (let y = 0; y < this.h; y++) {
            let lineStr = "";
            for (let x = 0; x < this.w; x++) {
                lineStr += this.array[y][x] + " ";
            }
            res += lineStr + "\n";
        }
        console.log(res);
    }

}
