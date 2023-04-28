/**
 * 传入用于表示html文件的字符串，更改界面内容
 * 此函数主要用于模拟a标签的href属性
 * @param {*} html 文件路径字符串
 */
function go(html) {
	location.href = html;
}

/**
 * 传入ID字符串，跳转到某一个位置上
 * 此函数主要用于模拟a标签的href属性
 * @param {*} idString 传入ID字符串
 */
function gotoById(idString) {
	window.location.hash = idString;
}

/**
 * 传入html元素，根据html元素更改里面的文字
 * 更改文字为奇数个文字更改颜色
 * @param {*} ele 
 */
function changeColor(ele, color) {
	var str = ele.innerHTML;
	console.log(str);
	var strNewArr = [];
	for (let i = 0; i < str.length; i++) {

		if (i % 2 == 0) {
			strNewArr.push(`<font color="${color}">${str[i]}</font>`)
		} else {
			strNewArr.push(`<font>${str[i]}</font>`)
		}
	}
	ele.innerHTML = strNewArr.join("");
}