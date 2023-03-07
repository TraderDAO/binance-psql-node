import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import logger from "../logger.js";

const getBalance = async () => {
  try {
    return (await binanceClient.fetchBalance()).total;
  } catch (err) {
    logger.error(`[getBalance] ${err}`);
    return console.log("getBalance err", err);
  }
};

export { getBalance };
