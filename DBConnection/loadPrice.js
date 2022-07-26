import { queryStringData } from "../Generator/queryStringGenerator.js";
import { symbols } from "../Inputs/config.js";
// import { initDB } from "./initPool.js";

const loadLastBarClosedPrice = async(pool) => {
    for(let i = 0; i < symbols.length; i++){
        const {queryString} = await queryStringData(symbols[i]);
        // console.log(queryString);
        await pool.query( queryString,(res,err) => {
            if(res){
                console.log("success")
            }else{
                console.log(err);
            }
            }
        );
    }
} 

// loadPrice(initDB())

export{
    loadLastBarClosedPrice,
}