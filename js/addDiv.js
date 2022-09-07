// div追加
const addDiv = (parentDiv, className, callBack = null) => { // 引数に=をつけることでデフォルトの値設定
    const t = document.createElement("div");
    t.classList.add(className);
    if(callBack && typeof(callBack) === "function") callBack(t);
    parentDiv.appendChild(t);

    return t;
}