import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";
import { tradingInputs } from "../Inputs/config.js";

const priceGetter = async(market) => {
    try{
        const ohlc = await binanceClient.fetchOHLCV(market, tradingInputs.timeframe);
        // console.log(ohlc[ohlc.length - 2]); 
        const price = ohlc[ohlc.length - 2][4];
    
        return {price};
    }catch(err){
        return console.log("priceGetter err", err);
    }
}

console.log(await priceGetter("BTC/BUSD"))

export{
    priceGetter
}