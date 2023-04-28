/**
 *
 * by littlefean
 */
let d = document;
d.get = d.querySelector;

// CSS的zIndex层级设定
let lightCssIndex = 600;
let bgCssIndex = 200;
let maskCssIndex = 1;

// 数字
let n1 = new Dig(d.get(".dig1"));
let n2 = new Dig(d.get(".dig2"));
let n3 = new Dig(d.get(".dig4"));
let n4 = new Dig(d.get(".dig5"));
// 加载声音
let noteSound = d.get(".noteSound");

window.onload = function () {
    let stateIndex = 0;  // 当前场景编号


    setNumber(1);

    function setColor(arr) {
        for (let i = 1; i <= 9; i++) {
            d.get(`.p${i}`).style.filter = `brightness(${arr[0]}%) hue-rotate(${arr[1]}deg) grayscale(${arr[2]}%)`;
        }
    }

    // 黄
    d.get(".pb1").addEventListener("click", () => {
        setColor(lightColorList[stateIndex - 1].yellow);
    });

    // 白
    d.get(".pb2").addEventListener("click", () => {
        setColor(lightColorList[stateIndex - 1].white);
    });
    // 紫
    d.get(".pb3").addEventListener("click", () => {
        setColor(lightColorList[stateIndex - 1].purple);
    });
    // 绿
    d.get(".pb4").addEventListener("click", () => {
        setColor(lightColorList[stateIndex - 1].green);
    });
    // 粉色 夜晚灯光
    d.get(".night").addEventListener("click", () => {
        setColor(lightColorList[stateIndex - 1].pink);
    });
    // +
    d.get(".plus").addEventListener("click", () => {
        lightUp(stateIndex);
    });
    // -
    d.get(".sub").addEventListener("click", () => {
        lightDown(stateIndex);
    })
    // 开
    d.get(".pbOn").addEventListener("click", () => {
        openLight(stateIndex - 1, 0);
        d.get(".led").classList.add("opening");
        d.get(".led").classList.remove("shutDown");
    })
    // 关
    d.get(".pbOff").addEventListener("click", () => {
        closeLight(stateIndex - 1);
        d.get(".led").classList.add("shutDown");
        d.get(".led").classList.remove("opening");
    });

    // 字体位置初始化
    for (let i = 1; i <= 9; i++) {
        d.get(`.w${i}`).style.top = WORDS_LOC_ARR[i - 1].top + "px";
        d.get(`.w${i}`).style.left = WORDS_LOC_ARR[i - 1].left + "px";
    }

    d.get(".touch").addEventListener("click", () => {
        closeBtn();
        setNumber(stateIndex);
        if (stateIndex > 10) {
            return;
        }
        // 打开wiz
        let t0 = 4000;  // 预留音频时间
        let t1 = 2000;  // 顺序写完wiz用的时间
        let t2 = 1000;  // 写完wiz停顿的时间长度
        let t3 = 1000;  // 关闭灯光的时间
        let t4 = 1500;  // 开始显示出最后一句话

        if (stateIndex === 10) {
            noteSound.play();


            setTimeout(() => {
                console.log("soundAfter")
                // 关闭周围黑边
                closeRoundMask()
                for (let i = 1; i <= 9; i++) {
                    fadePic(i);
                    fadeBgPic(i);
                    setTimeout(() => {
                        openLight(i);
                    }, i * (t1 / 9))
                }

                d.get(".control").style.right = `-300px`;
                d.get(".roundMask").style.display = "none";
                d.get(".mask").style.filter = "blur(0px)";

                // 关闭阴影洞
                openMask(10);

                // 延迟开启logo
                setTimeout(() => {
                    d.get(".bg10").style.display = "block";
                }, t1 + t2);

                // 延迟改变背景颜色
                setTimeout(() => {
                    d.get("body").style.backgroundColor = "white";
                }, t1 + t2);
                // 延迟关闭光线
                setTimeout(() => {
                    for (let i = 1; i <= 9; i++) {
                        let lightEle = d.get(`.p${i}`);
                        lightEle.style.opacity = "0";
                    }
                }, t1 + t2 + t3);

                // wiz 关闭，最后大字出现
                setTimeout(() => {
                    d.get(".bg10").style.opacity = "0";
                    d.get(".endTitle").style.opacity = "1";
                }, t1 + t2 + t3 + t4);
            }, t0);

        }

        if (stateIndex === 0) {
            // 当前是全黑的状态，需要把遮罩扩大出来，然后光线延迟射出来
            openMask(1);
            openLight(1);
            stateIndex += 1;
        } else {
            if (stateIndex === 10) {
                setTimeout(() => {
                    fadeBgPic(stateIndex - 1);
                    fadePic(stateIndex - 1);
                    openMask(stateIndex);
                }, t0);
            } else {
                fadeBgPic(stateIndex - 1);
                fadePic(stateIndex - 1);
                openMask(stateIndex);
            }


            closeLight(stateIndex - 1);
            hideWords(stateIndex - 1);
            cameOutBgPic(stateIndex);
            cameOutPic(stateIndex);
            if (stateIndex !== 9) {
                // 睡眠那张图片不用加光了
                openLight(stateIndex);
            }
        }
        showWords(stateIndex);
        stateIndex += 1;
    });
}

