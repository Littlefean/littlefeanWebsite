/**
 *
 * by littlefean
 */
class Progress {
    /**
     *
     * @param bindEle 绑定的html标签
     */
    constructor(bindEle) {
        this.ele = bindEle;
        /**
         * 添加这样一个结构
         * <div class="way">

         <div class="water">
         <div class="ball"></div>
         </div>
         </div>

         * @type {HTMLDivElement}
         */
        this.wayEle = div("way");
        this.ballEle = div("ball");
        this.waterEle = div("water");
        this.waterEle.appendChild(this.ballEle);
        this.wayEle.appendChild(this.waterEle);
        this.ele.appendChild(this.wayEle);

        this.ballR = 15;
        this.wayLen = 600;
        this.rate = 0;
        this.bindPlayer = null;
        this.init();
    }

    init() {
        let cls = this;
        /// 添加拖拽效果
        this.ballEle.onmousedown = function (ev) {

            //获取圆点偏移量
            let progressLeft = ev.clientX - this.offsetLeft;
            d.onmousemove = function (e) {
                // 获取鼠标坐标
                let progressX = e.clientX - progressLeft;
                // 限制暂停（如果拖动条超出范围，则停止拖动）
                if (progressX <= 0 - cls.ballR) {
                    progressX = 0 - cls.ballR;
                } else if (progressX >= cls.wayLen - cls.ballR) {
                    progressX = cls.wayLen - cls.ballR;
                }
                // console.log(progressX)
                // 显示进度条
                cls.changeByPx(progressX);
            }
            // 为右侧圆点绑定鼠标抬起事件
            d.onmouseup = function () {
                // 取消鼠标移动事件
                d.onmousemove = null;
                // 取消鼠标抬起事件
                d.onmouseup = null;
            };
            ev.stopPropagation();
            //取消浏览器对拖拽内容进行搜索的默认行为
            return false;
        }

        /// 添加点击位置设置进度效果
        this.wayEle.addEventListener("mousedown", (e) => {
            let x = e.clientX - this.wayEle.offsetLeft - this.ballR;
            cls.changeByPx(x);
        });
    }

    /**
     * 通过像素值来更改 对象内部rate
     * 此改动会反作用于音乐的时间
     * @param x
     */
    changeByPx(x) {
        this.waterEle.style.width = x + "px";
        if (x < 0) {
            this.waterEle.style.marginLeft = x + "px";
            this.waterEle.style.width = "0";
        } else {
            this.waterEle.style.marginLeft = "0";
        }
        this.rate = (x + this.ballR) / this.wayLen;
        // console.log(this.rate);
        this.bindPlayer.setTimeByRate(this.rate);
    }

    /**
     * 通过比例来影响进度条显示
     * 此改动不会影响音乐，仅仅改动显示
     * @param rate
     */
    changeByRate(rate) {
        let centerX = rate * this.wayLen;
        this.waterEle.style.width = centerX + "px";
        if (centerX < this.ballR) {
            this.waterEle.style.marginLeft = centerX - this.ballR + "px";
            this.waterEle.style.width = "0";
        } else {
            this.waterEle.style.marginLeft = "0";
            this.waterEle.style.width = centerX - this.ballR + "px";
        }
    }

    setZero() {
        this.waterEle.style.width = "0";
        this.waterEle.style.marginLeft = -this.ballR + "px";
        this.rate = 0;
    }

    // changeByRate(rate) {
    //     this.changeByPx(rate * this.wayLen - this.ballR);
    //     this.bindPlayer.changeByRate(rate);
    // }

}

function div(className) {
    let res = d.createElement("div");
    res.classList.add(className);
    return res;
}
