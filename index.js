import 'dotenv/config';
import {dbInput, tradingInput} from './Inputs/config.js';
import {initDB} from './DBConnection/initPool.js';
import {loadMarkPrice} from './DBConnection/loadPrice.js';
import {isNewBar} from './utilities/isNewBar.js';
import {loadOrders, loadNewOrders} from './DBConnection/loadOrders.js';

const run = async () =>{
  // Init DB Pool
  const pool = initDB();
  // Load Past Orders
  await loadOrders(pool);
  // Get Price and Check New Orders on the New Bar
  setInterval(async () => {
    const checkNewBar = 
      await isNewBar(tradingInput.market, tradingInput.timeframe);
    if (checkNewBar.isNewBar) {
      loadMarkPrice(pool);
      loadNewOrders(pool, checkNewBar.timestamp);
    }
  }, dbInput.loadInterval);
};

run();
