import { queryStringData } from "../Generator/queryStringGenerator.js";

const loadPrice = async(market, exchange, pool) => {
    const {queryString, timestamp, price} = await queryStringData(market, exchange);
    // console.log(queryString);
    pool.query( queryString,(err, res) => {
        // console.log(err, res);
        }
    );
    return {timestamp, price};
}

export{
    loadPrice,
}