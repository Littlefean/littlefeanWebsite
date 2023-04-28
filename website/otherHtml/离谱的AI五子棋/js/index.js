/**
 *
 * by littlefean
 */

let COMBINE = 5;
let HUMAN_FIRST = true;
let BORD_SIZE = [15, 15];  // 宽，高
let AI = null;

// 创建棋盘对象实例
let board = new Board(
    BORD_SIZE[0],
    BORD_SIZE[1],
    document.getElementById("board"),
    HUMAN_FIRST
);

/**
 * 更新游戏规则
 */
function updateRule() {
    let combineNum = document.querySelector("#combineNum");
    COMBINE = +combineNum.value;
    BORD_SIZE[0] = +document.querySelector("#W").value;
    BORD_SIZE[1] = +document.querySelector("#H").value;
    HUMAN_FIRST = eval(document.querySelector("#HumanFirst").value);
    // print rules
    let aiStr = document.querySelector("#chooseAi").value;
    switch (aiStr) {
        case "random":
            AI = new AiRandom(board);
            break;
        case "random2":
            AI = new AiRandom2(board);
            break;
        case "random3":
            AI = new AiRandom3(board);
            break;
        case "random5":
            AI = new AiRandom5(board);
            break;
        case "randomD":
            AI = new AiDevourer(board);
            break;
    }
    console.log(COMBINE, HUMAN_FIRST, BORD_SIZE);
}

window.onload = function () {

    // 更新棋盘
    // board.updateHtml();

    // 获取规则更新按钮 并添加规则更新
    let submit = document.getElementById("submit");
    submit.addEventListener("click", () => {
        console.log("submit!")
        updateRule();
        board = new Board(
            BORD_SIZE[0],
            BORD_SIZE[1],
            document.getElementById("board"),
            HUMAN_FIRST
        );
        board.maxConnect = COMBINE;
        board.setAi(AI);
        board.updateHtml();
    })


    /**
     * 一开始就要构建棋盘
     */
    //
}