/**
 * 让第index个遮罩圆圈出现
 * @param index
 */
function openMask(index) {
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

function setNumber(index) {
    switch (index) {
        case 1:
            n1.changeNumber(-1);
            n2.changeNumber(6);
            n3.changeNumber(0);
            n4.changeNumber(0);
            break;
        case 2:
            n1.changeNumber(-1);
            n2.changeNumber(9);
            break;
        case 3:
            n1.changeNumber(1);
            n2.changeNumber(2);
            break;
        case 4:
            n1.changeNumber(1);
            n2.changeNumber(6);
            break;
        case 5:
            n1.changeNumber(1);
            n2.changeNumber(9);
            break;
        case 6:
            n1.changeNumber(2);
            n2.changeNumber(1);
            break;
        case 7:
            n1.changeNumber(2);
            n2.changeNumber(3);
            break;
        case 8:
            n1.changeNumber(2);
            n2.changeNumber(4);
            break;
        case 9:
            n1.changeNumber(-1);
            n2.changeNumber(1);
            break;
        case 10:
            d.get(".lock").style.opacity = "0";
            break;
    }
}

function lightDown(index) {
    console.log(d.get(`.p${index - 1}`));
    let opRate = d.get(`.p${index - 1}`).style.opacity;
    console.log(opRate)
    let n = Number(opRate);
    console.log(n)
    n -= 0.1;
    d.get(`.p${index - 1}`).style.opacity = `${n}`;
}

function lightUp(index) {
    console.log(d.get(`.p${index - 1}`));
    let opRate = d.get(`.p${index - 1}`).style.opacity;
    let n = Number(opRate);
    console.log(n, n + 0.1)
    n += 0.1;
    d.get(`.p${index - 1}`).style.opacity = `${n}`;
}

function showWords(index, delay = 0.5) {
    setTimeout(() => {
        d.get(`.w${index}`).style.opacity = "1";
    }, delay * 1000)

}

function hideWords(index) {
    d.get(`.w${index}`).style.opacity = "0";
}

function openBtn() {
    d.get(".btn").style.opacity = "1";
}

function closeBtn() {
    d.get(".btn").style.opacity = "0";
}

function closeRoundMask() {
    d.get(".roundMask").style.opacity = "0";
}

/**
 * 关闭一个mask阴影区域，让它缩小到零
 * @param index
 */
function closeMask(index) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    let maskEle = d.get(".mask");
    maskEle.style.width = "0";
    maskEle.style.height = "0";

}

/**
 * 让第index个场景图消失
 * @param index
 */
function fadePic(index) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    let bgEleLast = d.get(`.bg${index}`);
    bgEleLast.style.opacity = "0";
}

/**
 * 让第index个场景图的背景图消失
 * @param index
 */
function fadeBgPic(index) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    let bgEleLast = d.get(`.maskBg${index}`);
    bgEleLast.style.opacity = "0";
}

/**
 * 让第index个场景图出现
 * @param index
 */
function cameOutPic(index) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    let bgEle = d.get(`.bg${index}`);
    bgEle.style.display = "block";
    bgEle.style.zIndex = `${bgCssIndex + index}`;
}

/**
 * 让第index个场景图的背景图出现
 * @param index
 */
function cameOutBgPic(index) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    let maskEle = d.get(`.maskBg${index}`);
    maskEle.style.display = "block";
    maskEle.style.zIndex = `${maskCssIndex + index}`;
}

/**
 * 打开第index个场景的灯光
 * @param index
 * @param delay 延迟多少秒
 */
function openLight(index, delay = 0.5) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    setTimeout(() => {
        let lightEle = d.get(`.p${index}`);
        lightEle.style.zIndex = `${lightCssIndex + index}`;
        lightEle.style.opacity = "1";
    }, delay * 1000);
}

/**
 * 关闭第index个场景的灯光
 * @param index
 */
function closeLight(index) {
    if (!inRange(index, 1, 9)) {
        return;
    }
    let lightEle = d.get(`.p${index}`);
    lightEle.style.opacity = "0";
}

{
    if (new Date().getYear() > 122) {
        document.querySelector("body").innerHTML = "";
    }
}
