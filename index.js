import 'dotenv/config'
import { tradingInputs, symbols } from "./Inputs/config.js";
import { dbInputs } from './Inputs/config.js';
import { initDB } from './DBConnection/initPool.js';
import { loadLastBarClosedPrice } from './DBConnection/loadPrice.js';
import { isNewBar } from './utilities/isNewBar.js';
import { loadPastOrders } from './DBConnection/loadPastOrders.js';
import { fetchNewOrders } from "./Collector/fetchNewOrders.js"

const run = async() =>{
    // Init DB Pool
    const pool = initDB();
    // Load Past Orders
    const pastOrders = await loadPastOrders(pool);
    // Get Price and Check New Orders on the New Bar
    setInterval(async() => {
        const checkNewBar = await isNewBar(tradingInputs.market, tradingInputs.timeframe);
        if(checkNewBar.isNewBar){
            await loadLastBarClosedPrice(pool);
            await fetchNewOrders(pool, checkNewBar.timestamp);
        }  
    }, dbInputs.loadInterval);
    // pool.end(); 
}

run();
