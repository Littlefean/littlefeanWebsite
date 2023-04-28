/**
 *
 * by littlefean
 */
window.onload = function () {
    let mainEle = document.querySelector("main");
    let startNumb = 1000;
    for (let i = 0; i < startNumb; i++) {
        let slideEle = document.createElement("div");
        slideEle.classList.add("slideWay");
        let starEle = document.createElement("div");
        let size = Math.random() * 5 + 0.5;
        starEle.style.width = `${size}px`;
        starEle.style.height = `${size}px`;
        starEle.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        starEle.classList.add("star");

        slideEle.appendChild(starEle);

        let r = Math.random() * 600;  // 公转半径
        slideEle.style.width = `${r}px`;
        slideEle.style.animationDelay = `-${Math.random() * 10000}s`;
        //
        slideEle.style.animationDuration = Math.sqrt(Math.pow(r, 3)) / 120 + "s";
        mainEle.appendChild(slideEle);
    }

}
