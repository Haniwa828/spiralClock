// イベント追加
const backgroundColor = (element) => {
    element.addEventListener("input", backgroundChange, false);
}

const backgroundImage = (element) => {
    element.addEventListener("change", updateAll, false);
}

const textColor = (element) => {
    element.addEventListener("input", textChange, false);
}



// カラーピッカーに触れてる状態で変化
const backgroundChange = (event) => {
    let targetEle = "";

    switch(event.target.id){
        case "background":
            targetEle = document.querySelectorAll(".analog-face");
            break;

        case "longHandScale":
            targetEle = document.querySelectorAll(".analog-line1, .analog-line2");
            break;

        case "shortHandScale":
            targetEle = document.querySelectorAll(".spiral");
            break;

        case "secHand":
            targetEle = document.querySelectorAll(".analog-seconds");
            break;
            
        case "minHand":
            targetEle = document.querySelectorAll(".analog-minutes");
            break;
            
        case "hourHand":
            targetEle = document.querySelectorAll(".analog-hours");
            break;

        default:
            console.log("来たよ");
            break;
    };

    targetEle.forEach(function(element) {
        element.style.backgroundColor = event.target.value;
    });
}

const textChange = (event) => {
    let targetEle = "";

    switch(event.target.id){
        case "longHandText":
            targetEle = document.querySelectorAll(".scale-text");
            break;

        case "shortHandText":
            targetEle = document.querySelectorAll(".spiral-text");
            break;

        default:
            console.log("来たよ");
            break;
    };

    targetEle.forEach(function(element) {
        element.style.color = event.target.value;
    });
}

// 変更終了で変化
function updateAll(event) {
    const targetEle = document.querySelector(".analog-face");

    // FileReaderオブジェクトを作成
    const reader = new FileReader();

    if((event.target.files)[0] != null){ // 画像が選ばれたとき
        reader.readAsDataURL((event.target.files)[0]); // URLとして読み込み
        reader.onload = function() { // 成功時
            targetEle.style.backgroundImage = `url(${reader.result})`; //reader.result;
        };
        reader.onerror = function() { // 失敗時
            //失敗した場合
            console.log(reader.error);
        };

        return;
    }
    // 画像が選ばれなかったとき
    targetEle.style.backgroundImage = ""; //reader.result;
}