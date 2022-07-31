import {symbols} from '../Inputs/config.js';
import { priceGetter } from "../Collector/priceGetter.js";
import { dbInput } from "../Inputs/config.js";

const loadMarkPrice = async (pool) => {
  try{
    for(let i = 0; i < symbols.length; i++){
      await loadMarkPricebySymbol(symbols[i], pool);
    }
  } catch (err) {
    return console.log("loadMarkPrice err", err);
  }
} 

const loadMarkPricebySymbol = async (market, pool) => {
  try{
    const {price, timestamp: time} = await priceGetter(market);
    
    const queryString = `INSERT INTO ${dbInput.markPriceTable}(timestamp, symbol, price
        )VALUES('${time}', '${market}', '${price}');`;
    
    pool.query( queryString, (err) => {
      console.log("load mark price err:", err);
    });
    // console.log(queryString);
  } catch (err) {
    return console.log('loadMarkPricebySymbol err', err);
  }
}

export{
    loadMarkPrice,
}