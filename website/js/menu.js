/**
 *
 * by littlefean
 */
{
    const isPhoneB = isPhone();
    let planets = document.querySelector(".planets");
    // 放置中心
    let centerStar = document.createElement("div");
    centerStar.id = "centerStar";
    planets.appendChild(centerStar);

    let wR = planets.offsetWidth;
    let arr = planets.getElementsByClassName("planet");
    // 遍历所有行星球体盒子
    let i = 0;
    for (let item of arr) {
        let container = item.querySelector(".container");
        // let r = 3 + Math.random() * 20;  // 半径 单位是百分比，相对于planets
        let r = 2 + 20 * (i / arr.length);  // 半径 单位是百分比，相对于planets
        let left = 50 + r;
        item.style.left = `${left}%`;
        let w = item.offsetWidth;
        item.style.transformOrigin = `-${(wR / w) * (left - 50)}% 50%`;
        // 随机延迟
        let aniDalyS = Math.random() * 1000;
        item.style.animationDelay = `-${aniDalyS}s`;
        container.style.animationDelay = `-${aniDalyS}s`;

        // 周期T计算
        let T = 5 * Math.pow(r, 1.5);
        item.style.animationDuration = `${T}s`;
        container.style.animationDuration = `${T}s`;

        // 增添行星亮点
        let pEle = document.createElement("div");

        pEle.onclick = () => {
            window.open(container.querySelector("a").href);
        };
        pEle.classList.add("planetIcon");
        pEle.style.cursor = 'crosshair';
        // 半径
        let iconRpx = 1 + 1.5 * Math.pow(+(item.dataset.wordnum), 0.4);
        if (isPhoneB) {
            iconRpx = 5;
            pEle.style.backgroundColor = "white";
        }
        pEle.style.width = `${iconRpx}px`;
        pEle.style.height = `${iconRpx}px`;
        container.insertBefore(pEle, container.firstChild);

        // 增添文字内容
        let p1 = document.createElement("p");
        p1.innerText = `上次更新：${item.dataset.update}`;
        container.appendChild(p1);
        let p2 = document.createElement("p");
        p2.innerText = `字数：${item.dataset.wordnum}`;
        container.appendChild(p2);
        //
        i++;
    }

    // 遍历所有 笔记项目 盒子
    let orders = document.querySelector(".orders");
    console.log(orders);
    let orderArr = orders.getElementsByClassName("order");
    console.log(orderArr);
    for (let order of orderArr) {
        // 增添文字内容
        let p0 = document.createElement("p");
        p0.innerText = `上次更新：${order.dataset.update}`;
        order.appendChild(p0);
        let p1 = document.createElement("p");
        p1.innerText = `创建时间：${order.dataset.crate}`;
        order.appendChild(p1);
        let p2 = document.createElement("p");
        p2.innerText = `字数：${order.dataset.wordnum}`;
        order.appendChild(p2);
    }
}
