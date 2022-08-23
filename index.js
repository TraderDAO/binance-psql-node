import 'dotenv/config';
import {dbInput, newBarInput} from './Inputs/config.js';
import {initDB} from './DBConnection/initPool.js';
import {loadSettlementPrice, loadMarkPrice} from './DBConnection/loadPrice.js';
import { loadOrders } from './DBConnection/loadOrders.js';
import { barInit } from './utilities/isNewBar.js';


const run = async () =>{
  // Init DB Pool
  const pool = initDB();
  // Init isNewBar Function
  await barInit(newBarInput.market, newBarInput.timeframe);

  setInterval( () => {
    loadMarkPrice(pool);
    loadSettlementPrice(pool);
    loadOrders(pool);
  }, dbInput.loadInterval);
}; 

run();
