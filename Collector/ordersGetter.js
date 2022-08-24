import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";

const ordersGetter = async(market, since) => {
    try{
        const pastOrders = await binanceClient.fetchOrders(market, since);
        return pastOrders.filter(o=>o);
    }catch(err){
        return console.log("ordersGetter err", err);
    }
}
export{
    ordersGetter
}