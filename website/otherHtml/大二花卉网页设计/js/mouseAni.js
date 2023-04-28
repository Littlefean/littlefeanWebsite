/**
 * 鼠标按下屏幕上飞出一个花朵的特效
 * 日期：2020年12月5日
 * littlefean
 */

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(`${Math.random() * minNum + 1}`, 10);
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
		default:
			return 0;
	}
}

//存放鼠标位置的全局变量
let MOUSE_LOC = null;

const body = document.querySelector('body');
//鼠标移动，实时获取位置并保存到 MOUSE_LOC 中
document.onmousemove = function (e) {
	MOUSE_LOC = { 'x': e.pageX, 'y': e.pageY };
};

//鼠标在屏幕中按下事件
document.onmousedown = function () {
	let a = document.createElement('div');
	a.setAttribute("class", 'flower');
	//设置初始css属性
	a.style.zIndex = "500";
	a.style.width = 100 + 'px';
	a.style.height = 100 + 'px';
	a.style.position = 'absolute';
	a.style.backgroundImage = "url('img/ani/i.png')"; /* 花朵图片的地址 */
	a.style.backgroundRepeat = 'no-repeat';

	/* 花朵位置必须要在鼠标点击位置上面一些，不能遮挡鼠标点击位置，否则按钮点击无效 */
	a.style.top = MOUSE_LOC.y - 100 + 'px';
	a.style.left = MOUSE_LOC.x - 40 + 'px';
	a.style.backgroundSize = '100%';

	console.log('asssssd');

	body.appendChild(a);
	let t = 0;	/* 表示当前动画时间 */
	let ro = 1;  /* 表示当前动画中花朵的角度 */
	const roAdd = randomNum(-5, 5);  /* 表示当前动画中花朵的旋转方向速度 */
	let size = 100;  /* 表示当前动画中花朵的大小 */
	let op = 0.99;  /* 表示当前动画中花朵的透明度 */

	//开启花朵上升动画，开启定时器
	const boomAni = setInterval(function () {
		//时间增加
		t++;
		//位置上升
		a.style.top = a.offsetTop - 2 + 'px';
		//角度旋转
		ro += roAdd;
		//css属性更新
		a.style.transform = "rotate(" + ro + "deg)";
		a.style.backgroundSize = size + '%';
		a.style.opacity = op;
		// 体积逐渐减小
		if (size >= 30) {
			size -= 0.5;
		}
		// 透明度逐渐降低
		if (op > 0) {
			op -= 0.01;
		}
		// 时间超时结束动画
		if (t >= 100) {
			a.remove();
			clearInterval(boomAni);
		}
	}, 1);
}