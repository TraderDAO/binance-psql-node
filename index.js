import 'dotenv/config'
import { tradingInputs, symbols } from "./Inputs/config.js";
import { dbInputs } from './Inputs/config.js';
import { initDB } from './DBConnection/initPool.js';
import { loadLastBarClosedPrice } from './DBConnection/loadPrice.js';
import { isNewBar } from './utilities/isNewBar.js';
import { loadPastOrders } from './DBConnection/loadPastOrders.js';

const run = async() =>{
    // Init DB Pool
    const pool = initDB();
    // Load Past Orders
    const pastOrders = await loadPastOrders(pool)
    // Get Price and Check New Orders on the New Bar
    setInterval(async() => {
        if(await isNewBar(tradingInputs.market, tradingInputs.timeframe)){
            await loadLastBarClosedPrice(pool);
        }  
    }, dbInputs.loadInterval);
    // pool.end(); 
}

run();
