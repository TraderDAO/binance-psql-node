import { ordersStringData } from "../Generator/ordersStringGenerator.js";
import { symbols } from "../Inputs/config.js";

const loadPastOrders = async(pool) => {
    for(let i = 0; i < symbols.length; i++){
        const loadOrders = await ordersStringData(symbols[i], pool);
        console.log(loadOrders);
        // console.log(queryString);
        // await pool.query( queryString,(err) => {
            // console.log({timestamp, symbol, price})
        //     console.log("err:", err);
        // });
    }
} 


export{
    loadPastOrders,
}