import {symbols} from '../Inputs/config.js';
import {ordersGetter} from '../Collector/ordersGetter.js';
import {dbInput, symbolLastUpdate} from '../Inputs/config.js';

const loadOrders = async (pool) => {
  try {
    for (let i = 0; i < symbols.length; i++) {
      const symbolLastUpdateTime = await loadOrdersbySymbol(symbols[i], pool, symbolLastUpdate[`${symbols[i]}`]);
      symbolLastUpdate[`${symbols[i]}`] = symbolLastUpdateTime;
      // console.log(symbolLastUpdate)
    }
  } catch (err) {
    return console.log('loadOrders err', err);
  }
};

const loadOrdersbySymbol = async (market, pool, since) => {
  try {
    const ordersArr = await ordersGetter(market, since);
    if (since === ordersArr[ordersArr.length - 1].timestamp) {
      return since;
    }
    const newOrdersArr = ordersArr.filter(o => o.timestamp != since);
    // console.log(rel);
    newOrdersArr.forEach( (orderObj) => {
      const {info, timestamp, symbol, side, price, amount,
        cost, filled, remaining, status: openStatus} = orderObj;

      const {orderId, status: unfilledStatus, type} = info;

      const queryString = `INSERT INTO ${dbInput.orderstable}(
        time, orderId, symbol, base, side, price, amount, cost, executedQty, remaining, type, openStatus, unfilledStatus
        )VALUES(
        '${timestamp}','${orderId}', '${symbol.split('/')[0]}', '${symbol.split('/')[1]}', '${side}', '${price}', '${amount}', '${cost}', '${filled}', '${remaining}', '${type}', '${openStatus}', '${unfilledStatus}');`;

      pool.query( queryString, (err) => {
        console.log('load orders err:', err);
      });
      //  console.log(queryString);
    });
    return ordersArr[ordersArr.length - 1].timestamp;
  } catch (err) {
    return console.log('loadOrdersbySymbol err', err);
  }
};

export {
  loadOrders,
};
