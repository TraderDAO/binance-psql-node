import { ordersInit } from "../Init/ordersInitialize.js";
import { dbInputs } from "../Inputs/config.js";

const ordersStringData = async(market, pool) => {
    const postOrdersArr = await ordersInit(market);
    for(let i = 0; i < postOrdersArr.length; i++){
        let { info, datetime, symbol, side, price, amount, cost, filled, origQty, remaining, status, fee} = await postOrdersArr[i];
        // console.log(datetime, symbol, side, price, amount, cost, filled, origQty, remaining, status, fee)
        let {orderId, status:status2, type} = await info;
        // console.log(orderId, type, status2)
        let queryString = await `INSERT INTO ${dbInputs.orderstable}(
            time, orderId, symbol, side, price, amount, cost, executedQty, remaining, type, status, status2
            )VALUES(
            '${datetime}','${orderId}', '${symbol}', '${side}', '${price}', '${amount}', '${cost}', '${filled}', '${remaining}', '${type}', '${status}', '${status2}');`;
        
        await pool.query( queryString,(err) => {
                // console.log({timestamp, symbol, price})
                // console.log("err:", err);
            });
         
    }
    return ` ${market} loaded`;
    
}


export{
    ordersStringData,
}