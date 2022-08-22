const dbInput = {
  markPriceTable: 'public.markPrice',
  // markPriceTable: 'dbt_traderdao.markPrice',
  orderstable: 'public.orderstable',
  // orderstable: 'dbt_traderdao.orderstable',
  incomingPriceTable: 'public.incomingprice',
  // incomingPriceTable: 'dbt_traderdao.incomingprice',
  markPriceTimeframe: '1m',
  incomingPriceTimeframe: '1d',
  loadInterval: 30000,
};

const tradingInput = {
  market: 'BTCBUSD',
  timeframe: '1m',
  exchange: 'binance',
};

const symbols = [
  'ETH/USDT',
  'BNB/USDT',
  'BTC/USDT',
  'XRP/USDT',
  'ADA/USDT',
  'BAT/USDT',
  'LINK/USDT',
  'MANA/USDT',
  'SOL/USDT',
  'MATIC/USDT',
  'THETA/USDT',
  'HNT/USDT',
  'DOT/USDT',
  'YFI/USDT',
  'LUNA/USDT',
  'UNI/USDT',
  'AVAX/USDT',
  'AAVE/USDT',
  'QNT/USDT',
  'AXS/USDT',
  'FIL/USDT'
];

const symbolLastUpdate = {
};

export {dbInput, tradingInput, symbols, symbolLastUpdate};


// dbt_orangesky
// dbt_orangesky
// dbt_orangesky