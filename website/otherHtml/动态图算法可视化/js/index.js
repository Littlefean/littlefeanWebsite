/**
 *
 * by littlefean
 */

window.onload = function () {
    let canvasEle = document.querySelector(".mainCanvas");
    let board = new Board(window.innerWidth - 20, window.innerHeight - 50, canvasEle);
    board.rend();
    board.tick();
    board.rend();
    setInterval(() => {
        board.tick();
        board.rend();
    }, 30);

    // 屏幕点击
    canvasEle.addEventListener("click", (e) => {
        let clickLoc = new Vector(e.offsetX, e.offsetY);
        // 通过坐标找到距离这个点击最近的节点
        // 找到距离自己最近的那个
        // [(dis, number), (), () ]
        let list = [];
        for (let j = 0; j < NODE_NUMBER; j++) {
            list.push([clickLoc.sub(board.net.ballList[j].loc).abs(), j]);
        }
        list.sort((a, b) => a[0] - b[0]);
        MIN_LEN_START_NODE = list[0][1];
    });
    let hot = document.querySelector("#hotRate");
    hot.addEventListener("input", () => {
        HOT = +hot.value;
    })

    let con = document.querySelector("#connRate");
    con.max = NODE_NUMBER.toString();
    con.addEventListener("input", () => {
        MIN_CONNECT = +con.value;
    });

    document.querySelector(".nodeSwitch").addEventListener("click", () => {
        SHOW_BALL = !SHOW_BALL;
    })
    document.querySelector(".lineSwitch").addEventListener("click", () => {
        SHOW_LINE = !SHOW_LINE;
    })
    document.querySelector(".treeSwitch").addEventListener("click", () => {
        SHOW_TREE = !SHOW_TREE;
    })

    document.querySelector(".dfs").addEventListener("click", () => {
        board.net.dfs(MIN_LEN_START_NODE, 1, new Set(), 0);
    })

    let dfsSpeed = document.querySelector("#dfsSpeedRate");
    dfsSpeed.addEventListener("input", () => {
        DFS_SPEED = +dfsSpeed.value;
    });

    let dfsDur = document.querySelector("#dfsDurRate");
    dfsDur.addEventListener("input", () => {
        DFS_DURATION = +dfsDur.value;
    });

    document.querySelector(".bfs").addEventListener("click", () => {
        board.net.bfs(MIN_LEN_START_NODE);
    })
}
