// 给所有有 twoColorFonts 类名的文字元素设置成奇数个字改变颜色的样式
const twoColorFonts = document.getElementsByClassName("twoColorFont");
for (let elem of twoColorFonts) {
	changeColor(elem, "#e89f71");
}
