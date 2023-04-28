/**
 * 实现js控制二级菜单效果
 * by littlefean
 * 2020年10月24日
 */

/**
* 给两个元素绑定事件，一个按钮，一个面板，将这两个元素组成一个二级菜单效果
* @param {*} btn 按钮元素
* @param {*} panel 面板元素
* @author littlefean
*/
function setSecondaryMenu(btn, panel) {
    /**
     * 原理：
     * 鼠标放到按钮上，面板显示出来，鼠标移出按钮，面板延迟消失。
     * 在面板显示出来的基础上鼠标移动到面板上，面板永不消失。
     * 在面板显示出来的基础上鼠标移出面板区域，面板立刻消失。
     */
    /**鼠标移开按钮后面板延迟消失的时间 */
    var derTaTime = 0.3;
    /**面板元素是否显示了出来 */
    var isPanelShow = false;
    /**鼠标是否在两个元素之外 */
    var isMouseOut = true;
    /**此时间将一直增加 */
    var time = 0;
    /**移出按钮的时刻 */
    var tOutBtn = time;
    /**移入面板的时刻 */
    var tInPanel = time;
    //开启一个时时刻刻增加秒数的计时器
    setInterval(function () {
        time += 0.1;
        console.log("now:" + time);
        console.log("out:" + tOutBtn);
        console.log("in:" + tInPanel);
        if (time - tOutBtn > derTaTime && isMouseOut) {
            panel.style.opacity = 0;
        }
    }, 100);
    /**鼠标移入按钮 */
    btn.onmouseover = function () {
        isPanelShow = true;
        isMouseOut = false;
        panel.style.opacity = 1;
    }
    /**鼠标移出按钮 */
    btn.onmouseleave = function () {
        isMouseOut = true;
        panel.style.opacity = 1;
        tOutBtn = time;
    }
    /**鼠标移入面板 */
    panel.onmouseover = function () {
        isMouseOut = false;
        tInPanel = time;
        //在移入面板前先进行判断，如果是在规定的时间差值内移入，则能够将面板显示出来
        if (tInPanel - tOutBtn < derTaTime) {
            panel.style.opacity = 1;
        }
    }
    /**鼠标移出面板 */
    panel.onmouseleave = function () {
        isMouseOut = true;
        panel.style.opacity = 0;
        isPanelShow = false;
    }
}

var moreBtn = document.getElementById("more");
var moreMenu = document.getElementById("moreMenu");
var weatherMenu = document.getElementById("weatherMenu");
var weatherBtn = document.getElementsByClassName("show-weather")[0];
var blocks = document.getElementsByClassName("block");

setSecondaryMenu(moreBtn, moreMenu);
setSecondaryMenu(weatherBtn, weatherMenu);
