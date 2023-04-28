console.log("startSky");
/**
 *
 * by littlefean
 */
{
    let WIDTH = getPageSize()[0];
    let HEIGHT = getPageSize()[1];
    if (isPhone()) {
        WIDTH = 980;
        HEIGHT = 2000;
    }
    console.log("startSky2 准备画星空", WIDTH, HEIGHT);
    let temp = document.querySelector(".canvasTmp");
    let c = temp.querySelector("canvas");
    c.width = WIDTH;
    c.height = HEIGHT;
    let ctx = c.getContext('2d');
    // 画静止星
    for (let i = 0; i < 1000; i++) {
        let light = Math.random() / 1.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${light})`;
        ctx.beginPath();
        let x = Math.random() * WIDTH;
        let y = Math.random() * HEIGHT;
        let r = Math.random() + 0.5;
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    // 画运动星星
    let wayNum = 500;  // 轨道的数量 比较河里的范围 100~500
    console.log("当前流星轨道的数量", wayNum);
    if (isPhone()) {
        /* 如果是手机，那就不添加运动动画了，太卡了 */
        wayNum = 30;
    }
    for (let i = 0; i < wayNum; i++) {
        // 添加轨道
        let slipStarWay = document.createElement("div");
        slipStarWay.classList.add("starWay");
        // 从中心到一个角落的长度
        let len = Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT) / 2;
        slipStarWay.style.setProperty("width", `${len}px`);
        // 随机向外偏移量
        let randTransX = Math.random() * 500;
        slipStarWay.style.transform = `
        rotateZ(${i * (360 / wayNum)}deg) translateX(${randTransX}px)`;
        // 创建一个流星
        let slipStar = document.createElement("div");
        slipStar.classList.add("slipStar");
        slipStar.style.animationDelay = `-${Math.random() * 100}s`;
        // 随机流星的飞行速度，结果是快的好像很贴近，慢的好像很远
        slipStar.style.animationDuration = `${1 + Math.random() * 10}s`
        slipStarWay.appendChild(slipStar);
        temp.appendChild(slipStarWay);
    }
}
