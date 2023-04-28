/**
 *
 * by littlefean
 */
// 旋转区域元素
let rotateBox = document.querySelector(".rotateZone");
// 中心点坐标
let CENTER_LOC = new Vector(rotateBox.clientWidth / 2, rotateBox.clientHeight / 2);
// 是否有卡片在中心
let IS_CARD_IN_CENTER = false;

class Card {
    /**
     *
     * @param ele
     * @param loc {Vector}
     */
    constructor(ele, loc) {
        this.ele = ele;
        this.rotateLoc = loc;  // 公转坐标位置
        this.nowLoc = loc;  // 当前迭代位置
        this.moveToLoc(loc);  // 初始化改变元素的位置
        this.isInCenter = false;  // 是否是中心位置
        this.isInRotate = true;  // 是否在公转轨道上

        this.goto = 0;  // 表示旋转去向，0表示将要去中心，1表示去轨道上。
        this.moveSpeed = 10;  // 卡牌移动速度
        // 卡牌元素点击事件
        this.ele.addEventListener("click", () => {

            if (this.isInCenter) {
                // 当前是在中心位置上的  需要还原到公转轨道上面去
                IS_CARD_IN_CENTER = true;
                this.isInCenter = false;
                this.goto = 1;

            } else if (this.isInRotate) {
                if (IS_CARD_IN_CENTER) {
                    // 如果已经有卡在中心了，则不能这样
                    return;
                }
                // 当前是在公转轨道上的  需要移动到中心
                this.isInRotate = false;
                this.goto = 0;

            } else {

            }
            // 翻面
            this.changeFace();
        })
    }

    /**
     * 改变自身位置
     * 让自身的html元素瞬间移动到一个位置上
     * @param locVec
     */
    moveToLoc(locVec) {
        this.ele.style.left = locVec.x + "px";
        this.ele.style.top = locVec.y + "px";
    }

    /**
     * 卡牌自身移动迭代自己的位置
     */
    moveTick() {
        if (!this.isInCenter && !this.isInRotate) {
            // 向外旋转 或者向内旋转
            let destination = CENTER_LOC;
            // 当前是在两种中间状态上的
            if (this.goto === 0) {
                // 将要去中心
                this.nowLoc.add(destination.sub(this.nowLoc).to1().mul(this.moveSpeed));
            } else {
                // 将要去轨道上
                destination = this.rotateLoc;
                this.nowLoc.add(destination.sub(this.nowLoc).to1().mul(this.moveSpeed));
            }
            // 判断自己是不是已经到达目的地了
            if (this.nowLoc.sub(destination).abs() < 5) {
                // 到了
                if (this.goto === 0) {
                    // 已经到中心了
                    this.goto = 1;
                    this.isInCenter = true;
                    this.isInRotate = false;
                    console.log("到达中心了");
                    IS_CARD_IN_CENTER = true;
                } else {
                    // 已经到轨道上了
                    this.goto = 0;
                    this.isInRotate = true;
                    this.isInCenter = false;
                    console.log("到达轨道上el");
                    IS_CARD_IN_CENTER = false;
                }
            }
            this.moveToLoc(this.nowLoc);
        }
    }

    /**
     * 让这个卡牌旋转一个单位刻度 公转
     * 迭代自己的公转位置点
     */
    rotateTick() {
        // 公转角速度 Math.PI / 100
        this.rotateLoc = Vector.rotatePoint(CENTER_LOC, this.rotateLoc, Math.PI / 100);
        if (this.isInRotate) {
            // 当前是在公转轨道上公转
            this.moveToLoc(this.rotateLoc);
            this.nowLoc = this.rotateLoc.copy();
        } else if (this.isInCenter) {
            // 当前是在中心停止
            this.moveToLoc(CENTER_LOC);
            this.nowLoc = CENTER_LOC.copy();
        }
    }

    // 让卡牌进行翻面
    changeFace() {
        if (+this.ele.dataset.face === 0) {
            this.ele.style.animationName = "cardToNeg";
            this.ele.style.animationPlayState = "running";
            setTimeout(() => {
                this.ele.dataset.face = "1";
                this.ele.style.animationPlayState = "paused";
            }, 501);
        }
        if (+this.ele.dataset.face === 1) {
            this.ele.style.animationName = "cardToPos";
            this.ele.style.animationPlayState = "running";
            setTimeout(() => {
                this.ele.dataset.face = "0";
                this.ele.style.animationPlayState = "paused";
            }, 501);
        }
    }
}

window.onload = function () {
    // 初始化旋转位置
    console.log(CENTER_LOC);
    let eleInitLoc = new Vector(CENTER_LOC.x, CENTER_LOC.y - 200);
    console.log(eleInitLoc);

    let cardObjArr = [];  // 卡牌对象

    // 初始化每个卡牌的位置
    let i = 0;  // 卡牌计数
    for (let ele of rotateBox.querySelectorAll(".cardBox")) {
        let eleLoc = Vector.rotatePoint(CENTER_LOC, eleInitLoc, Math.PI / 3 * i);
        let cardObj = new Card(ele, eleLoc);
        cardObjArr.push(cardObj);
        i++;
    }

    let shouldRotate = true;  // 是否应该旋转
    // 移入
    rotateBox.addEventListener("mouseover", () => {
        shouldRotate = false;
    })
    rotateBox.addEventListener("mouseleave", () => {
        shouldRotate = true;
    })

    // 旋转定时器
    let rotateAni = setInterval(() => {
        if (shouldRotate) {
            for (let card of cardObjArr) {
                card.rotateTick();
            }
        }
        for (let card of cardObjArr) {
            card.moveTick();
        }
    }, 25);
}
