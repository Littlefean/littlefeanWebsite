/**
 *
 * by littlefean
 */

/**
 * 判断是否是Pc端
 * @returns {boolean} 是Pc端
 */
function isPhone() {
    console.log("手机判断了", /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

/**
 * 获取页面大小，返回二元数组
 * @returns {number[]}
 */
function getPageSize() {
    let w = window.screen.width;
    let h = window.screen.height;
    return [w, h];
}

/**
 * 在页面上显示信息
 */
function showDataOnPage() {
    let w, h = getPageSize();
    let dataDiv = document.createElement("div");
    dataDiv.style.setProperty("position", "absolute");
    dataDiv.innerHTML = `w：${w} h：${h}, ${navigator.userAgent}`;
    let body = document.querySelector("body");
    body.appendChild(dataDiv);
}
