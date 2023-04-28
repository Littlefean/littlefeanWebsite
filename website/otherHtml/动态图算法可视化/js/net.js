/**
 *
 * by littlefean
 */

/**
 * 动态网
 */
class Net {
    /**
     *
     * @param number {Number} 有多少个球
     */
    constructor(number) {
        /**
         *
         * @type {[Ball]}
         */
        this.ballList = [];
        this.ballNumber = number;

        this.weightDic = {};
        this.clearNet();
        /**
         *
         * @type {Board}
         */
        this.bindBoard = null;

        /**
         *
         * @type {[Fx]}
         */
        this.fxQue = [];  // 特效渲染队列
    }

    /**
     * 随机初始化一些小球
     */
    randomInitBall() {
        for (let i = 0; i < this.ballNumber; i++) {
            let b = new Ball(i);
            b.loc = new Vector(Math.random() * (this.bindBoard.width - 2 * b.r) + b.r, Math.random() * (this.bindBoard.height - b.r * 2) + b.r);
            b.speed = Vector.randCircle().mul(Math.random());
            b.weight = Math.random() + 0.5;  // 0.5 ~ 1.5
            this.ballList.push(b);
        }
    }

    clearNet() {
        this.weightDic = {};
        for (let i = 0; i < this.ballNumber; i++) {
            this.weightDic[i] = {};
        }
    }

    /**
     * 进行一个时间刻的变化，所有的小球发生位置的改变
     */
    moveBall() {
        // console.log("所有球移动了");
        let w = this.bindBoard.width;
        let h = this.bindBoard.height;
        for (let ball of this.ballList) {
            ball.loc.add(ball.speed.mul(HOT));
            // 边界碰撞反向速度
            let x = ball.loc.x;
            let y = ball.loc.y;
            let r = ball.r;
            if (x + r > w || x - r < 0) {
                ball.speed.x *= -1;
            }
            if (y - r < 0 || y + r > h) {
                ball.speed.y *= -1;
            }
        }
    }

    /**
     * 在网络中更新距离权重
     */
    refreshNetWeight() {
        // 更新所有的距离网
        // 只让每个点距离自己最近的距离构成连接
        this.clearNet();
        for (let i = 0; i < this.ballNumber; i++) {
            // 找到距离自己最近的那个
            // [(dis, number), (), () ]
            let list = [];
            for (let j = 0; j < this.ballNumber; j++) {
                if (i === j) continue;
                list.push([this.ballList[i].loc.sub(this.ballList[j].loc).abs(), j]);
            }
            list.sort((a, b) => {
                return a[0] - b[0]  // 按第一位升序排序
                // return b[0] - a[0]  // 按第一位升序排序
            });
            // 找到了连接
            for (let j = 0; j < MIN_CONNECT; j++) {
                if (j >= this.ballNumber - 1) {
                    break;
                }
                let connDis = list[j][0];
                let connNum = list[j][1];
                this.weightDic[i][connNum] = connDis * this.ballList[i].weight;
                this.weightDic[connNum][i] = connDis * this.ballList[connNum].weight;
            }
        }
    }

    /**
     * 从某一个节点开始进行深度优先遍历
     * @param nodeNumber {Number}
     * @param time {Number} 推迟时间，递归从0开始累加
     * @param history {Set}
     * @param fromNode {Number} 表示这个节点是从哪里传过来的
     */
    dfs(nodeNumber, time, history, fromNode) {
        if (history.has(nodeNumber)) {
            return;
        }
        history.add(nodeNumber);
        // console.log(nodeNumber);
        for (let child in this.weightDic[nodeNumber]) {
            let c = +child;
            this.fxQue.push(new Fx(this.ballList[nodeNumber].loc, this.ballList[fromNode].loc, time));
            this.dfs(c, time + DFS_SPEED, history, nodeNumber);
        }
    }

    /**
     * 开始广度优先搜索，从某一个节点开始
     * @param nodeNumber
     */
    bfs(nodeNumber) {
        let q = [{n: nodeNumber, level: 1}];
        let set = new Set();
        set.add(nodeNumber);
        console.log("开始广度优先了")
        while (q.length !== 0) {
            let node = q.shift();
            console.log(node);
            for (let child in this.weightDic[node.n]) {
                if (set.has(+child)) {
                    continue;
                }
                let fx = new Fx(this.ballList[node.n].loc, this.ballList[+child].loc, node.level);
                this.fxQue.push(fx);
                q.push({n: +child, level: node.level + DFS_SPEED});
                set.add(+child);
            }
        }
    }

