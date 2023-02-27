import "dotenv/config";
import { dbInput, newBarInput, fetchActiveSymbol } from "./Inputs/config.js";
import { loadPositions } from "./DBConnection/loadPositions.js";
import { initDB, initClient } from "./DBConnection/initPool.js";
import {
  loadSettlementPrice,
  loadMarkPrice,
} from "./DBConnection/loadPrice.js";
import { loadOrders } from "./DBConnection/loadOrders.js";
import { barInit } from "./utilities/isNewBar.js";
import logger from "./logger.js";
import { checkOpenOrder } from "./DBConnection/checkOpenOrder.js";
import {
  initAssetBalance,
  checkNewAsset,
} from "./DBConnection/checkNewAsset.js";

const main = async () => {
  logger.info("init DB Pool ...");
  const pool = initDB();
  const client = initClient();

  logger.info("init account balance ...");
  initAssetBalance(pool);

  logger.info("init isNewBar Function ...");
  await barInit(newBarInput.market, newBarInput.timeframe);

  logger.info("load past orders ...");
  await loadOrders(pool);

  logger.info("Start ...");
  setInterval(async () => {
    await checkNewAsset(client, pool);
    await fetchActiveSymbol(client);
    loadMarkPrice(pool);
    loadSettlementPrice(pool, client);
    await loadPositions(pool);
    await checkOpenOrder(client, pool);
    logger.info("-".repeat(30));
  }, dbInput.loadInterval);
};

main();
