// ロード直後に関数設置
(()=>{  
    // 針の設置と更新
    window.addEventListener("DOMContentLoaded", () => {
        const analogFace = createFace();
        const [secondHand, minuteHand, hourHand] = handSet(analogFace);
        // const date = new Date();
        // date.setHours(Number(23));
        // date.setMinutes(Number(59));
        // console.log(date)
 
        // 0.5秒毎の更新
        setInterval(()=> {
            const date = new Date();
            secondHand.moveHand(date.getSeconds());
            minuteHand.moveHand(date.getMinutes());
            hourHand.moveHand((date.getHours()%12) * 60 + date.getMinutes(), date.getHours());
            // hourHand.moveHand((date.getHours()%12) * 60 + date.getMinutes());
        }, 500);
    });

    // オプションの設置と更新
    window.addEventListener("DOMContentLoaded", () => {
        createOption();
    }, false); // falseをつけることで最初の実行を阻止
})();