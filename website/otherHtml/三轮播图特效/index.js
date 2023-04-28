/**
 *
 * by littlefean
 */
window.onload = function () {
    let circleSwiper = document.querySelector("#myThreeCircle");
    let leftC = circleSwiper.querySelector(".left");
    let midC = circleSwiper.querySelector(".mid");
    let rightC = circleSwiper.querySelector(".right");
    let nextBtn = circleSwiper.querySelector(".next");
    let beforeBtn = circleSwiper.querySelector(".before");

    let threeEle = [leftC, midC, rightC];
    let delay = 1000;  // ms
    /**
     * 按钮：下一个
     * 右边的跑到中间来
     * 中间的跑到左边去
     * 左边的跑到右边去
     */
    nextBtn.addEventListener("click", function () {
        // 先立刻禁用此按钮
        console.log(this);
        this.setAttribute("disabled", "disabled");
        //开启动画状态
        leftC.style.animationName = "leftToCenter";
        midC.style.animationName = "centerToRight";
        rightC.style.animationName = "rightToLeft";
        for (let ele of threeEle) {
            ele.style.animationPlayState = "running";
        }
        setTimeout(() => {
            console.log("ok");
            // 移除禁用属性
            this.removeAttribute("disabled");
            let rightInner = rightC.innerHTML;
            rightC.innerHTML = midC.innerHTML;
            midC.innerHTML = leftC.innerHTML;
            leftC.innerHTML = rightInner;
            // 重新恢复动画到初始状态
            for (let ele of threeEle) {
                ele.style.animationPlayState = "paused";
                ele.style.animationName = "none";
            }
        }, delay);
    })

    /**
     * 按钮：上一个
     * 左边的跑到中间来
     * 中间到跑到右边去
     * 右边的到左边去
     */
    beforeBtn.addEventListener("click", function () {
        // 先立刻禁用此按钮
        console.log(this);
        this.setAttribute("disabled", "disabled");
        //开启动画状态
        leftC.style.animationName = "leftToCenter-Reversed";
        midC.style.animationName = "centerToRight-Reversed";
        rightC.style.animationName = "rightToLeft-Reversed";
        for (let ele of threeEle) {
            ele.style.animationPlayState = "running";
        }
        setTimeout(() => {
            console.log("ok");
            // 移除禁用属性
            this.removeAttribute("disabled");
            let leftInner = leftC.innerHTML;
            leftC.innerHTML = midC.innerHTML;
            midC.innerHTML = rightC.innerHTML;
            rightC.innerHTML = leftInner;
            // 重新恢复动画到初始状态
            for (let ele of threeEle) {
                ele.style.animationPlayState = "paused";
                ele.style.animationName = "none";
            }
        }, delay);
    })
}
