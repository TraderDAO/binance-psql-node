import {symbols, symbolsForMarkPrice} from '../Inputs/config.js';
import {dbInput} from "../Inputs/config.js";
import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";
import date from 'date-and-time';

const loadIncomingPrice = (pool) => {
  loadPrice(pool, dbInput.incomingPriceTimeframe, dbInput.incomingPriceTable)
}

const loadMarkPrice = (pool) => {
  loadTrade(pool, dbInput.markPriceTable)
}
 
const loadTrade = async (pool, tableName) => {
  let arrOfSymbolPromise = symbolsForMarkPrice.map(symbol=>{
    return binanceClient.fetchTrades(symbol);
  })
  const priceResults = await Promise.all(arrOfSymbolPromise);
  priceResults.forEach((lastTrade)=>{
    const {price, timestamp, datetime ,symbol} = lastTrade[lastTrade.length - 1];
    const now = new Date();
    const receiveTimestamp = now.getTime();
    const receiveTime = date.format(now, 'YYYY/MM/DD HH:mm:SSS', true);
    const queryString = `INSERT INTO ${tableName}(symbol, price, datetime, timestamp, receivetime, receiveTimestamp
      )VALUES('${symbol}', '${price}', '${datetime}', '${timestamp}', '${receiveTime}', '${receiveTimestamp}');`;
  pool.query( queryString, (err) => { 
    console.log("loadPrice err:", err);
  });
  })
}

const loadPrice = async (pool, timeframe, tableName) => {
  try{
    let arrOfSymbolPromise = symbols.map(symbol=>{
      return binanceClient.fetchOHLCV(symbol, timeframe);
    })
    console.log(arrOfSymbolPromise)
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