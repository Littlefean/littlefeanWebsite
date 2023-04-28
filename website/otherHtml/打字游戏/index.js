/**
 * 2021年9月21日
 * by littlefean
 */

window.onload = function () {
    let cards = {};
    let BODY = document.querySelector("body");
    let HEIGHT = BODY.offsetHeight;
    let fallSpeed = 1;
    let frequency = 600;
    let score = 0;
    let scoreN = 0
    let scoreNEle = document.getElementById("scoreN");

    function addScore() {
        score += (fallSpeed * fallSpeed);
        scoreN += 1;
        scoreNEle.innerText = scoreN;
    }

    function speedUp() {
        fallSpeed += 0.1;
    }

    function frequencyUp() {
        frequency -= 10;
    }

    // 产生一个卡片
    setInterval(() => {
        let x = Math.random() * 90;
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerText = String.fromCharCode(Math.ceil(Math.random() * 25) + 65 + 6 + 26);
        div.style.left = x + "%";
        console.log(div.innerText);
        BODY.appendChild(div);
        let fall = setInterval(() => {
            div.style.top = div.offsetTop + fallSpeed + "px";
            if (div.offsetTop + div.offsetHeight >= HEIGHT) {
                alert("死了啦，" + `你的分数是${score} 按了${scoreN}个`);
                location.reload();
                clearInterval(fall);
            }
        }, 10);
        if (cards[div.innerText] === undefined) {
            cards[div.innerText] = [div];
        } else {
            cards[div.innerText].push(div);
        }
    }, frequency);


    window.addEventListener("keypress", (e) => {
        console.log(e.key);
        if (cards[e.key] !== undefined) {
            if (cards[e.key].length > 0) {
                let div = cards[e.key].shift();
                BODY.removeChild(div);
                addScore();
                // 触发速度增加
                speedUp();
                frequencyUp();
            }
        }
    })
}
