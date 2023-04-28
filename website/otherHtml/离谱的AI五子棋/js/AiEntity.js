/**
 *
 * by littlefean
 */
// 从数组中随机取出一个元素
function randomChoose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randint(left, right) {
    return Math.floor(Math.random() * (right - left + 1) + left);
}

class AiRandom extends Ai {
    constructor(board) {
        super(board);
    }

    go() {
        let airSet = this.board.getAirCollections();
        console.log(airSet);
        if (airSet.length > 1) {
            let pos = randomChoose(airSet);
            this.board.setPoint(pos[0], pos[1], -1);
        }
    }
}

class AiRandom2 extends Ai {
    constructor(board) {
        super(board);
    }

    go() {
        for (let i = 0; i < 2; i++) {
            let airSet = this.board.getAirCollections();
            console.log(airSet);
            if (airSet.length > 1) {
                let pos = randomChoose(airSet);
                this.board.setPoint(pos[0], pos[1], -1);
            }
        }
    }
}

class AiRandom3 extends Ai {
    constructor(board) {
        super(board);
    }

    go() {
        for (let i = 0; i < 3; i++) {
            let airSet = this.board.getAirCollections();
            console.log(airSet);
            if (airSet.length > 1) {
                let pos = randomChoose(airSet);
                this.board.setPoint(pos[0], pos[1], -1);
            }
        }
    }
}

class AiRandom5 extends Ai {
    constructor(board) {
        super(board);
    }

    go() {
        for (let i = 0; i < randint(6, 20); i++) {
            let airSet = this.board.getAirCollections();
            console.log(airSet);
            if (airSet.length > 1) {
                let pos = randomChoose(airSet);
                this.board.setPoint(pos[0], pos[1], -1);
            }
        }
    }
}

/**
 * 棋子包子
 */
class AiDevourer extends Ai {
    constructor(board) {
        super(board);
    }
    // 获取一个点周围的8个点 [x, y]
    getRound(loc) {
        let res = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                res.push([loc[0] + dx, loc[1] + dy]);
            }
        }
        return res;
    }

    go() {
        let humanSet = [];
        for (let y = 0; y < this.board.h; y++) {
            for (let x = 0; x < this.board.w; x++) {
                if (this.board.getPoint(x, y) === 1) {
                    humanSet.push([x, y]);
                }
            }
        }
        if (humanSet.length !== 0) {
            // 直接把所有的玩家下的棋子都包起来
            for (let humanLoc of humanSet) {
                let roundLocList = this.getRound(humanLoc);
                for (let roundLoc of roundLocList) {
                    if (this.board.inRange(...roundLoc) && this.board.getPoint(...roundLoc) === 0) {
                        if (Math.random() < 0.23) {
                            this.board.setPoint(roundLoc[0], roundLoc[1], -1);
                        }
                    }
                }
            }
        }

    }
}
