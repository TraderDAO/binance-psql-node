import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";

const checkOpenOrder = async (client, pool) => {
  const query = `select * from dbt_traderdao.orderstable where unfilledstatus = 'NEW'`
  
  const res = await client.query(query)
  const openOrders = res.rows
  await client.end()

  const arrOfOrders = openOrders.map((order) => {
    let id = order.orderid;
    let quote = order.symbol;
    let baseCurrency = order.base;
    let symbol = quote.concat("/", baseCurrency);
    return binanceClient.fetchOrder(id, symbol)
  })

  const orderRes = await Promise.all(arrOfOrders);

  orderRes.forEach((order) =>{
    const { info, remaining, cost } = order;
    const { executedQty, status: unfilledStatus, orderId } = info;
    const queryString = `
    UPDATE dbt_traderdao.orderstable
    SET cost = '${cost}', executedqty = '${executedQty}', remaining = '${remaining}', unfilledstatus = '${unfilledStatus}'
    WHERE orderid = '${orderId}'
    `
    pool.query(queryString, (err) => {
      console.log(err)
    })
  })
}



export { checkOpenOrder }