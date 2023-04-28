const like = document.getElementsByClassName("a1");
for (let i = 0; i < like.length; i++) {
    like[i].addEventListener("click", function () {
        alert('感谢您的支持！该功能有待完善！');
    })
    console.log(i);
}
const btns = document.getElementsByClassName("a2");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        alert('该功能有待完善！');
    })
}