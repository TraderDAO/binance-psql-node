import 'dotenv/config';
import {dbInput} from './Inputs/config.js';
import {initDB} from './DBConnection/initPool.js';
import {loadIncomingPrice, loadMarkPrice} from './DBConnection/loadPrice.js';
import { loadOrders } from './DBConnection/loadOrders.js';

const run = async () =>{
  // Init DB Pool
  const pool = initDB();

  setInterval( () => {
    loadMarkPrice(pool);
    loadOrders(pool);
    loadIncomingPrice(pool);
  }, dbInput.loadInterval);
};

run();
