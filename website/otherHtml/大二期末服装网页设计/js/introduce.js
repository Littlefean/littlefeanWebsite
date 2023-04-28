var imgIndex = 0;
var imgDivArr = document.getElementsByClassName("imgdiv");
var dotArr = document.getElementsByClassName("dot");
/**
 *  播放图片
 *  参数r：是否正放，若为true，正放
 */
function picplay(r) {
	for (let i = 0; i < imgDivArr.length; i++) {
		imgDivArr[i].style.display = "none";
		dotArr[i].className = "dot";
	}
	if (r) {
		imgIndex++;
		imgIndex = (imgIndex >= imgDivArr.length) ? 0 : imgIndex;
	} else {
		imgIndex--;
		imgIndex = (imgIndex < 0) ? imgDivArr.length - 1 : imgIndex;
	}
	imgDivArr[imgIndex].style.display = "block";
	dotArr[imgIndex].className = "dot active";
}
setInterval(picplay, 3000, true);