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

    d.get(".maskBg1").style.zIndex = `${maskCssIndex + 1}`;
    d.get(".bg1").style.zIndex = `${bgCssIndex + 1}`;


    window.addEventListener("click", () => {
        if (state.openLight === false) {
            // 如果当前点击还是一个没开灯的状态，先开灯
            state.openLight = true;
            let lightEle = d.get(`.p${state.bg}`)
            lightEle.style.display = "block";
            lightEle.style.zIndex = `${lightCssIndex + state.bg}`;
        } else {
            // 如果是已经开灯了，切换下一个图片
            if (state.bg === 9) {
                // 已经结束了，触发拼图事件
                end();
            } else {
                // 切换下一个图片
                state.openLight = false;
                let bgEleLast = d.get(`.bg${state.bg}`);
                bgEleLast.style.opacity = "0";
                state.bg++;

                // 显示下一张背景图
                let bgEle = d.get(`.bg${state.bg}`);
                bgEle.style.display = "block";
                bgEle.style.zIndex = `${bgCssIndex + state.bg}`;
                // 显示下一张模糊图
                let maskEle = d.get(`.maskBg${state.bg}`);
                maskEle.style.display = "block";
                maskEle.style.zIndex = `${maskCssIndex + state.bg}`;

                // 关闭上一个灯光
                // d.get(`.p${state.bg - 1}`).style.display = "none";
            }
        }
        console.log(state);
    });

    function end() {
        // 关闭所有背景
        // 关闭所有mask
        for (let i = 1; i <= 9; i++) {
            let bgEle = d.get(`.bg${i}`);
            bgEle.style.opacity = "0";
            let maskEle = d.get(`.maskBg${i}`);
            maskEle.style.opacity = "0";
        }


        // 延迟开启logo
        setTimeout(() => {
            d.get(".bg10").style.display = "block";
        }, 2000);
        // 延迟改变背景颜色
        setTimeout(() => {
            d.get("body").style.backgroundColor = "white";
        }, 2000);
        // 延迟关闭光线
        setTimeout(() => {
            for (let i = 1; i <= 9; i++) {
                let lightEle = d.get(`.p${i}`);
                console.log(lightEle);
                lightEle.style.opacity = "0";
            }
        }, 3000);
    }
}
