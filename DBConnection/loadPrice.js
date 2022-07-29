import { queryStringData } from "../Generator/queryStringGenerator.js";
import { symbols } from "../Inputs/config.js";
// import { initDB } from "./initPool.js";

const loadLastBarClosedPrice = async(pool) => {
    try{
        // Load Last Bar Closed Price by Symbol
        for(let i = 0; i < symbols.length; i++){
            const {queryString, timestamp, symbol, price} = await queryStringData(symbols[i]);
            // console.log(queryString);
            await pool.query( queryString,(err) => {
                console.log({timestamp, symbol, price})
                // console.log("err:", err);
            });
        }
    }catch(err){
        return console.log("loadLastBarClosedPrice err", err);
    }
} 

// loadPrice(initDB())

export{
    loadLastBarClosedPrice,
}