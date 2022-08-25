import 'dotenv/config';
import {dbInput, newBarInput} from './Inputs/config.js';
import {initDB} from './DBConnection/initPool.js';
import {loadSettlementPrice, loadMarkPrice} from './DBConnection/loadPrice.js';
import { loadOrders } from './DBConnection/loadOrders.js';
import { barInit } from './utilities/isNewBar.js';
import logger from './logger.js';

const run = async () =>{
  
  logger.info('init DB Pool ...')
  const pool = initDB();
  
  logger.info('init isNewBar Function ...')
  await barInit(newBarInput.market, newBarInput.timeframe);

  logger.info('Start ...')
  setInterval( () => {
    loadMarkPrice(pool);
    loadSettlementPrice(pool);
    loadOrders(pool);
    logger.info('-'.repeat(30))
  }, dbInput.loadInterval);
}; 

run();
