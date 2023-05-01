import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import logger from "../logger.js";
import { dbInput, newBarInput } from "../Inputs/config.js";
import { getDeposit, getWithdraws } from "../Collector/ledgerGetter.js";

const isNewTx = async (client) => {
  const query = `select max(timestamp) from ${dbInput.ledgerTable}`;
  const res = await client.query(query);
  const lastTime = res.rows[0].max;

  let checkDepositArr = await getDeposit(undefined, undefined, 1);
  const lastDepositFromExchange = checkDepositArr[0].timestamp;
  // let checkWithdrawtArr = await getWithdraws(undefined, undefined, 1);
  // const lastWithdrawFromExchange = checkWithdrawtArr[0].timestamp;

  if (
    lastTime != lastDepositFromExchange
    // &&
    // lastTime != lastWithdrawFromExchange
  ) {
    return true;
  }
};

const loadLedger = async (pool, client) => {
  if (await isNewTx(client)) {
    loadDeposit(pool, dbInput.ledgerTable);
    loadWithdraw(pool, dbInput.ledgerTable);
  }
};

const loadDeposit = async (pool, tableName) => {
  let arrOfDeposits = await getDeposit(undefined, undefined, undefined);

  arrOfDeposits.forEach((depositObj) => {
    const {
      id: exchangeId,
      txid,
      timestamp,
      datetime,
      network,
      amount,
      currency,
      status,
      type,
      info,
      fee,
    } = depositObj;
    const { confirmTimes } = info;
    // const feeCurrency = fee.currency;
    // const feeCost = fee.cost;
    const queryString = `INSERT INTO ${tableName}(exchangeId, txId, timestamp, datetime, type, currency, amount, network, status, confirmTimes
        )VALUES('${exchangeId}', '${txid}', '${timestamp}', '${datetime}', '${type}', '${currency}', '${amount}', '${network}', '${status}', '${confirmTimes}');`;
    logger.debug("queryString loadDeposit:" + queryString);
    pool.query(queryString, (err) => {
      if (err !== undefined) logger.error(`[loadPrice] ${err}`);
    });
  });
};

const loadWithdraw = async (pool, tableName) => {
  // console.log("symbolsForMarkPrice", symbolsForMarkPrice);
  let arrOfWithdraw = await getWithdraws(undefined, undefined, undefined);

  arrOfWithdraw.forEach((withdrawObj) => {
    const {
      id: exchangeId,
      txid,
      timestamp,
      datetime,
      network,
      amount,
      currency,
      status,
      type,
      info,
      fee,
    } = withdrawObj;
    const { confirmTimes } = info;
    // const feeCurrency = fee.currency;
    // const feeCost = fee.cost;
    const queryString = `INSERT INTO ${tableName}(exchangeId, txId, timestamp, datetime, type, currency, amount, network, status, confirmTimes
        )VALUES('${exchangeId}', '${txid}', '${timestamp}', '${datetime}', '${type}', '${currency}', '${amount}', '${network}', '${status}', '${confirmTimes}');`;
    logger.debug("queryString loadDeposit:" + queryString);
    pool.query(queryString, (err) => {
      if (err !== undefined) logger.error(`[loadPrice] ${err}`);
    });
  });
};

export { loadLedger };
