/**
 *
 * by littlefean
 */



let USER_DATA = {
    year: 2001,
    month: 1,
    day: 1,
    gender: true,  // 男true，女false
};

/**
 * 更新USERDATA全局对象里的内容，根据输入的内容
 */
function getData() {
    let dateEle = document.getElementById("inputDate");
    let valueStr = dateEle.value;
    USER_DATA.year = eval(valueStr.substring(0, 4));
    USER_DATA.month = eval(valueStr.substring(5, 7));
    USER_DATA.day = eval(valueStr.substring(8, 10));
    console.log(USER_DATA);
}

window.onload = function () {
    getData();
    // 点击开始按钮之后
    document.getElementById("start").addEventListener("click", () => {
        getData();
        // 关闭输入框
        document.querySelector(".inputArea").style.display = "none";

        /**
         * 男性74岁,女性77岁
         */

        let userDate = new Date(USER_DATA.year, USER_DATA.month - 1, USER_DATA.day);
        let end = userDate.getTime();
        end += 74 * 365 * 24 * 60 * 60 * 1000;
        let endDate = new Date(end);
        console.log(endDate);
        console.log(typeof endDate);

        let nowDate = new Date();
        // 剩余的时间的时间戳
        let diff = endDate.getTime() - nowDate.getTime();
        // 已经走过的时间戳
        let before = nowDate.getTime() - userDate.getTime();
        // 走过的进度比例
        let rate = before / (74 * 365 * 24 * 60 * 60 * 1000);
        console.log(rate);

        let resEle = document.querySelector(".result");
        resEle.style.display = "block";
        // 你的人生进度条：
        resEle.appendChild(div("note", "你的人生进度条"));
        let bar = div("bar");
        let barWater = div("water");
        barWater.style.width = `${rate * 100}%`;
        bar.appendChild(barWater);
        resEle.appendChild(bar);
        let remainSec = (diff / 1000).toFixed();

        resEle.appendChild(div("note", `你还能活：`));
        let secEle = div("note", `${remainSec}秒`);
        resEle.appendChild(secEle);
        setInterval(() => {
            remainSec--;
            secEle.innerText = `${remainSec}秒`;
        }, 1000);

        let remainMin = (remainSec / 60).toFixed();
        let remainHour = (remainMin / 60).toFixed();
        let remainDay = (remainHour / 24).toFixed();
        let remainWeek = (remainDay / 7).toFixed();
        let remainYear = (remainDay / 365).toFixed();
        resEle.appendChild(div("note", `也就是${remainYear}年`));
        resEle.appendChild(div("littleNote", `有些年份你会经历不平凡`));

        let yearGridEle = div("grid");
        for (let i = 0; i < remainYear; i++) {
            let yb = div("yearBlock", `${nowDate.getFullYear() + i}`);
            if (Math.random() < 0.2) {
                yb.style.animation = `shake 0.2s infinite`;
                yb.style.animationDelay = `-${Math.random()}s`
            }

            yearGridEle.appendChild(yb);
        }
        resEle.appendChild(yearGridEle);

        resEle.appendChild(div("note", `也就是${remainWeek}星期`));
        resEle.appendChild(div("littleNote", "有些周你会收获好运"));

        let weekGridEle = div("grid");
        for (let i = 0; i < remainWeek; i++) {
            let wb = div("weekBlock");
            if (Math.random() < 0.3) {
                wb.style.backgroundColor = "greenyellow";
            }
            weekGridEle.appendChild(wb);
        }
        resEle.appendChild(weekGridEle);


        resEle.appendChild(div("note", `也就是${remainDay}天`));
        resEle.appendChild(div("littleNote", "橘色是你的周六日"));

        let dayGridEle = div("grid");
        for (let i = 0; i < remainDay; i++) {
            let b = div("dayBlock");
            if (i % 7 === 5 || i % 7 === 6) {
                b.style.backgroundColor = "orange";
            } else {
                if (Math.random() < 0.1) {
                    b.style.backgroundColor = "red";
                }
                if (Math.random() < 0.2) {
                    b.style.backgroundColor = "black";
                }
            }
            dayGridEle.appendChild(b);
        }
        resEle.appendChild(dayGridEle);

        resEle.appendChild(div("note", `也就是${remainHour}小时`));
        resEle.appendChild(div("note", `也就是${remainMin}分钟`));
    })
}

function div(className, innerText = "") {
    let res = document.createElement("div");
    res.classList.add(className);
    res.innerText = innerText;
    return res;
}
