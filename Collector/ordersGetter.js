import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import logger from '../logger.js';

const ordersGetter = async(market, since) => {
    try{
        const pastOrders = await binanceClient.fetchOrders(market, since);
        return pastOrders.filter(o=>o);
    }catch(err){
        logger.error(`[ordersGetter] ${err}`);
        logger.info(`[ordersGetter] since: ${since}`)
        logger.info(`[ordersGetter] market: ${market}`)
        return console.log("ordersGetter err", err);
    }
}
export{
    ordersGetter
}