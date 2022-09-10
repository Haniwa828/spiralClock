// 円と文字盤作成
const createFace = () => {
    const analogFace = circle();
    const originX = scale(analogFace);
    minNums(analogFace, originX);
    addDiv(analogFace ,  "analog-center"); // 中心点

    return analogFace;
};


// 円作成
const circle = () =>{
    const analog = document.getElementById("analog");
    const screenSize = [analog.clientWidth, analog.clientHeight];
    const diameter = Math.min(...screenSize); // "..."は配列を入れるときに使う

    // analogFace自身がhtml要素になる
    const analogFace = addDiv(analog, "analog-face", (t)=>{ // analog-faceクラス付与
        [t.style.height, t.style.width] = [diameter + "px", diameter + "px"];
        [t.style.top, t.style.left] = [(screenSize[1]-diameter)/2 + "px", (screenSize[0]-diameter)/2 + "px"]; // 中央寄せ
    });
    
    uzumaki(analogFace);

    return analogFace;
}

// 目盛り打刻
const scale = (analogFace) => {
    const r60 = 360 / 60; // 60個の打刻ポイント
    const originX = analogFace.clientWidth/2; // style.widthではズレるため

    for(let i = 0 ; i < 60 ; i++){
        const deg = i * r60;

        // 5の倍数ならanalog-line1
        addDiv(analogFace , i%5 === 0 ? "analog-line1" : "analog-line2", 
            (t)=>{
                // 円の中心を基準に回転
                if(i > 0){
                    t.style.transformOrigin = `${originX}px center`; // 基準点を円の中心に
                    t.style.transform = `rotate(${deg}deg)`; // 回転
                }
        });
    }

    return originX;
}

// 分針用の数字打刻
const minNums = (analogFace, originX) => {
    const r12 = 360 / 12; // 12個の打刻ポイント
    const radius = originX;
    const mojiPos = radius -25 ; // 内側に寄せる
    const radian = Math.PI / 180;

    for(let i = 0 ; i < 12 ; i++){
        const deg = i * r12;
        addDiv(analogFace , "scale-text", 
            (t) =>{
                const mojiX = radius + mojiPos * Math.sin(deg * radian);
                const mojiY = radius - mojiPos * Math.cos(deg * radian);
                [t.style.top, t.style.left] = [mojiY + "px", mojiX + "px"];
                t.innerText = i === 0 ? "60" : (i*5).toString(); // 5-60に修正
            });
    }
}

// 時針用渦巻
const uzumaki = (element, rotation = 2.76, width = 3, diameter = 0.7, direction = 1, color = "#000000") => {
    //渦巻きを作る div にスタイルをあてる
    var elm = document.createElement("div");
    elm.style.width = width + "px";
    elm.style.height = width + "px";
    elm.style.backgroundColor = color;
    elm.style.position = "absolute";
    elm.style.borderRadius = "50%";

    // 文字を入れるための空白パート
    var blankElm = document.createElement("div");
    blankElm.style.width = width + "px";
    blankElm.style.height = width + "px";
    blankElm.style.backgroundColor = "#ffffff";
    blankElm.style.position = "absolute";
    blankElm.style.borderRadius = "50%";
    blankElm.style.opacity= 0; // 透明度

    //度数とラジアンの変換処理定数
    var p = 2*Math.PI/360;

    //渦の回転数分 for で繰り返し処理
    let j = 0;
    for (var i = 0; i < (rotation + 1)*360; i++) {
        switch(true){
            case i%30 == 0 && i >= 1.75*360:
                // 時針用文字
                addDiv(element , "spiral-text", 
                    (t) =>{
                        const mojiX = direction*diameter*i/10*Math.sin(i*p + Math.PI/2);
                        const mojiY = diameter*i/10*Math.cos(i*p + Math.PI/2);
                        [t.style.top, t.style.left] = ["calc(50% + " + mojiY*(-1) + "px", "calc(50% + " + mojiX + "px"];
                        t.innerText = j.toString(); // 5-60に修正
                    });
                    j++;

            case i < 1.75*360:
            case i%30 <=9:
            case i%30 > 21:
                var elmClone = blankElm.cloneNode();
                break;
            
            case i >= 1.75*360:
                var elmClone = elm.cloneNode();
                break;
            
            default:
                console.log("来たよ");
                break;
        }
        // var elmClone = elm.cloneNode();
        elmClone.style.top = "calc(50% + " + direction * diameter * i / 10 * Math.sin(i * p) + "px)";
        elmClone.style.left = "calc(50% + " + diameter * i / 10 * Math.cos(i * p) + "px)";
        element.appendChild(elmClone);

    };
};