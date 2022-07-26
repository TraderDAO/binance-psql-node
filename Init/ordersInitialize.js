import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";

const ordersInit = async(market) => {
    const pastOrders = await binanceClient.fetchOrders(market);
    // console.log(pastOrders);
    return pastOrders;
}

// console.log(await ordersInit("BTC/BUSD"))

export{
    ordersInit
}