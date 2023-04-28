/**
 *
 * by littlefean
 */
window.onload = function () {
    let gameEle = document.querySelector(".gameRange");

    let game = new Game(gameEle);


    setInterval(() => {
        game.tick();
        game.rend();
        if (game.isGameOver()) {
            alert("你死了啦，按回车键继续");
            game = new Game(gameEle);
            location.reload();
        }
    }, game.speed);

}
