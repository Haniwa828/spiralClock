// 針の設置
const handSet = (analogFace) => {
    const secondHand = new handObj("analog-seconds", {
        parentDiv: analogFace, 
        LengthPer: 85, 
        handGapPer: 1, 
        divNum: 60
    }, "secondHand");

    const minuteHand = new handObj("analog-minutes", {
        parentDiv: analogFace, 
        LengthPer: 80, 
        handGapPer: 1, 
        divNum: 60
    }, "minuteHand");

    const hourHand = new handObj("analog-hours", {
        parentDiv: analogFace, 
        LengthPer: 20, // 20-45
        handGapPer: 0, 
        divNum: 12 * 60
    }, "hourHand");

    return [secondHand, minuteHand, hourHand];
}


// 針のクラス
const handObj = function(className, {parentDiv: parentDiv
    , LengthPer: LengthPer, handGapPer: handGapPer, divNum: divNum}, type = null){
    const radius = parentDiv.clientHeight/2;
    const handLength = radius*LengthPer/100; // 針のメイン
    const handGap = radius*handGapPer/100; // 逆側に飛び出してる分

    const elm = addDiv(parentDiv, className);
    const firstTransition = "transform 0.5s ease-out"; // アニメーション

    elm.style.height = (handLength + handGap) + "px";
    [elm.style.top, elm.style.left] = [(radius - handLength) + "px", (radius - elm.clientWidth/2) + "px"];
    elm.style.transformOrigin = `center ${handLength}px`; // 回転の中心点を設定
    elm.style.transition = firstTransition; // 初期の回転アニメーション時間

    this.rotateText = [];
    const angle = 360/divNum; // 目盛りに合わせる
    const extend = (25/20)/(divNum*2); // 長さ変更用

    // 短針の場合は長さも時間経過で変える
    switch(type){
        case "hourHand":
            for(let i = 0 ; i < divNum*2 ; i++){
                this.rotateText.push(`rotate(${angle*i}deg) scale(1, ${1 + extend*i})`);
            }
            // let j = 0; // 24時間分やるために
            // for(let i = 0 ; i < divNum*2 ; i++){
            //     this.rotateText.push(`rotate(${angle*j}deg) scale(1, ${1 + extend*i})`);
            //     (j < divNum) ? j++: j = 0; // 12時間分終わったら角度はリセット
            // }
            break;
        
        case "secondHand":
        case "minuteHand":
            for(let i = 0 ; i < divNum ; i++){
                this.rotateText.push(`rotate(${angle*i}deg)`);
            }
            break;
        
        default:
            console.log("来たよ");
            break;
    }
    
    this.elm = elm;
    this.currentValue = null;

    this.transitionFlg = true;
    this.transitionCount = 0;
};

// 針を回転させる関数埋め込み
handObj.prototype.moveHand = function(val, hourCheck = 0){
    // 24時間表記に
    if(hourCheck >= 12) val = val + 12*60;

    // 現在時刻とすり合わせ
    if(this.currentValue === val) return;

    // 差がある場合
    // アニメーション削除
    if(this.transitionFlg && ++ this.transitionCount > 1) {
        this.elm.style.transition = ""; 
        this.transitionFlg=false;
    }

    this.currentValue = val; // 新しく今の時間を設定

    this.elm.style.transform = this.rotateText[val]; // 今の時間の位置まで回転
    console.log(this.elm.style.transform);
};