    /**
     * 从n节点开始进行最短路径算法
     * @param n {Number}
     */
    dijkstra(n) {
        let find = [];
        let dist = [];
        let path = [];
        for (let j = 0; j < this.ballNumber; j++) {
            find.push(false);
            dist.push(Infinity);
            path.push(-1);
        }
        find[n] = true;
        dist[n] = 0;
        for (let child in this.weightDic[n]) {
            dist[+child] = this.weightDic[n][+child] * this.ballList[n].weight;
            path[+child] = n;
        }
        while (true) {
            let v = -1;
            let d = Infinity;
            for (let node = 0; node < dist.length; node++) {
                let dis = dist[node];
                if (find[node]) {
                    continue;
                }
                if (dis < d) {
                    d = dis;
                    v = node;
                }
            }
            if (v === -1) {
                break;
            }
            find[v] = true;
            // 检查所有和v相连接的顶点，看看有没有变得更短
            for (let child in this.weightDic[v]) {
                let weight = this.weightDic[v][+child] * this.ballList[v].weight;
                if (find[+child]) {
                    continue;
                }
                if (dist[v] + weight < dist[+child]) {
                    dist[+child] = dist[v] + weight;
                    path[+child] = v;
                }
            }
        }
        return path;
    }

    /**
     * 传入迪杰斯特拉的path数组，起点和目标终点，返回这个路径
     * @param n
     * @param path
     * @param des
     * @return [Number]
     */
    shortestPath(n, path, des) {
        let res = [des];
        while (path[des] !== -1) {
            res.push(path[des]);
            des = path[des];
        }
        return res;
    }

    /**
     * 选然一条边
     * @param ctx
     * @param index1 {Number}
     * @param index2 {Number}
     * @param width {Number}
     * @param color {String}
     */
    rendLine(ctx, index1, index2, width = 0.5, color = LINE_COLOR) {
        ctx.beginPath();
        ctx.lineWidth = width + this.ballList[index1].weight * 6;
        ctx.strokeStyle = color;
        let start = this.ballList[index1].loc;
        // .plus(new Vector(0, -20));
        let end = this.ballList[index2].loc;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();
    }

    rend(ctx) {

        if (SHOW_BALL) {
            for (let ball of this.ballList) {
                ball.rend(ctx);
            }
        }
        if (SHOW_LINE) {
            // 根据连接关系画出路径
            for (let key in this.weightDic) {
                let startIndex = +key;
                for (let k in this.weightDic[startIndex]) {
                    let endIndex = +k;
                    this.rendLine(ctx, startIndex, endIndex, 1);
                }
            }
        }


        // 画出最短路径
        if (SHOW_TREE) {
            let con1 = MIN_LEN_START_NODE;
            // let con2 = 5;
            let dijkstraPath = this.dijkstra(con1);
            for (let con2 = 1; con2 < this.ballNumber; con2++) {
                // if (con2 !== 5) {
                //     continue;
                // }
                this.ballList[con1].marked = true;
                // this.ballList[con2].marked = true;
                let path = this.shortestPath(con1, dijkstraPath, con2);
                for (let i = 0; i < path.length - 1; i++) {
                    let j = i + 1;
                    this.rendLine(ctx, path[i], path[j], 2, RED_COLOR);
                }
            }
        }
        for (let fx of this.fxQue) {
            fx.rend(ctx);
        }
    }

    tick() {
        this.moveBall();
        this.refreshNetWeight();
        //
        for (let o of this.fxQue) {
            o.tick();
        }
    }
}

class Board {
    /**
     *
     * @param width {Number}
     * @param height {Number}
     * @param bindEle {HTMLCanvasElement}
     */
    constructor(width, height, bindEle) {


        // 绑定canvas对象并设定宽度高度
        this.canvasEle = bindEle;
        this.canvasEle.width = width;
        this.canvasEle.height = height;
        this.width = width;
        this.height = height;

        this.net = new Net(NODE_NUMBER);
        this.net.bindBoard = this;
        this.net.randomInitBall();
        this.net.refreshNetWeight();
    }

    rend() {
        // let canvasElement = document.querySelector("canvas");
        let ctx = this.canvasEle.getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
        this.net.rend(ctx);
    }

    tick() {
        this.net.tick();

    }
}
