import { getBalance } from "../Collector/userAssetGetter.js";
import { receiveTime, receiveTimestamp } from "../utilities/timeNow.js";
import { symbols } from "../Inputs/config.js";
import logger from "../logger.js";

const initAssetBalance = async (pool) => {
  // Load former trading symbols into ActiveAsset table
  loadActiveAsset(pool, symbols);
  // Load new asset user traded into AssetBalance table
  const initAsset = await getBalance();
  loadAssetBalance(initAsset, pool); 
};

const checkNewAsset = async (client, pool) => {
  const asset = await getBalance();
  loadAssetBalance(asset, pool); 
  const query = `select distinct symbol from dbt_traderdao.assetbalance`;
  const res = await client.query(query);
  const newAsset = res.rows.filter((asset)=>{
    return asset.symbol != 'USDT'
  });
  // await client.end()
  // console.log('newAsset', newAsset)

  const newSymbols = newAsset.map((asset) => {
    let quote = asset.symbol;
    let baseCurrency = 'USDT';
    let symbol = quote.concat("/", baseCurrency)
    return symbol;
  });
  // console.log(newSymbols)
  loadActiveAsset(pool, newSymbols)
};

const loadActiveAsset = async (pool, symbolArr) => {
  symbolArr.forEach((symbol) => {
    const queryString = `INSERT INTO dbt_traderdao.activeasset(symbol, receivetime, receivetimestamp
      )VALUES('${symbol}','${receiveTime()}', '${receiveTimestamp()}');`;
    pool.query(queryString, (err) => {
      if (err !== undefined) logger.error(`[initAsset] ${err}`);
    });
  });
};

const loadAssetBalance = async (assetObj, pool) => {
  for (const property in assetObj) {
    const symbol = property;
    const amount = parseFloat(assetObj[property]);
    if (amount >0){
      const queryString = `INSERT INTO dbt_traderdao.assetbalance(symbol, amount, receivetime, receiveTimestamp
        )VALUES('${symbol}', '${amount}','${receiveTime()}', '${receiveTimestamp()}');`;
        pool.query(queryString, (err) => {
          if (err !== undefined) logger.error(`[loadAsset] ${err}`);
        });
    }
  }
};

export { initAssetBalance, checkNewAsset };
