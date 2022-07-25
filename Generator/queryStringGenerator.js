import { priceGetter } from "../Collector/priceGetter.js";
import { dbInputs } from "../Inputs/config.js";


const queryStringData = async(market, exchange) => {
    const {timestamp, price} = await priceGetter(market, exchange);
  
    let queryString = `INSERT INTO ${dbInputs.tableName}(
        ${dbInputs.param1}, ${dbInputs.param2})VALUES(
            ${timestamp}, ${price});`;
    
    return {queryString, timestamp, price};
}

// console.log(await queryStringData("BTC/BUSD", "binance"))


export{
    queryStringData,
}