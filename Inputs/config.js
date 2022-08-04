const dbInput = {
  markPriceTable: 'markPrice',
  orderstable: 'orderstable',
  loadInterval: 10000,
};

const tradingInput = {
  market: 'BTCBUSD',
  timeframe: '1m',
  exchange: 'binance',
};

const symbols = [
  'CRV/BUSD',
  'FTM/BUSD',
  'SOL/BUSD'
  // 'ADA/BUSD',
  // 'ETH/BUSD',
  // 'ETHUSDT',
  // 'BTCUSDT',
  // 'XRPUSDT',
  // 'ADAUSDT',
  // 'BATUSDT',
  // 'BNBUSDT',
  // 'LINKUSDT',
  // 'MANAUSDT',
  // 'SOLUSDT',
  // 'MATICUSDT',
  // 'THETAUSDT',
  // 'HNTUSDT',
  // 'DOTUSDT',
  // 'YFIUSDT',
  // 'LUNAUSDT',
  // 'UNIUSDT',
  // 'AVAXUSDT',
  // 'AAVEUSDT',
  // 'QNTUSDT',
  // 'AXSUSDT',
  // 'FILUSDT'
];

const symbolLastUpdate = {
};


export {dbInput, tradingInput, symbols, symbolLastUpdate};
