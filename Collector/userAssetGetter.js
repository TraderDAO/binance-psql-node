import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";

const getBalance = async() => {
    try{
        return (await binanceClient.fetchBalance()).total;
    }catch(err){
        return console.log("ordersGetter err", err);
    }
}

export{
    getBalance
}