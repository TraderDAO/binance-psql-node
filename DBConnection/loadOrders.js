import {symbols} from '../Inputs/config.js';
import {ordersGetter} from '../Collector/ordersGetter.js';
import {dbInput} from '../Inputs/config.js';


const loadOrders = async (pool, since) => {
  try {
    for (let i = 0; i < symbols.length; i++) {
      await loadOrdersbySymbol(symbols[i], pool, since);
    }
  } catch (err) {
    return console.log('loadOrders err', err);
  }
};

const loadOrdersbySymbol = async (market, pool, since) => {
  try {
    const ordersArr = await ordersGetter(market, since);
    // console.log(ordersArr);
    ordersArr.forEach( (orderObj) => {
      const {info, datetime, symbol, side, price, amount,
        cost, filled, remaining, openStatus} = orderObj;

      const {orderId, status: unfilledStatus, type} = info;

      const queryString = `INSERT INTO ${dbInput.orderstable}(
        time, orderId, symbol, side, price, amount, cost, executedQty, remaining, type, openStatus, unfilledStatus
        )VALUES(
        '${datetime}','${orderId}', '${symbol}', '${side}', '${price}', '${amount}', '${cost}', '${filled}', '${remaining}', '${type}', '${openStatus}', '${unfilledStatus}');`;

      pool.query( queryString, (err) => {
        console.log("load orders err:", err);
      });
      // console.log(queryString);
    });
  } catch (err) {
    return console.log('loadOrdersbySymbol err', err);
  }
};

const loadNewOrders = (pool, since) => {
  loadOrders(pool, since);
};

export {
  loadOrders,
  loadNewOrders,
};
