import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";

const ordersGetter = async(market, since) => {
    try{
        const pastOrders = await binanceClient.fetchOrders(market, since);
        // console.log(pastOrders);
        return pastOrders.filter(o=>o);
    }catch(err){
        return console.log("ordersGetter err", err);
    }
}

// console.log(await ordersInit("BTC/BUSD"))

export{
    ordersGetter
}