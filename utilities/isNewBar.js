import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";

let barNow = [0];

const isNewBar = async (market, timeframe) => {
        try{
            const ohlc = await binanceClient.fetchOHLCV(market, timeframe, undefined, 2);

            if(barNow[barNow.length - 1] != ohlc[0][1]){
                barNow.push(ohlc[0][1]);
                barNow.shift();
                console.log("new bar:", barNow);
                const barInfo = {};
                barInfo.isNewBar = true;
                barInfo.timestamp = ohlc[0][0];
                return barInfo;
            }else{
                // console.log("same bar", barNow);
                return false;
            }
        }catch(err){
            return console.log("isNewBar err", err);
        }
}

// setInterval(() => {
//     isNewBar("BTC/BUSD", "1m")
// }, 6000);

export{
    isNewBar,
}

