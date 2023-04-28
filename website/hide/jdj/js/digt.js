/**
 *
 * by littlefean
 */

class Dig {
    constructor(ele) {
        this.num = -1;
        this.ele = ele;

        console.log(this.ele);

        this.topBar = this.ele.querySelector(".b1");
        this.midBar = this.ele.querySelector(".b2");
        this.leftTopBar = this.ele.querySelector(".b4");
        this.leftBottomBar = this.ele.querySelector(".b6");
        this.rightTopBar = this.ele.querySelector(".b5");
        this.rightBottomBar = this.ele.querySelector(".b7");
        this.bottomBar = this.ele.querySelector(".b3");

        this.darkRate = 20;
    }

    setDark(ele) {
        ele.style.filter = `brightness(${this.darkRate}%)`;
    }

    setBright(ele) {
        ele.style.filter = `brightness(100%)`;
    }

    clear() {
        this.setDark(this.topBar);
        this.setDark(this.midBar);
        this.setDark(this.leftTopBar);
        this.setDark(this.leftBottomBar);
        this.setDark(this.rightTopBar);
        this.setDark(this.rightBottomBar);
        this.setDark(this.bottomBar);
    }

    changeNumber(n) {
        this.clear();
        console.log("清空")
        switch (n) {
            case -1:
                break;
            case 1:
                this.setBright(this.rightBottomBar);
                this.setBright(this.rightTopBar);
                break;
            case 2:
                this.setBright(this.topBar);
                this.setBright(this.midBar);
                this.setBright(this.bottomBar);
                this.setBright(this.rightTopBar);
                this.setBright(this.leftBottomBar);
                break;
            case 3:
                this.setBright(this.topBar);
                this.setBright(this.midBar);
                this.setBright(this.bottomBar);
                this.setBright(this.rightTopBar);
                this.setBright(this.rightBottomBar);
                break;
            case 4:
                this.setBright(this.midBar);
                this.setBright(this.leftTopBar);
                this.setBright(this.rightTopBar);
                this.setBright(this.rightBottomBar);
                break;
            case 5:
                this.setBright(this.topBar);
                this.setBright(this.midBar);
                this.setBright(this.bottomBar);
                this.setBright(this.leftTopBar);
                this.setBright(this.rightBottomBar);
                break;
            case 6:
                this.setBright(this.topBar);
                this.setBright(this.midBar);
                this.setBright(this.bottomBar);
                this.setBright(this.leftTopBar);
                this.setBright(this.leftBottomBar);
                this.setBright(this.rightBottomBar);
                break;
            case 7:
                this.setBright(this.topBar);
                this.setBright(this.rightBottomBar);
                this.setBright(this.rightTopBar);
                break;
            case 8:
                this.setBright(this.topBar);
                this.setBright(this.midBar);
                this.setBright(this.leftTopBar);
                this.setBright(this.leftBottomBar);
                this.setBright(this.rightTopBar);
                this.setBright(this.rightBottomBar);
                this.setBright(this.bottomBar);
                break;
            case 9:
                this.setBright(this.topBar);
                this.setBright(this.midBar);
                this.setBright(this.leftTopBar);
                this.setBright(this.rightTopBar);
                this.setBright(this.rightBottomBar);
                this.setBright(this.bottomBar);
                break;
            case 0:
                this.setBright(this.topBar);
                this.setBright(this.leftTopBar);
                this.setBright(this.leftBottomBar);
                this.setBright(this.rightTopBar);
                this.setBright(this.rightBottomBar);
                this.setBright(this.bottomBar);
                break;
        }
    }
}
