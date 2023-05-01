import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import logger from "../logger.js";

const getDeposit = async (currency, since, limit) => {
  try {
    return await binanceClient.fetchDeposits(currency, since, limit);
  } catch (err) {
    logger.error(`[getDeposit] ${err}`);
    return console.log("getDeposit err", err);
  }
};

const getWithdraws = async (currency, since, limit) => {
  try {
    return await binanceClient.fetchWithdrawals(currency, since, limit);
  } catch (err) {
    logger.error(`[getWithdraws] ${err}`);
    return console.log("getWithdraws err", err);
  }
};

export { getDeposit, getWithdraws };
