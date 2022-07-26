import { queryStringData } from "../Generator/queryStringGenerator.js";
import { symbols } from "../Inputs/config.js";
// import { initDB } from "./initPool.js";

const loadLastBarClosedPrice = async(pool) => {
    for(let i = 0; i < symbols.length; i++){
        const {queryString, timestamp, symbol, price} = await queryStringData(symbols[i]);
        // console.log(queryString);
        await pool.query( queryString,(err) => {
            console.log({timestamp, symbol, price})
            // console.log("err:", err);
        });
    }
} 

// loadPrice(initDB())

export{
    loadLastBarClosedPrice,
}