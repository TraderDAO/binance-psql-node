import { ordersGetter } from "../Collector/ordersGetter.js";
import { dbInputs } from "../Inputs/config.js";

const loadPastOrdersbySymbol = async(market, pool, since) => {
    try{
        // Get Past Orders' Array
        const pastOrdersArr = await ordersGetter(market, since);
        
        for(let i = 0; i < pastOrdersArr.length; i++){
            let { info, datetime, symbol, side, price, amount, cost, filled, origQty, remaining, status, fee} = pastOrdersArr[i];
            // console.log(datetime, symbol, side, price, amount, cost, filled, origQty, remaining, status, fee)
            let {orderId, status:status2, type} = await info;
            // console.log(orderId, type, status2)
            let queryString = `INSERT INTO ${dbInputs.orderstable}(
                time, orderId, symbol, side, price, amount, cost, executedQty, remaining, type, status, status2
                )VALUES(
                '${datetime}','${orderId}', '${symbol}', '${side}', '${price}', '${amount}', '${cost}', '${filled}', '${remaining}', '${type}', '${status}', '${status2}');`;
            
            await pool.query( queryString,(err) => {
                    // console.log("err:", err);
                });
        }
        console.log(` ${market} loaded`);
        console.log("Orders added Amount:", pastOrdersArr.length);
        return true;
    }catch(err){
        return console.log("loadPastOrdersbySymbol err", err);
    }
}


export{
    loadPastOrdersbySymbol,
}