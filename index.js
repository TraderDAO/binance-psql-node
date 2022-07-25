import 'dotenv/config'
import { tradingInputs } from "./Inputs/config.js";
import { dbInputs } from './Inputs/config.js';
import { initDB } from './DBConnection/initPool.js';
import { loadPrice } from './DBConnection/loadPrice.js';


const run = () =>{
    const pool = initDB();

    setInterval(async() => {
        const result = await loadPrice(tradingInputs.market, tradingInputs.exchange, pool);
       
        console.log(result);
    }, dbInputs.loadInterval);
    // pool.end();
}

run();
