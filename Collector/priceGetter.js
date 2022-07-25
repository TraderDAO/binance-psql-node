import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";

const priceGetter = async(market, exchange) => {
    if(exchange == "binance"){
        const marketPrice = await binanceClient.fetchTicker(market);
        // console.log(marketPrice); 
        const price = marketPrice.info.lastPrice;
        const timestamp = marketPrice.info.closeTime;
        return {timestamp, price};
    }else{
        console.log("exchange not supported")
    }
}

// console.log(await priceGetter("BTC/BUSD","binance"))

export{
    priceGetter
}