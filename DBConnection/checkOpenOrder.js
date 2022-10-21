import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import { dbInput } from "../Inputs/config.js";

const checkOpenOrder = async (client, pool) => {
  const query = `select * from ${dbInput.orderstable} where unfilledstatus = 'NEW' or unfilledstatus = 'PARTIALLY_FILLED'`
  const res = await client.query(query)
  const openOrders = res.rows
  // await client.end()
  // console.log('openOrders', openOrders)

  const arrOfOrders = openOrders.map((order) => {
    let id = order.orderid;
    let quote = order.symbol;
    let baseCurrency = order.base;
    let symbol = quote.concat("/", baseCurrency);
    return binanceClient.fetchOrder(id, symbol)
  })

  const orderRes = await Promise.all(arrOfOrders);

  // console.log('orderRes', orderRes)

  orderRes.forEach((order) =>{
    const { info, remaining, cost, status: openStatus } = order;
    const { executedQty, status: unfilledStatus, orderId, updateTime } = info;
    const queryString = `
    UPDATE ${dbInput.orderstable}
    SET time = '${updateTime}', cost = '${cost}', executedqty = '${executedQty}', remaining = '${remaining}', unfilledstatus = '${unfilledStatus}', openstatus = '${openStatus}'
    WHERE orderid = '${orderId}'
    `
    // console.log('queryString', queryString);
    pool.query(queryString, (err) => {
      if(err !== undefined) logger.error(`[loadorders] ${err}`);
    })
  })
}



export { checkOpenOrder }