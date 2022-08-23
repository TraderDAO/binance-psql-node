import {symbols, symbolsForMarkPrice, symbolsForSettlementPrice} from '../Inputs/config.js';
import {dbInput, newBarInput} from "../Inputs/config.js";
import {binanceClient} from "../ExchangeSetting/exchangeConfig.js";
import { receiveTimestamp, receiveTime, timestampToDate } from '../utilities/timeNow.js';
import { isNewBar, barInit } from '../utilities/isNewBar.js';

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
    const queryString = `INSERT INTO ${tableName}(symbol, price, datetime, timestamp, receivetime, receiveTimestamp
      )VALUES('${symbol}', '${price}', '${datetime}', '${timestamp}', '${receiveTime}', '${receiveTimestamp}');`;
  pool.query( queryString, (err) => { 
    console.log("loadPrice err:", err);
  });
  })
}

const loadSettlementPrice = async (pool) => {
  if(await isNewBar( newBarInput.market, newBarInput.timeframe)){
    loadPrice(pool, dbInput.settlementPriceTimeframe, dbInput.settlementPriceTable)
  }
}

const loadPrice = async (pool, timeframe, tableName) => {
  try{
    let arrOfSymbolPromise = symbolsForSettlementPrice.map(symbol=>{
      return binanceClient.fetchOHLCV(symbol, timeframe);
    })
    const priceResults = await Promise.all(arrOfSymbolPromise);
    priceResults.forEach((ohlc, index)=>{
      const price = ohlc[ohlc.length - 2][4];
      const time = ohlc[ohlc.length - 2][0];
      const market = symbols[index];
      const datetime = timestampToDate(time);
      const queryString = `INSERT INTO ${tableName}(symbol, price, timestamp, datetime, receivetime, receivetimestamp
        )VALUES('${market}', '${price}', '${time}', '${datetime}', '${receiveTime}', '${receiveTimestamp}');`;
    pool.query( queryString, (err) => {
      console.log("loadPrice err:", err);
    });
    })
  } catch (err) {
    return console.log("loadPrice err", err);
  }
}

export{
  loadMarkPrice,
  loadSettlementPrice
}