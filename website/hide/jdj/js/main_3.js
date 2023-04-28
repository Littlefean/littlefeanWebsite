/**
 *
 * by littlefean
 */
let d = document;
d.get = d.querySelector;

window.onload = function () {

    // 表示当前状态的对象
    let state = {bg: 1, openLight: false};

    let lightCssIndex = 600;
    let bgCssIndex = 200;
    let maskCssIndex = 1;

    // 测试操作
    // d.get(".bg10").style.display = "block";


    // 给遮罩圆圈设置css
    function setMaskCircleCss(index) {
        let maskEle = d.get(".mask");
        if (index === 10) {
            maskEle.style.top = "0";
            maskEle.style.left = "0";
            maskEle.style.width = "1457px";
            maskEle.style.height = "792px";
            maskEle.style.borderRadius = "0";
        } else {
            maskEle.style.top = maskStateArr[index - 1].top;
            maskEle.style.left = maskStateArr[index - 1].left;
            maskEle.style.width = maskStateArr[index - 1].width;
            maskEle.style.height = maskStateArr[index - 1].height;
            maskEle.style.transform = `rotate(${maskStateArr[index - 1].rotate}deg)`;
        }
    }

    // 隐藏当前阶段的椭圆
    function hideMaskCircle() {
        let maskEle = d.get(".mask");
        maskEle.style.width = "0px";
        maskEle.style.height = "0px";
        maskEle.style.transform = `none`;
    }

    // 让一个图片透明度消失
    function fadePic(index) {
        let bgEleLast = d.get(`.bg${index}`);
        bgEleLast.style.opacity = "0";
    }

    function fadeBgPic(index) {
        let bgEleLast = d.get(`.maskBg${index}`);
        bgEleLast.style.opacity = "0";
    }

    // 让下一个图片登场
    function cameOutPic(index) {
        let bgEle = d.get(`.bg${index}`);
        bgEle.style.display = "block";
        bgEle.style.zIndex = `${bgCssIndex + index}`;
    }

    function cameOutBgPic(index) {
        let maskEle = d.get(`.maskBg${index}`);
        maskEle.style.display = "block";
        maskEle.style.zIndex = `${maskCssIndex + index}`;
    }

    function openLight(index) {
        let lightEle = d.get(`.p${index}`)
        // lightEle.style.display = "block";
        lightEle.style.opacity = "1";
        lightEle.style.zIndex = `${lightCssIndex + index}`;
    }

    function closeLight(index) {
        let lightEle = d.get(`.p${index}`);
        lightEle.style.opacity = "0";
    }

    function fadeBtn() {
        let ele = d.get(".flashBtn");
        ele.style.display = "none";
    }

    function showBtn(index) {
        if (index >= 0 && index < 10) {
            let ele = d.get(".flashBtn");
            ele.style.left = BTN_ARR[index].left + "px";
            ele.style.top = BTN_ARR[index].top + "px";
            ele.style.display = "block";
        }
    }

    // 初始化操作
    d.get(".maskBg1").style.zIndex = `${maskCssIndex + 1}`;
    d.get(".bg1").style.zIndex = `${bgCssIndex + 1}`;
    setMaskCircleCss(state.bg);
    hideMaskCircle();

    window.addEventListener("click", () => {
        // 最后一个是特殊情况，不需要灯光
        if (state.bg === 9) {
            state.openLight = true;
        }
        // 在最开始bg是1

        if (state.openLight === false) {
            // 如果当前点击还是一个没开灯的状态，先开灯

            // 更改状态数据
            state.openLight = true;

            // 先让按钮消失
            fadeBtn();
            // 打开光线
            openLight(state.bg);
            // 设置椭圆css
            setMaskCircleCss(state.bg);

        } else {
            // 如果是已经开灯了，切换下一个图片

            if (state.bg === 9) {
                // 已经结束了，触发拼图事件
                closeLight(state.bg);
                end();
            } else {
                // 切换下一个图片
                state.openLight = false;
                // 让当前图片消失
                fadePic(state.bg);
                hideMaskCircle();

                state.bg++;
                showBtn(state.bg);
                setMaskCircleCss(state.bg);
                cameOutPic(state.bg);
                cameOutBgPic(state.bg);
                // 关闭上一个灯光
                closeLight(state.bg - 1);
            }
        }
        console.log(state);
    });

    function end() {
        // 关闭所有背景
        // 关闭所有mask
        // 打开所有灯光
        for (let i = 1; i <= 9; i++) {
            fadePic(i);
            fadeBgPic(i);
            setTimeout(() => {
                openLight(i);
            }, i * 200)

        }
        setMaskCircleCss(10);

        // 延迟开启logo
        setTimeout(() => {
            d.get(".bg10").style.display = "block";
        }, 2000);

        // 延迟改变背景颜色
        setTimeout(() => {
            d.get("body").style.backgroundColor = "white";
        }, 2000);

        // // 延迟关闭光线
        // setTimeout(() => {
        //     for (let i = 1; i <= 9; i++) {
        //         let lightEle = d.get(`.p${i}`);
        //         console.log(lightEle);
        //         lightEle.style.opacity = "0";
        //     }
        // }, 3000);
    }
}
