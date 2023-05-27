import { receiveTime, utcNow } from "../utilities/timeNow.js";
import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import logger from "../logger.js";
import axios from "axios";
import { isNewBar } from "../utilities/isNewBar.js";
import { dbInput, newBarInput } from "../Inputs/config.js";

const loadSafeBalance = async (pool, client) => {
  const query = `select max(timestamp) from ${dbInput.settlementPriceTable}`;
  const res = await client.query(query);
  const lastSettlementTime = res.rows[0].max;
  if (lastSettlementTime == null) {
    return loadFormAlchemy(pool);
  }
  let utcToday = utcNow();
  if (
    utcToday != lastSettlementTime &&
    (await isNewBar(newBarInput.market, newBarInput.timeframe))
  ) {
    loadFormAlchemy(pool);
  }
};

const loadFormAlchemy = async (pool) => {
  console.log("in loasAlchemy function");
  // Wallet address
  const address = "0x7e00Ed1923a5Ca4D8B63a8217501A05E4EaA6304";

  // Alchemy URL --> Replace with your API key at the end
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/S4YYchGK_zVKKaxGoraBOq5mDRYGQyW6`;

  // Data for making the request to query token balances
  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    headers: {
      "Content-Type": "application/json",
    },
    params: [`${address}`],
    id: 42,
  });

  // config object for making a request with axios
  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  // fetching the token balances
  let response = await axios(config);
  response = response["data"];

  // Getting balances from the response
  const balances = response["result"];

  // Remove tokens with zero balance
  const nonZeroBalances = await balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;

    // options for making a request to get the token metadata
    const options = {
      method: "POST",
      url: baseURL,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenMetadata",
        params: [token.contractAddress],
      },
    };

    // getting the token metadata
    const metadata = await axios.request(options);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata["data"]["result"].decimals);
    balance = balance.toFixed(6);
    console.log(metadata["data"]["result"]);
    let symbol = metadata["data"]["result"].symbol;

    if (symbol === "USDC") {
      const price = 1;
      const amount = balance;
      const value = price * amount;
      const queryString = `INSERT INTO public.safebalance(symbol, price, amount, value, receiveTime
                )VALUES('${symbol}', '${price}', '${amount}', '${value}','${receiveTime()}');`;
      logger.debug("queryString:" + queryString);
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadPrice] ${err}`);
      });
    } else if (symbol === "WETH") {
      const price = (await binanceClient.fetchTicker("ETH/USDT")).close;
      const amount = balance;
      const value = price * amount;
      const queryString = `INSERT INTO public.safebalance(symbol, price, amount, value, receiveTime
                )VALUES('${symbol}', '${price}', '${amount}', '${value}','${receiveTime()}');`;
      logger.debug("queryString:" + queryString);
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadPrice] ${err}`);
      });
    }
  }
};

export { loadSafeBalance };
