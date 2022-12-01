import { symbols } from "../Inputs/config.js";
import { receiveTime, receiveTimestamp } from "../utilities/timeNow.js";

const loadFormerSymbol = async (pool) => {
  const symbolArr = symbols;
  symbolArr.forEach((symbol) => {
    console.log(symbol);
    const queryString = `INSERT INTO public.activeasset(symbol, receivetime, receivetimestamp
      )VALUES('${symbol}','${receiveTime()}', '${receiveTimestamp()}');`;
    pool.query(queryString, (err) => {
      if (err !== undefined) logger.error(`[initAsset] ${err}`);
    });
  });
};

export { loadFormerSymbol };
