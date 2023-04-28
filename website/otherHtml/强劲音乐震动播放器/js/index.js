/**
 *
 * by littlefean
 */
// 代码简化
let d = document;
d.get = d.querySelector;
window.onload = main;

function main() {
    let music = d.get("audio");

    let musicPlayer = new MusicList(music);

    let playStateChange = d.get("#playStateChange");
    let nextEle = d.get("#next");
    let beforeEle = d.get("#before");

    playStateChange.onclick = function () {
        musicPlayer.changeState();
        this.innerText = musicPlayer.playing ? "暂停" : "播放";
    }

    nextEle.onclick = () => {
        musicPlayer.next();
    };
    beforeEle.onclick = () => {
        musicPlayer.before();
    };

    // let ball = d.get(".ball");
    // let way = d.get(".way");

    // setInterval(() => {
    //     console.log(musicPlayer.getProcess());
    // }, 100);
}
