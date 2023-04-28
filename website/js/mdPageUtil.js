/**
 * 这个页面是笔记详细页面的通用js
 * 包含笔记页面的一些交互功能
 * 风格切换、大纲按钮跳转等等
 * 评论
 * by littlefean
 */
{
    let changeStyleEle = document.querySelector("#changeStyle");

    changeStyleEle.addEventListener("click", () => {
        document.querySelector(".canvasTmp").innerHTML = "";
        let body = document.querySelector("body");
        let main = document.querySelector("main");
        main.style.filter = "invert(100%)"
        body.style.backgroundColor = "white";
    });
}
