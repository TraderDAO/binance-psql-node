import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";
import {tradingInputs} from "../Inputs/config.js"

let barNow = [0];

const isNewBar = async (market, timeframe) => {
        const ohlc = await binanceClient.fetchOHLCV(market, timeframe, undefined, 1);
    
        if(barNow[barNow.length - 1] != ohlc[0][1]){
            barNow.push(ohlc[0][1]);
            barNow.shift();
            console.log("new bar:", barNow);
            return true;
        }else{
            // console.log("same bar", barNow);
            return false;
        }
}

export{
    isNewBar,
}

