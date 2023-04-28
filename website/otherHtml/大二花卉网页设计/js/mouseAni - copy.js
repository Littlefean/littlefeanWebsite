/**
 * 鼠标按下屏幕上飞出一个花朵的特效
 * 日期：2020年12月5日
 * littlefean
 */

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


var mouseLoc = null;
var body = document.querySelector('body');
//鼠标移动获取位置
document.onmousemove = function (e) {
    mouseLoc = { 'x': e.pageX, 'y': e.pageY };
};
//鼠标在屏幕中按下事件
document.onmousedown = function (e) {
    let a = document.createElement('div');
    a.setAttribute('class', 'flower');
    //设置初始css属性
    a.style.zIndex = 500;
    a.style.width = 100 + 'px';
    a.style.height = 100 + 'px';
    a.style.position = 'absolute';
    a.style.backgroundImage = "url('../img/ani/i.png')";
    a.style.backgroundRepeat = 'no-repeat';
    a.style.top = mouseLoc.y - 100 + 'px';
    a.style.left = mouseLoc.x - 40 + 'px';
    // a.style.backgroundSize = Math.random() * 100 + 20 + 'px';
    a.style.backgroundSize = '100%';
    console.log('asssssd');
    body.appendChild(a);
    var t = 0;
    var ro = 1;
    var roAdd = randomNum(-5, 5);
    var size = 100;
    var op = 0.99;

    //开启花朵上升动画
    var boomAni = setInterval(function () {
        t++;
        a.style.top = a.offsetTop - 2 + 'px';
        ro += roAdd;
        a.style.transform = "rotate(" + ro + "deg)";
        a.style.backgroundSize = size + '%';
        a.style.opacity = op;
        if (size >= 30) {
            size -= 0.5;
        }
        if (op > 0) {
            op -= 0.01;
        }
        if (t >= 100) {
            a.remove();
            clearInterval(boomAni);
            return;
        }
    }, 1);
}