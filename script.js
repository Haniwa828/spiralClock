// 多分常時発動ってこと
(()=>{  
    window.addEventListener("DOMContentLoaded", () => {
        const analogFace = createFace();
        const [secondHand, minuteHand, hourHand] = handSet(analogFace);
        // const date = new Date();
        // date.setHours(Number(12));
        // date.setMinutes(Number(1));
        // console.log(date)
 
        // 1秒毎の更新
        setInterval(()=> {
            const date = new Date();
            secondHand.moveHand(date.getSeconds());
            minuteHand.moveHand(date.getMinutes());
            hourHand.moveHand((date.getHours()%12) * 60 + date.getMinutes(), date.getHours());
            // hourHand.moveHand((date.getHours()%12) * 60 + date.getMinutes());
        }, 1000);
    });
})();
 