import {symbols} from '../Inputs/config.js';
import {dbInput} from "../Inputs/config.js";
import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";

const loadIncomingPrice = async (pool) => {
  loadPrice(pool, dbInput.incomingPriceTimeframe, dbInput.incomingPriceTable)
} 

const loadMarkPrice = async (pool) => {
  loadPrice(pool, dbInput.markPriceTimeframe, dbInput.markPriceTable)
}

const loadPrice = async (pool, timeframe, tableName) => {
  try{
    let arrOfSymbolPromise = symbols.map(symbol=>{
      return binanceClient.fetchOHLCV(symbol, timeframe);
    })
    const priceResults = await Promise.all(arrOfSymbolPromise);
    priceResults.forEach((ohlc, index)=>{
      const price = ohlc[ohlc.length - 2][4];
      const time = ohlc[ohlc.length - 2][0];
      const market = symbols[index];
      const queryString = `INSERT INTO ${tableName}(timestamp, symbol, price
        )VALUES('${time}', '${market}', '${price}');`;
    pool.query( queryString, (err) => {
      console.log("loadPrice err:", err);
    });
    })
  } catch (err) {
    return console.log("loadIncomingPrice err", err);
  }
}

export{
  loadMarkPrice,
  loadIncomingPrice
}