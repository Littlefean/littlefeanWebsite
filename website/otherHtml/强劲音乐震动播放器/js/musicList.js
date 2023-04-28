/**
 *
 * by littlefean
 */

class MusicList {
    constructor(bindEle) {
        this.bindEle = bindEle;
        // 歌单列表
        this.list = MUSIC_LIST;
        // 当前正在播放的编号
        this.playIndex = 0;
        // 当前是否正在播放音乐
        this.playing = false;

        // 进度条控件
        this.process = new Progress(d.get(".barArea"));
        this.process.bindPlayer = this;  // 相互绑定

        // title
        this.titleEle = d.get(".title");
        this.titleEle.innerText = this.getMusic().name;



        // 光碟
        this.imgAreaEle = d.get(".musicImg");
        this.imgEle = this.imgAreaEle.querySelector("img");
        this.imgEle.src = `img/${this.getMusic().img}`;
        this.imgEle.style.animationPlayState = "paused";

        // 音量
        this.soundEle = d.get(".volume");
        this.imgEle.style.animationDuration = func(+this.soundEle.value / 100) + "s";
        this.soundEle.addEventListener("change", () => {
            // 更改音量
            let value = +this.soundEle.value / 100;
            this.bindEle.volume = value;
            console.log(func(value))
            this.imgEle.style.animationDuration = func(value) + "s";
        });
        setInterval(() => {
            let p = this.getProcess()
            if (p === 1) {
                this.next();
            }
            this.process.changeByRate(p);
        }, 100);
    }

    // 获取当前音乐的播放进度 0~1
    getProcess() {
        return this.bindEle.currentTime / this.bindEle.duration;
    }

    setTimeByRate(rate) {
        this.bindEle.currentTime = Math.floor(this.bindEle.duration * rate);
    }

    // 获取当前正在播放的音乐的信息
    getMusic() {
        return this.list[this.playIndex];
    }

    // 播放暂停按钮触发函数
    changeState() {
        this.playing = !this.playing;
        if (this.playing) {
            this.bindEle.play();
            this.imgEle.style.animationPlayState = "running";
            d.get(".rotateBox").style.animationPlayState = "running";
        } else {
            this.bindEle.pause();
            this.imgEle.style.animationPlayState = "paused";
            d.get(".rotateBox").style.animationPlayState = "paused";
        }
    }

    changeMusic() {
        this.bindEle.src = `music/${this.getMusic().name}`;
        this.bindEle.play();
        this.playing = true;
        this.titleEle.innerText = `${this.getMusic().name}`;
        this.imgEle.src = `img/${this.getMusic().img}`;
    }

    // 下一个
    next() {
        this.playIndex++;
        if (this.playIndex === this.list.length) {
            this.playIndex = 0;
        }
        this.changeMusic();
    }

    // 上一个
    before() {
        this.playIndex--;
        if (this.playIndex < 0) {
            this.playIndex = this.list.length - 1;
        }
        this.changeMusic();
    }

}

let func = (x) => {
    if (x === 0) {
        return 1000;
    }
    let k = -1.9;
    let b = 2;
    return k * x + b;
}
