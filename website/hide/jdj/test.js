/**
 *
 * by littlefean
 */
window.onload = function () {
    let lights = document.querySelector(".lightDiv");
    for (let light of lights.childNodes) {
        if (light.nodeType === 1) {
            light.style.animationDelay = `-${Math.random() * 10}s`
        }
        // console.log(typeof light);
        // console.log(light.nodeType)
    }
}
