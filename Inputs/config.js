const dbInput = {
  markPriceTable: "markPrice",
  orderstable: "orderstable",
  loadInterval: 1000,
};

const tradingInput = {
  market: "BTCBUSD",
  timeframe: "1m",
  exchange: "binance",
};

const symbols = [
  "CRV/BUSD",
  // "ADA/BUSD",
  "FTM/BUSD",
  // "ETH/BUSD",
  // "ETHUSDT",
  // "BTCUSDT",
  // "XRPUSDT",
  // "ADAUSDT",
  // "BATUSDT",
  // "BNBUSDT",
  // "LINKUSDT",
  // "MANAUSDT",
  // "SOLUSDT",
  // "MATICUSDT",
  // "THETAUSDT",
  // "HNTUSDT",
  // "DOTUSDT",
  // "YFIUSDT",
  // "LUNAUSDT",
  // "UNIUSDT",
  // "AVAXUSDT",
  // "AAVEUSDT",
  // "QNTUSDT",
  // "AXSUSDT",
  // "FILUSDT"
];

export { dbInput, tradingInput, symbols };
