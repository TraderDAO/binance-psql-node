import { priceGetter } from "../Collector/priceGetter.js";
import { dbInputs } from "../Inputs/config.js";
import { getCurrentTime } from "../utilities/getCurrentTime.js";

const queryStringData = async(market) => {
    try{
        const time = getCurrentTime();
        const symbol = await market;
        const {price} = await priceGetter(market);
    
        let queryString = `INSERT INTO ${dbInputs.tableName}(timestamp, symbol, price
            )VALUES('${time}', '${symbol}', '${price}');`;
        
         return{queryString, time, symbol, price};
    }catch(err){
        return console.log("queryStringData err", err);
    }
}

// console.log(await queryStringData("BTC/BUSD"))


export{
    queryStringData,
}