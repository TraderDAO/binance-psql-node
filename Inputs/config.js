const dbInput = {
  markPriceTable: "public.markPrice",
  orderstable: "public.orderstable",
  settlementPriceTable: "public.settlementprice",
  stableCoinTable: "public.stablecoinpnl",
  markPriceTimeframe: "1m",
  settlementPriceTimeframe: "1d",
  loadInterval: 60000
}

const newBarInput = {
  market: "BTCBUSD",
  timeframe: "1d",
  exchange: "binance"
}

const accountSetting = {
  exchangeId: 0,
  accountId: 0,
  portfolioId: 0
}

const symbols = [
  "ETH/USDT",
  "BNB/USDT",
  "BTC/USDT",
  "XRP/USDT",
  "ADA/USDT",
  "TRX/USDT",
  "BAT/USDT",
  "LINK/USDT",
  "MANA/USDT",
  "SOL/USDT",
  "MATIC/USDT",
  "THETA/USDT",
  "HNT/USDT",
  "DOT/USDT",
  "YFI/USDT",
  "LUNA/USDT",
  "UNI/USDT",
  "AVAX/USDT",
  "AAVE/USDT",
  "QNT/USDT",
  "AXS/USDT",
  "FIL/USDT",
  "ETH/USDC",
  "BNB/USDC",
  "BTC/USDC",
  "XRP/USDC",
  "ADA/USDC",
  "BAT/USDC",
  "LINK/USDC",
  "SOL/USDC",
  "TRX/USDC"
]

const symbolsForMarkPrice = [
  "ETH/USDT",
  "BNB/USDT",
  "BTC/USDT",
  "XRP/USDT",
  "ADA/USDT",
  "TRX/USDT",
  "BAT/USDT",
  "LINK/USDT",
  "MANA/USDT",
  "SOL/USDT",
  "MATIC/USDT",
  "THETA/USDT",
  "HNT/USDT",
  "DOT/USDT",
  "YFI/USDT",
  "LUNA/USDT",
  "UNI/USDT",
  "AVAX/USDT",
  "AAVE/USDT",
  "QNT/USDT",
  "AXS/USDT",
  "FIL/USDT",
  "ETH/USDC",
  "BNB/USDC",
  "BTC/USDC",
  "XRP/USDC",
  "ADA/USDC",
  "BAT/USDC",
  "LINK/USDC",
  "SOL/USDC",
  "TRX/USDC"
]

const symbolsForSettlementPrice = [
  "ETH/USDT",
  "BNB/USDT",
  "BTC/USDT",
  "XRP/USDT",
  "ADA/USDT",
  "TRX/USDT",
  "BAT/USDT",
  "LINK/USDT",
  "MANA/USDT",
  "SOL/USDT",
  "MATIC/USDT",
  "THETA/USDT",
  "HNT/USDT",
  "DOT/USDT",
  "YFI/USDT",
  "LUNA/USDT",
  "UNI/USDT",
  "AVAX/USDT",
  "AAVE/USDT",
  "QNT/USDT",
  "AXS/USDT",
  "FIL/USDT"
]

const symbolLastUpdate = {}

export {
  dbInput,
  newBarInput,
  symbols,
  symbolLastUpdate,
  symbolsForMarkPrice,
  symbolsForSettlementPrice,
  accountSetting
}
