import {symbols} from '../Inputs/config.js';
import {ordersGetter} from '../Collector/ordersGetter.js';
import {dbInput, symbolLastUpdate, accountSetting} from '../Inputs/config.js';
import {timestampToDate} from "../utilities/timeNow.js"
import logger from '../logger.js';

const loadOrders = async (pool) => {
  try {
    for (let i = 0; i < symbols.length; i++) {
      // console.log(symbolLastUpdate)
      // console.log(symbolLastUpdate[`${symbols[i]}`])
      const symbolLastUpdateTime = await loadOrdersbySymbol(symbols[i], pool, symbolLastUpdate[`${symbols[i]}`]);
      symbolLastUpdate[`${symbols[i]}`] = symbolLastUpdateTime;
      // console.log(symbolLastUpdate)
    }
  } catch (err) {
    logger.error(`[loadOrders] ${err}`);
    return console.log('loadOrders err', err);
  }
};

const loadOrdersbySymbol = async (market, pool, since) => {
  try {
    const ordersArr = await ordersGetter(market, since);
    if (ordersArr.length === 0){ return since;}
    if (since === ordersArr[ordersArr.length - 1].timestamp) { return since;}
    const newOrdersArr = ordersArr.filter(o => o.timestamp != since);  //In order to remove order which is created at the timestamp of since which had been written to DB
    newOrdersArr.forEach( (orderObj) => {
      const {info, timestamp, symbol, side, price, amount, cost, filled, remaining, status: openStatus, datetime} = orderObj;
      const {orderId, status: unfilledStatus, type} = info;
      const queryString = `INSERT INTO ${dbInput.orderstable}(
        time, datetime, orderId, symbol, base, side, price, amount, cost, executedQty, remaining, type, openStatus, unfilledStatus, portfolio_id, account_id, exchange_id
        )VALUES(
        '${timestamp}', '${timestampToDate(datetime)}', '${orderId}', '${symbol.split('/')[0]}', '${symbol.split('/')[1]}', '${side}', '${price}', '${amount}', '${cost}', '${filled}', '${remaining}', '${type}', '${openStatus}', '${unfilledStatus}', '${accountSetting.portfolioId}', '${accountSetting.accountId}', '${accountSetting.exchangeId}');`;
      pool.query( queryString, (err) => {
        if(err !== undefined) logger.error(`[loadorders] ${err}`);
      });
    });
    return ordersArr[ordersArr.length - 1].timestamp;
  } catch (err) {
    logger.error(`[loadOrdersbySymbol] ${err}`);
    return 'loadOrdersbySymbol err' + err;
  }
};

export {
  loadOrders,
};
