/**
 *
 * by littlefean
 */
{
    let isPhoneB = isPhone();
    let logs = document.querySelector(".logs");
    let itemArr = logs.getElementsByClassName("item");
    let i = 0;
    for (let item of itemArr) {
        // 如果是重要事件，改变颜色
        if (item.dataset.event === "true") {
            item.style.backgroundColor = "rgba(255, 165, 0, 0.5)";
            item.style.color = "white";
            item.style.fontSize = "20px";
        }
        if (!isPhoneB) {
            item.style.left = `${(0.05 * Math.sin(i) * 100) + 50 - 10}%`;
        }
        let time = item.querySelector(".time");

        let h = time.querySelector(".t");
        let hc = +(h.innerHTML[0] + h.innerHTML[1]);
        console.log(hc);
        if ((0 <= hc && hc < 5) || (hc >= 19)) {
            // time.style.filter = `hue-rotate(${30}deg)`;
            time.style.backgroundColor = "rgba(0, 0, 139, 0.5)";
            time.style.color = "skyblue";
        } else if (7 <= hc && hc <= 18) {
            // time.style.filter = `hue-rotate(${180}deg)`;
            time.style.backgroundColor = "rgba(135, 206, 235, 0.5)";
            time.style.color = "black";
        } else {
            time.style.backgroundColor = "red";
            time.style.color = "black";
        }
        // 把日期前面的零去掉
        let m = time.querySelector(".month");
        let d = time.querySelector(".day");
        if (m.innerHTML[0] === "0") {
            m.innerHTML = m.innerHTML[1];
        }
        if (d.innerHTML[0] === "0") {
            d.innerHTML = d.innerHTML[1];
        }
        // 增加一个小图标
        let icon = document.createElement("span");
        icon.classList.add("icon");
        if ((0 <= hc && hc < 5) || (hc >= 19)) {
            // 晚上
            icon.innerText = "🌙"
        } else {
            // 白兲
            icon.innerHTML = "🌞"
        }
        time.appendChild(icon);
        i++;
    }
}
