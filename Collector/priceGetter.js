import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";
import { tradingInputs } from "../Inputs/config.js";

const priceGetter = async(market) => {
        const ohlc = await binanceClient.fetchOHLCV(market, tradingInputs.timeframe);
        // console.log(marketPrice); 
        const price = ohlc[ohlc.length - 2][4]
    
        return {price};

}

// console.log(await priceGetter("BTC/BUSD"))

export{
    priceGetter
}