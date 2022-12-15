import {
  symbols,
  symbolsForMarkPrice,
  symbolsForSettlementPrice,
} from "../Inputs/config.js";
import { dbInput, newBarInput } from "../Inputs/config.js";
import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import {
  receiveTimestamp,
  receiveTime,
  timestampToDate,
  utcNow,
} from "../utilities/timeNow.js";
import { isNewBar, barInit } from "../utilities/isNewBar.js";
import logger from "../logger.js";

const loadMarkPrice = (pool) => {
  // console.log("inside loadMarkPrice")
  loadTrade(pool, dbInput.markPriceTable);
};

const loadTrade = async (pool, tableName) => {
  console.log("symbolsForMarkPrice", symbolsForMarkPrice);
  let arrOfSymbolPromise = symbolsForMarkPrice.map((symbol) => {
    return binanceClient.fetchTrades(symbol);
  });
  const priceResults = await Promise.all(arrOfSymbolPromise);
  priceResults.forEach((lastTrade) => {
    const { price, timestamp, datetime, symbol } =
      lastTrade[lastTrade.length - 1];
    const queryString = `INSERT INTO ${tableName}(symbol, price, datetime, timestamp, receivetime, receiveTimestamp
      )VALUES('${symbol}', '${price}', '${timestampToDate(
      datetime
    )}', '${timestamp}', '${receiveTime()}', '${receiveTimestamp()}');`;
    logger.debug("queryString:" + queryString);
    pool.query(queryString, (err) => {
      if (err !== undefined) logger.error(`[loadPrice] ${err}`);
    });
  });
};

const loadSettlementPrice = async (pool, client) => {
  console.log("inside loadSettlementPrice");
  const query = `select max(timestamp) from ${dbInput.settlementPriceTable}`;
  const res = await client.query(query);
  const lastSettlementTime = res.rows[0].max; //Data Type after query: lastSettlementTime [ { max: '1661299200000' } ]
  if (lastSettlementTime == null) {
    return loadPrice(
      pool,
      dbInput.settlementPriceTimeframe,
      dbInput.settlementPriceTable
    );
  }
  // await client.end()
  // console.log('lastSettlementTime', lastSettlementTime)
  // console.log('timeNow', utcNow())
  let utcToday = utcNow();
  // console.log(utcToday != lastSettlementTime)
  if (
    utcToday != lastSettlementTime &&
    (await isNewBar(newBarInput.market, newBarInput.timeframe))
  ) {
    loadPrice(
      pool,
      dbInput.settlementPriceTimeframe,
      dbInput.settlementPriceTable
    );
  }
};

const loadPrice = async (pool, timeframe, tableName) => {
  try {
    console.log("symbolsForSettlementPrice", symbolsForSettlementPrice);
    let arrOfSymbolPromise = symbolsForSettlementPrice.map((symbol) => {
      return binanceClient.fetchOHLCV(symbol, timeframe);
    });
    const priceResults = await Promise.all(arrOfSymbolPromise);
    priceResults.forEach((ohlc, index) => {
      const price = ohlc[ohlc.length - 1][1];
      const time = ohlc[ohlc.length - 1][0];
      const market = symbolsForSettlementPrice[index];
      const dt = timestampToDate(time);
      const queryString = `INSERT INTO ${tableName}(symbol, price, timestamp, datetime, receivetime, receivetimestamp
        )VALUES('${market}', '${price}', '${time}', '${dt}', '${receiveTime()}', '${receiveTimestamp()}');`;
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadPrice/pool.query] ${err}`);
      });
    });
  } catch (err) {
    logger.error(`[loadPrice/catch] ${err}`);
    return "loadPrice err" + err;
  }
};

export { loadMarkPrice, loadSettlementPrice };
