import { getBalance } from "../Collector/userAssetGetter.js";
import { receiveTime, receiveTimestamp } from "../utilities/timeNow.js";
import { symbols } from "../Inputs/config.js";
import logger from "../logger.js";

const initAssetBalance = async (pool) => {
  loadActiveAsset(pool, symbols); // Load former trading symbols into ActiveAsset table
  const initAsset = await getBalance(); // Load new asset user traded into AssetBalance table
  loadAssetBalance(pool, initAsset);
};

const checkNewAsset = async (client, pool) => {
  const query = `select distinct symbol from public.assetbalance`;
  const res = await client.query(query);
  // console.log("res", res.rows);
  const newAssetArr = res.rows.filter((asset) => {
    return !(
      asset.symbol.match(/LD/i) ||
      asset.symbol.match(/ETHW/i) ||
      asset.symbol.match(/BUSD/i) ||
      asset.symbol.match(/USDT/i)
    );
  });
  // console.log("newAssetArr", newAssetArr);
  const newSymbolsBUSD = newAssetArr.map((asset) => {
    let quote = asset.symbol;
    let baseCurrency = "BUSD";
    let symbol = quote.concat("/", baseCurrency);
    return symbol;
  });
  const newSymbolsUSDT = newAssetArr.map((asset) => {
    let quote = asset.symbol;
    let baseCurrency = "USDT";
    let symbol = quote.concat("/", baseCurrency);
    return symbol;
  });

  const newSymbols = [...newSymbolsBUSD, ...newSymbolsUSDT];
  // console.log("newSymbols", newSymbols);
  loadActiveAsset(pool, newSymbols);

  const asset = await getBalance();
  loadAssetBalance(pool, asset);
};

const loadActiveAsset = async (pool, symbolArr) => {
  symbolArr.forEach((symbol) => {
    const queryString = `INSERT INTO public.activeasset(symbol, receivetime, receivetimestamp
      )VALUES('${symbol}','${receiveTime()}', '${receiveTimestamp()}');`;
    pool.query(queryString, (err) => {
      if (err !== undefined) logger.error(`[loadActiveAsset] ${err}`);
    });
  });
};

const loadAssetBalance = async (pool, assetObj) => {
  for (const property in assetObj) {
    const symbol = property;
    const amount = parseFloat(assetObj[property]);
    if (amount > 0) {
      const queryString = `INSERT INTO public.assetbalance(symbol, amount, receivetime, receiveTimestamp
        )VALUES('${symbol}', '${amount}','${receiveTime()}', '${receiveTimestamp()}');`;
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadAssetBalance] ${err}`);
      });
    }
  }
};

export { initAssetBalance, checkNewAsset };
