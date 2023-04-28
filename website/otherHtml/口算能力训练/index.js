/**
 *
 * by littlefean
 */
function choice(list) {
    let len = list.length;
    if (len === 0) {
        return null;
    }
    let randIndex = Math.random() * len;
    return list[Math.floor(randIndex)];
}

// [left, right] 随机整数
function randint(left, right) {
    return Math.floor(Math.random() * (right - left + 1) + left);
}

function renew() {
    // 更新时间秒数
    let secEle = document.querySelector("#sec");
    secEle.innerHTML = "0";
    let timeAni = setInterval(() => {
        secEle.innerHTML = `${+secEle.innerHTML + 1}`;
    }, 1000);
    // 时间更新结束

    let testCountBtn = document.querySelector("#testCount");
    let testCount = +testCountBtn.value;
    console.log(testCount);


    let num1WeiEle = document.querySelector("#number1");
    let num1Wei = +num1WeiEle.value;
    let num2WeiEle = document.querySelector("#number2");
    let num2Wei = +num2WeiEle.value;
    let opEle = document.querySelector("#ops");
    let opStr = opEle.value;
    let optSet = [];
    for (let char of opStr) {
        if (char === "a") {
            optSet.push("+");
        } else if (char === "r") {
            optSet.push("-");
        } else if (char === "m") {
            optSet.push("*");
        } else {
            optSet.push("/");
        }
    }

    function newDiv(tarName, className, text) {
        let res = document.createElement(tarName);
        res.classList.add(className);
        if (text === "") {

        } else {
            res.innerText = text;
        }
        return res;
    }

    let quesListEle = document.querySelector(".questions");
    quesListEle.innerHTML = "";
    for (let i = 0; i < testCount; i++) {
        let qEle = newDiv("div", "question", "");
        let n1 = Math.floor(randint(1, 10 ** num1Wei - 1));
        let n2 = Math.floor(randint(1, 10 ** num2Wei - 1));
        let op = choice(optSet);
        let n1Ele = newDiv("span", "a", `${n1}`);
        let n2Ele = newDiv("span", "b", `${n2}`);
        let opEle = newDiv("span", "op", `${op}`);
        let eqEle = newDiv("span", "ep", "=");
        qEle.appendChild(n1Ele);
        qEle.appendChild(opEle);
        qEle.appendChild(n2Ele);
        qEle.appendChild(eqEle);

        let inputEle = document.createElement("input");
        inputEle.classList.add("questionInput");
        inputEle.type = "text";
        qEle.appendChild(inputEle);
        quesListEle.appendChild(qEle);
    }
    // // 获取所有输入框，为输入框设置回车快捷切换
    // let qInputList = document.getElementsByClassName("questionInput");
    // for (let i = 0; i < qInputList.length - 1; i++) {
    //     qInputList[i].oninput = function (e) {
    //         e = window.event || e;
    //         let tar = e.target || e.srcElement;
    //         if (tar.nodeName === 'INPUT' && tar.nextElementSibling !== null) {
    //             qInputList[i + 1].focus();
    //         }
    //     }
    // }

    // 创建一个提交按钮
    let qEle = newDiv("button", "success", "提交");
    // 按钮提交后的核验
    qEle.addEventListener("click", () => {
        let queList = document.getElementsByClassName("question");
        for (let queEle of queList) {
            let ans = +queEle.querySelector("input").value;
            console.log(ans);
            let mathStr = queEle.querySelector(".a").textContent + queEle.querySelector(".op").textContent + queEle.querySelector(".b").textContent;
            console.log(mathStr);
            if (ans === eval(mathStr)) {
                queEle.style.backgroundColor = "green";
            } else {
                queEle.style.backgroundColor = "red";
            }
        }
        // 停止计时器
        clearInterval(timeAni);
        quesListEle.appendChild(newDiv("div", "t", `用时${secEle.innerHTML}s，正确率:`));
        let time = +secEle.innerHTML;
        // 写记录
        let logsEle = document.querySelector(".logs");
        let speed = (time / testCount).toFixed(2);
        let text = `均v：${speed}s一道题 （${num1Wei}位数 ${optSet} ${num2Wei}位数）`;
        let logEle = newDiv("div", "log", text);
        logsEle.appendChild(logEle);
    });


    quesListEle.appendChild(qEle);
}

window.onload = function () {
    document.querySelector("#go").addEventListener("click", renew);
}
