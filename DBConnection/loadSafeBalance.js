import { receiveTime, utcNow } from "../utilities/timeNow.js";
import { binanceClient } from "../ExchangeSetting/exchangeConfig.js";
import logger from "../logger.js";
import axios from "axios";
import { isNewBar } from "../utilities/isNewBar.js";
import { dbInput, newBarInput } from "../Inputs/config.js";
import { ethers } from "ethers";

const loadSafeBalance = async (pool, client) => {
  const query = `select max(timestamp) from ${dbInput.settlementPriceTable}`;
  const res = await client.query(query);
  const lastSettlementTime = res.rows[0].max;
  if (lastSettlementTime == null) {
    loadFormAlchemy(pool);
    loadEthBalance(pool);
    return true;
  }
  let utcToday = utcNow();
  if (
    utcToday != lastSettlementTime &&
    (await isNewBar(newBarInput.market, newBarInput.timeframe))
  ) {
    loadFormAlchemy(pool);
    loadEthBalance(pool);
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
    return (
      token.tokenBalance !==
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
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

    if (symbol === "USDC" || symbol === "USDT") {
      const price = 1;
      const amount = balance;
      const value = price * amount;
      const queryString = `INSERT INTO public.safebalance(symbol, price, amount, value, receiveTime
                )VALUES('${symbol}', '${price}', '${amount}', '${value}','${receiveTime()}');`;
      logger.debug("queryString:" + queryString);
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadPrice] ${err}`);
      });
    } else if (symbol === "RPL") {
      const price = (await binanceClient.fetchTicker("RPL/USDT")).close;
      const amount = balance;
      const value = price * amount;
      const queryString = `INSERT INTO public.safebalance(symbol, price, amount, value, receiveTime
                )VALUES('${symbol}', '${price}', '${amount}', '${value}','${receiveTime()}');`;
      logger.debug("queryString:" + queryString);
      console.log(queryString);
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadPrice] ${err}`);
      });
    }
  }
};

const loadEthBalance = async (pool) => {
  // Wallet address
  const address = "0x7e00Ed1923a5Ca4D8B63a8217501A05E4EaA6304";

  // Alchemy URL --> Replace with your API key at the end
  const apiKey = `S4YYchGK_zVKKaxGoraBOq5mDRYGQyW6`;

  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };

  // Query smart contract by alchemy
  const response = await axios(config);
  console.log(response["data"]);
  const balance = response["data"]["result"];
  const ethAmount = ethers.formatEther(balance);

  // Write to DB
  const symbol = "ETH";
  const price = (await binanceClient.fetchTicker("ETH/USDT")).close;
  const amount = ethAmount;
  const value = price * amount;
  const queryString = `INSERT INTO public.safebalance(symbol, price, amount, value, receiveTime
              )VALUES('${symbol}', '${price}', '${amount}', '${value}','${receiveTime()}');`;
  logger.debug("queryString:" + queryString);
  pool.query(queryString, (err) => {
    if (err !== undefined) logger.error(`[loadPrice] ${err}`);
  });
};
export { loadSafeBalance };
