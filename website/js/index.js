/**
 *
 * by littlefean
 */
let ROTATE_HTML_CUBE = `
<div class="rotateContainer">
    <div class="top slide">
        <div class="border"></div>
    </div>
    <div class="bottom slide">
        <div class="border"></div>
    </div>
    <div class="left slide">
        <div class="border"></div>
    </div>
    <div class="right slide">
        <div class="border"></div>
    </div>
    <div class="front slide">
        <div class="border"></div>
    </div>
    <div class="back slide">
        <div class="border"></div>
    </div>
</div>
`;
let BIG_CUBE = `
<div class="rotateContainer">
    <div class="slide s0">
        <div class="slide s1">
            <div class="slide s11">
                <div class="slide s12"></div>
                <div class="slide s111"></div>
            </div>
        </div>
        <div class="slide s2">
            <div class="slide s21">
                <div class="slide s22"></div>
                <div class="slide s211"></div>
            </div>
        </div>
        <div class="slide s3">
            <div class="slide s31">
                <div class="slide s32"></div>
                <div class="slide s311"></div>
            </div>
        </div>
        <div class="slide s4">
            <div class="slide s41">
                <div class="slide s42"></div>
                <div class="slide s411"></div>
            </div>
        </div>
    </div>
</div>`;

/**
 * 添加星系，放置多面体
 */
{
    let seriesArr = document.getElementsByClassName("series");
    let rangeArea = document.querySelector("main");

    if (!isPhone()) {
        // 如果不是手机端
        // 放置中心
        let centerStar = document.createElement("div");
        centerStar.id = "centerStar";
        rangeArea.appendChild(centerStar);
        // 中心放置多面体
        let polyhedronCenter = document.createElement("div");
        polyhedronCenter.classList.add("polyhedron");
        polyhedronCenter.innerHTML = BIG_CUBE;
        rangeArea.appendChild(polyhedronCenter);
        // 添加完毕
        // 添加鼠标动态追踪
        let rotateBase = polyhedronCenter.querySelector(".rotateContainer");
        window.addEventListener("mousemove", (e) => {
            let k = 300;
            rotateBase.style.transform = `rotateX(${k * e.pageY / 1080}deg) rotateZ(${-k * e.pageX / 1920}deg)`;
        });
    }

    if (!isPhone()) {
        let wR = rangeArea.offsetWidth;
        // 遍历所有系列
        let i = 0;
        for (let seriesEle of seriesArr) {
            let container = seriesEle.querySelector(".container");
            // 设置好该系列的公转半径  r ~ [3%, 23%]  [0%, 20%] -> +3%
            // let r = 3 + Math.random() * 20;  // 半径 单位是百分比，相对于planets
            let r = 3 + 20 * (i / seriesArr.length);  // 半径 单位是百分比，相对于planets
            let left = 50 + r;
            seriesEle.style.left = `${left}%`;
            let w = seriesEle.offsetWidth;
            seriesEle.style.transformOrigin = `-${(wR / w) * (left - 50)}% 0%`;
            // 公转不同延迟
            // let aniDalyS = Math.random() * 1000;
            let aniDalyS = (i / seriesArr.length) * 1300;
            seriesEle.style.animationDelay = `-${aniDalyS}s`;
            container.style.animationDelay = `-${aniDalyS}s`;

            // 周期T计算
            let T = 5 * Math.pow(r, 1.5);
            seriesEle.style.animationDuration = `${T}s`;
            container.style.animationDuration = `${T}s`;

            let iconBox = container.querySelector(".iconCubeBox");
            // 给星系添加内容样子  这一步一定要优先
            iconBox.innerHTML = ROTATE_HTML_CUBE;
            iconBox.style.cursor = 'crosshair';
            // 随机子星系的旋转动画时长
            let rotateBase = iconBox.querySelector(".rotateContainer");
            rotateBase.style.animationDelay = `-${aniDalyS}s`;
            rotateBase.style.animationDuration = `${Math.random() * 10 + 5}s`;

            // 根据该系列的名字来设置颜色
            let titleText = seriesEle.querySelector(".title").innerText;
            let slideArr = seriesEle.getElementsByClassName("border");

            for (let slide of slideArr) {
                for (let str of ["数学", "物理"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("blueBorder");
                    }
                }
                for (let str of ["办公", "财务", "政治"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("yellowBorder");
                    }
                }
                for (let str of ["画", "音乐", "乐理", "美"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("pinkBorder");
                    }
                }
                for (let str of ["设计"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("purpleBorder");
                    }
                }
                for (let str of ["考研"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("redBorder");
                    }
                }
                for (let str of ["英语", "经济", "法律", "哲学"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("roseBorder");
                    }
                }
                for (let str of ["算法", "编程", "计算机"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("greenBorder");
                    }
                }
            }
            // 根据内部文章数量设置样式
            let article = parseInt(seriesEle.dataset.count);
            rotateBase.style.animationDuration = `${40 * (1 / article)}s`;
            console.log(Math.log10(article));

            // 增添子节点
            let p1 = document.createElement("p");
            p1.innerText = `文章数量：${seriesEle.dataset.count}`
            container.appendChild(p1);
            let p2 = document.createElement("p");
            p2.innerText = `最近更新：${seriesEle.dataset.lastupdate}`
            container.appendChild(p2);

            // 添加鼠标悬停信息专有盒子
            let dataBox = document.createElement("div");
            dataBox.classList.add("dataBox");
            i++;
        }
    } else {
        for (let seriesEle of seriesArr) {
            let container = seriesEle.querySelector(".container");
            let iconBox = container.querySelector(".iconCubeBox");
            // 给星系添加内容样子  这一步一定要优先
            iconBox.innerHTML = ROTATE_HTML_CUBE;
            // 随机子星系的旋转动画时长
            let aniDalyS = Math.random() * 3000;
            let rotateBase = iconBox.querySelector(".rotateContainer");
            rotateBase.style.animationDelay = `-${aniDalyS}s`;
            rotateBase.style.animationDuration = `${Math.random() * 10 + 5}s`;

            // 根据该系列的名字来设置颜色
            let titleText = seriesEle.querySelector(".title").innerText;
            let slideArr = seriesEle.getElementsByClassName("border");

            for (let slide of slideArr) {
                for (let str of ["数学", "物理"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("blueBorder");
                    }
                }
                for (let str of ["办公", "财务", "政治"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("yellowBorder");
                    }
                }
                for (let str of ["画", "音乐", "乐理", "美"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("pinkBorder");
                    }
                }
                for (let str of ["设计"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("purpleBorder");
                    }
                }
                for (let str of ["算法", "编程", "计算机"]) {
                    if (titleText.includes(str)) {
                        slide.classList.add("greenBorder");
                    }
                }
            }
            // 根据内部文章数量设置样式
            let article = parseInt(seriesEle.dataset.count);
            rotateBase.style.animationDuration = `${40 * (1 / article)}s`;
            console.log(Math.log10(article));


            // 增添子节点
            let p1 = document.createElement("p");
            p1.innerText = `文章数量：${seriesEle.dataset.count}`
            container.appendChild(p1);
            let p2 = document.createElement("p");
            p2.innerText = `最近更新：${seriesEle.dataset.lastupdate}`
            container.appendChild(p2);

            // 添加鼠标悬停信息专有盒子
            let dataBox = document.createElement("div");
            dataBox.classList.add("dataBox");
        }
    }
}
