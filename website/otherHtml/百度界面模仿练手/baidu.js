/**
 * 实现js控制二级菜单效果
 * by littlefean
 */

/**
* 给两个元素绑定事件，一个按钮，一个面板，将这两个元素组成一个二级菜单效果
* @param {*} btn 按钮元素
* @param {*} panel 面板元素
* @param {*} dt 毫秒(ms)
* @author littlefean, rutubet
*/
function setSecondaryMenu(btn, panel, dt) {
    /**
     * 原理：
     * 鼠标放到按钮上，面板显示出来，鼠标移出按钮，面板延迟dt毫秒消失。
     * 鼠标移出后，面板消失之前，移动到面板上，取消面板的延迟消失
     * 鼠标移出面板后，同样延时dt毫秒消失
     */
    /**鼠标移开按钮后面板延迟消失的时间(ms) */
    var delayTask;

    /**鼠标移入按钮 */
    btn.addEventListener("mouseover", () => panel.hidden = false);
    /**鼠标移出按钮 */
    btn.addEventListener("mouseleave", () => delayTask = setTimeout(() => panel.hidden = true, dt));
    /**鼠标移入面板 */
    panel.addEventListener("mouseover", () => clearTimeout(delayTask));
    /**鼠标移出面板 */
    panel.addEventListener("mouseleave", () => delayTask = setTimeout(() => panel.hidden = true, dt));
}

var moreBtn = document.getElementById("more");
var moreMenu = document.getElementById("moreMenu");
var weatherMenu = document.getElementById("weatherMenu");
var weatherBtn = document.getElementsByClassName("show-weather")[0];
var blocks = document.getElementsByClassName("block");

setSecondaryMenu(moreBtn, moreMenu, 300);
setSecondaryMenu(weatherBtn, weatherMenu, 300);

/* 总结：
1. hidden属性和setTimeout这两个东西不知道，知道了更好的东西，才能有更好的实现思路。
解决：想问题之前需要多查阅文档，直接去搜某个东西网上给出各种乱七八糟的答案，可能不如直接查api准确，更好。
2. 箭头表达式 是匿名函数的一种简洁写法
解决：需要多了解js，查阅文档
 */