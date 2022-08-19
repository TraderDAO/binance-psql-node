import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";

const priceGetter = async(market, timeframe) => {
    try{
        const ohlc = await binanceClient.fetchOHLCV(market, timeframe);
        // console.log(ohlc[ohlc.length - 2]); 
        const price = ohlc[ohlc.length - 2][4];
        const timestamp = ohlc[ohlc.length - 2][0];
    
        return {price, timestamp};
    }catch(err){
        return console.log("priceGetter err", err);
    }
}

// console.log(await priceGetter("BTC/BUSD"))

export{
    priceGetter
}