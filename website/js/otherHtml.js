/**
 *
 * by littlefean
 */
window.onload = function () {
    // let otherBox = document.querySelector(".otherBox");
    let eleArr = document.getElementsByClassName("item");
    for (let ele of eleArr) {
        ele.style.animationDelay = `-${Math.random() * 100}s`;
    }
}
