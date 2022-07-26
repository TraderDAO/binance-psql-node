import 'dotenv/config'
import { tradingInputs, symbols } from "./Inputs/config.js";
import { dbInputs } from './Inputs/config.js';
import { initDB } from './DBConnection/initPool.js';
import { loadLastBarClosedPrice } from './DBConnection/loadPrice.js';
import { isNewBar } from './utilities/isNewBar.js';
import { loadPastOrders } from './DBConnection/loadInitOrders.js';

const run = async() =>{
    const pool = initDB();

    const pastOrders = await loadPastOrders(pool)
   
    setInterval(async() => {
        if(await isNewBar(tradingInputs.market, tradingInputs.timeframe)){
            await loadLastBarClosedPrice(pool);
        }  
    }, dbInputs.loadInterval);
    // pool.end(); 
}

run();
