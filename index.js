import 'dotenv/config';
import {dbInput} from './Inputs/config.js';
import {initDB} from './DBConnection/initPool.js';
import {loadMarkPrice} from './DBConnection/loadPrice.js';
import {loadOrders} from './DBConnection/loadOrders.js';

const run = async () =>{
  // Init DB Pool
  const pool = initDB();
  // Load Past Orders
  // await loadOrders(pool);

  setInterval( () => {
    loadMarkPrice(pool);
    loadOrders(pool);
  }, dbInput.loadInterval);
};

run();
