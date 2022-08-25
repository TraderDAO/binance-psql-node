import {binanceClient} from '../ExchangeSetting/exchangeConfig.js';
import logger from '../logger.js';

const barNow = [0];

const barInit = async(market, timeframe) => {
  const ohlc = await binanceClient.fetchOHLCV(market, timeframe, undefined, 3);
  barNow.push(ohlc[ohlc.length - 3][4]);
  barNow.shift();
  logger.info(`barInit: ${barNow}`);
}

const isNewBar = async (market, timeframe) => {
  try {
    const ohlc = await binanceClient.fetchOHLCV(market, timeframe, undefined, 2);
    if (barNow[barNow.length - 1] != ohlc[ohlc.length - 2][4]) {
      barNow.push(ohlc[ohlc.length - 2][4]);
      barNow.shift();
      // console.log('new bar:', barNow);
      return true;
    }
    // console.log("same bar", barNow);
    return false;
  } catch (err) {
    logger.error(`isNewBar: ${err}`);
    return console.log('isNewBar err', err);
  }
};

// setInterval(() => {
//     isNewBar("BTC/BUSD", "1d")
// }, 6000);

export {
  isNewBar,
  barInit
};

