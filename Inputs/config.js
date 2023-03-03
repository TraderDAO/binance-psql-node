const dbInput = {
  markPriceTable: "public.markPrice",
  orderstable: "public.orderstable",
  settlementPriceTable: "public.settlementprice",
  stableCoinTable: "public.stablecoinpnl",
  markPriceTimeframe: "1m",
  settlementPriceTimeframe: "1d",
  loadInterval: 60000,
};

const newBarInput = {
  market: "BTCBUSD",
  timeframe: "1d",
  exchange: "binance",
};

const accountSetting = {
  exchangeId: 0,
  accountId: 0,
  portfolioId: 0,
  keyId: 0,
};

let symbols = [
  "RPL/BUSD",
  "BTC/BUSD",
  "ETH/BUSD",
  "MATIC/BUSD",
  "OP/BUSD",
  "LDO/BUSD",
  "ENS/BUSD",
  "BAT/BUSD",
  "BNB/BUSD",
];

let symbolsForMarkPrice = [
  "RPL/BUSD",
  "BTC/BUSD",
  "ETH/BUSD",
  "MATIC/BUSD",
  "OP/BUSD",
  "LDO/BUSD",
  "ENS/BUSD",
  "BAT/BUSD",
  "BNB/BUSD",
];

let symbolsForSettlementPrice = [
  "RPL/BUSD",
  "BTC/BUSD",
  "ETH/BUSD",
  "MATIC/BUSD",
  "OP/BUSD",
  "LDO/BUSD",
  "ENS/BUSD",
  "BAT/BUSD",
  "BNB/BUSD",
];

const symbolLastUpdate = {};

const fetchActiveSymbol = async (client) => {
  const query = `select distinct symbol from public.activeasset`;
  const res = await client.query(query);
  const activeSymbols = res.rows;
  // console.log("activeSymbols", activeSymbols);
  symbols = activeSymbols.map((symbol) => {
    return symbol.symbol;
  });
  // console.log("new symbols", symbols);
  symbolsForMarkPrice = symbols.filter((symbol) => {
    return symbol.match(/BUSD/i);
  });
  // console.log("symbolsForMarkPrice", symbolsForMarkPrice);
  symbolsForSettlementPrice = symbolsForMarkPrice;
  // console.log("symbolsForSettlementPrice", symbolsForSettlementPrice);
};

export {
  dbInput,
  newBarInput,
  symbols,
  symbolLastUpdate,
  symbolsForMarkPrice,
  symbolsForSettlementPrice,
  accountSetting,
  fetchActiveSymbol,
};

// let symbols = [
//   "USDC/USDT",
//   "ALGO/USDT",
//   "ETH/USDT",
//   "BNB/USDT",
//   "BTC/USDT",
//   "XRP/USDT",
//   "ADA/USDT",
//   "TRX/USDT",
//   "BAT/USDT",
//   "LINK/USDT",
//   "MANA/USDT",
//   "SOL/USDT",
//   "MATIC/USDT",
//   "THETA/USDT",
//   "HNT/USDT",
//   "DOT/USDT",
//   "YFI/USDT",
//   "LUNA/USDT",
//   "UNI/USDT",
//   "AVAX/USDT",
//   "AAVE/USDT",
//   "QNT/USDT",
//   "AXS/USDT",
//   "FIL/USDT",
//   "ETH/USDC",
//   "BNB/USDC",
//   "BTC/USDC",
//   "XRP/USDC",
//   "ADA/USDC",
//   "BAT/USDC",
//   "LINK/USDC",
//   "SOL/USDC",
//   "TRX/USDC",
// ];

// let symbolsForMarkPrice = [
//   "USDC/USDT",
//   "ALGO/USDT",
//   "ETH/USDT",
//   "BNB/USDT",
//   "BTC/USDT",
//   "XRP/USDT",
//   "ADA/USDT",
//   "TRX/USDT",
//   "BAT/USDT",
//   "LINK/USDT",
//   "MANA/USDT",
//   "SOL/USDT",
//   "MATIC/USDT",
//   "THETA/USDT",
//   "HNT/USDT",
//   "DOT/USDT",
//   "YFI/USDT",
//   "LUNA/USDT",
//   "UNI/USDT",
//   "AVAX/USDT",
//   "AAVE/USDT",
//   "QNT/USDT",
//   "AXS/USDT",
//   "FIL/USDT",
// ];

// let symbolsForSettlementPrice = [
//   "USDC/USDT",
//   "ALGO/USDT",
//   "ETH/USDT",
//   "BNB/USDT",
//   "BTC/USDT",
//   "XRP/USDT",
//   "ADA/USDT",
//   "TRX/USDT",
//   "BAT/USDT",
//   "LINK/USDT",
//   "MANA/USDT",
//   "SOL/USDT",
//   "MATIC/USDT",
//   "THETA/USDT",
//   "HNT/USDT",
//   "DOT/USDT",
//   "YFI/USDT",
//   "LUNA/USDT",
//   "UNI/USDT",
//   "AVAX/USDT",
//   "AAVE/USDT",
//   "QNT/USDT",
//   "AXS/USDT",
//   "FIL/USDT",
// ];
