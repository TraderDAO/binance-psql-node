import { symbols } from "../Inputs/config.js";
import { ordersGetter } from "../Collector/ordersGetter.js";
import { dbInput, symbolLastUpdate, accountSetting } from "../Inputs/config.js";
import { timestampToDate } from "../utilities/timeNow.js";
import logger from "../logger.js";

const loadOrders = async (pool) => {
  try {
    for (let i = 0; i < symbols.length; i++) {
      // console.log(symbolLastUpdate);
      // console.log(symbolLastUpdate[`${symbols[i]}`]);
      // const symbolLastUpdateTime = await loadOrdersbySymbol( symbols[i], pool, symbolLastUpdate[`${symbols[i]}`]);
      await loadOrdersbySymbol(symbols[i], pool, undefined);
      // symbolLastUpdate[`${symbols[i]}`] = symbolLastUpdateTime;
      // console.log(symbolLastUpdate)
    }
    // console.log("Final", symbolLastUpdate);
  } catch (err) {
    logger.error(`[loadOrders] ${err}`);
    return console.log("loadOrders err", err);
  }
};

const loadOrdersbySymbol = async (market, pool, since) => {
  try {
    if (since != -1) {
      const ordersArr = await ordersGetter(market, since);
      if (ordersArr.length === 0) {
        return since;
      }
      if (since === ordersArr[ordersArr.length - 1].timestamp) {
        return since;
      }
      const newOrdersArr = ordersArr.filter((o) => o.timestamp != since); //In order to remove order which is created at the timestamp of since which had been written to DB
      // console.log(newOrdersArr);
      newOrdersArr.forEach((orderObj) => {
        const {
          info,
          clientOrderId,
          timestamp,
          symbol,
          reduceOnly,
          side,
          price,
          triggerPrice,
          amount,
          datetime,
          cost,
          filled,
          remaining,
          status: openStatus,
          fee,
          lastTradeTimestamp,
        } = orderObj;
        const {
          orderId,
          orderListId,
          origQty,
          executedQty,
          cummulativeQuoteQty,
          status: unfilledStatus,
          type,
        } = info;
        const feeString = JSON.stringify(fee);

        const queryString = `INSERT INTO ${dbInput.orderstable}(
          clientOrderId, orderId, orderListId, exchangeReceiveTime, exchangeReceiveTimestamp, datetime, lastTradeTime, lastTradeTimestamp, symbol, base, side, price, amount, type, origQty, executedQty, cummulativeQuoteQty, cost, remaining, filled, openStatus, unfilledStatus, fee, portfolio_id, account_id, exchange_id, key_id
        )VALUES(
          '${clientOrderId}', '${orderId}','${orderListId}', '${timestampToDate(
          timestamp
        )}','${timestamp}', '${datetime}','${timestampToDate(
          lastTradeTimestamp
        )}', '${lastTradeTimestamp}','${symbol.split("/")[0]}', '${
          symbol.split("/")[1]
        }', '${side}', '${price}', '${amount}', '${type}', '${origQty}', '${executedQty}', '${cummulativeQuoteQty}','${cost}','${remaining}', '${filled}', '${openStatus}', '${unfilledStatus}', '${feeString}', 
          '${accountSetting.portfolioId}', '${accountSetting.accountId}', '${
          accountSetting.exchangeId
        }', '${accountSetting.keyId}');`;
        pool.query(queryString, (err) => {
          if (err !== undefined) logger.error(`[loadorders] ${err}`);
        });
      });
      return ordersArr[ordersArr.length - 1].timestamp;
    }
    return since;
  } catch (err) {
    logger.error(`[loadOrdersbySymbol] ${err}`);
    return "loadOrdersbySymbol err" + err;
  }
};

export { loadOrders };
