import { priceGetter } from "../Collector/priceGetter.js";
import { dbInputs } from "../Inputs/config.js";
import { getCurrentTime } from "../utilities/getCurrentTime.js";

const queryStringData = async(market) => {
    
    const timestamp = getCurrentTime();
    const symbol = await market;
    const {price} = await priceGetter(market);

    let queryString = `INSERT INTO ${dbInputs.tableName}(timestamp, symbol, price
        )VALUES('${timestamp}', '${symbol}', '${price}');`;
    
     return{queryString};
}

// console.log(await queryStringData("BTC/BUSD"))


export{
    queryStringData,
}