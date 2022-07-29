import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";

const ordersGetter = async(market) => {
    try{
        const pastOrders = await binanceClient.fetchOrders(market);
        // console.log(pastOrders);
        return pastOrders;
    }catch(err){
        return console.log("ordersGetter err", err);
    }
}

// console.log(await ordersInit("BTC/BUSD"))

export{
    ordersGetter
}