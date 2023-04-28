/**
 *
 * @param ele {HTMLElement}
 */
function dfs(ele) {
    let list = ele.childNodes;
    let text = ele.innerText;
    if (text !== undefined && text !== "") {
        if (text.includes("留不住")) {
            ele.style.display = "none";
        }
    }
    if (list.length !== 0) {
        for (let eleItem of list) {
            dfs(eleItem);
        }
    }
}

dfs(document.querySelector("body"));
