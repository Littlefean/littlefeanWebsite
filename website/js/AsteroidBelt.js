/**
 * 小行星带
 * by littlefean
 */
{
    const isPhoneB = isPhone();
    let temp = document.querySelector(".canvasTmp");
    let c = temp.querySelector("canvas");
    let ctx = c.getContext('2d');
    // 画静止星
    let maxW = getPageSize()[0];
    let maxH = getPageSize()[1];
    if (isPhoneB) {
        maxW = 980;
        maxH = 2000;
    }
    for (let i = 0; i < 1000; i++) {
        let light = Math.random() / 1.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${light})`;
        ctx.beginPath();
        let x = Math.random() * maxW;
        let y = Math.random() * maxH;

        let r = Math.random() + 0.5;
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    // 小行星元素
    let planetZone = document.querySelector(".planets");
    for (let i = 0; i < 500; i++) {
        // 创建元素结构
        let asteroid = document.createElement("div");
        asteroid.classList.add("asteroid");
        let star = document.createElement("div");
        star.classList.add("star");
        // 随机小星星样式
        star.style.opacity = `${Math.random()}`;
        let R = `${Math.random() * 2}`
        star.style.width = R;
        star.style.height = R;

        // 设置随机公转半径
        let r = Math.random() * 50;
        asteroid.style.width = `${r}%`;
        // 设置动画开启
        let aniDalyS = Math.random() * 1000;
        asteroid.style.animationDelay = `-${aniDalyS}s`;  // 随机延迟
        let T = 0.8 * Math.pow(r, 1.5); // 周期T计算
        asteroid.style.animationDuration = `${T}s`;
        console.log("r T is", r, T);


        // 完毕，添加到dom
        asteroid.appendChild(star);
        planetZone.appendChild(asteroid);
    }
}
