const dbInput = {
  markPriceTable: "dbt_traderdao.markPrice",
  orderstable: "dbt_traderdao.orderstable3",
  settlementPriceTable: "dbt_traderdao.settlementprice",
  stableCoinTable: "dbt_traderdao.stablecoinpnl",
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

let symbols = [
  // 'USDC/USDT',
  // 'ALGO/USDT',
  // "ETH/USDT",
  // "BNB/USDT",
  "BTC/BUSD"
  // "XRP/USDT",
  // "ADA/USDT",
  // "TRX/USDT",
  // "BAT/USDT",
  // "LINK/USDT",
  // "MANA/USDT",
  // "SOL/USDT",
  // "MATIC/USDT",
  // "THETA/USDT",
  // "HNT/USDT",
  // "DOT/USDT",
  // "YFI/USDT",
  // "LUNA/USDT",
  // "UNI/USDT",
  // "AVAX/USDT",
  // "AAVE/USDT",
  // "QNT/USDT",
  // "AXS/USDT",
  // "FIL/USDT",
  // "ETH/USDC",
  // "BNB/USDC",
  // "BTC/USDC",
  // "XRP/USDC",
  // "ADA/USDC",
  // "BAT/USDC",
  // "LINK/USDC",
  // "SOL/USDC",
  // "TRX/USDC"
]

let symbolsForMarkPrice = [
  "ETH/USDT",
  // "BNB/USDT",
  "BTC/USDT"
  // 'USDC/USDT',
  // 'ALGO/USDT',
  // "ETH/USDT",
  // "BNB/USDT",
  // "BTC/USDT",
  // "XRP/USDT",
  // "ADA/USDT",
  // "TRX/USDT",
  // "BAT/USDT",
  // "LINK/USDT",
  // "MANA/USDT",
  // "SOL/USDT",
  // "MATIC/USDT",
  // "THETA/USDT",
  // "HNT/USDT",
  // "DOT/USDT",
  // "YFI/USDT",
  // "LUNA/USDT",
  // "UNI/USDT",
  // "AVAX/USDT",
  // "AAVE/USDT",
  // "QNT/USDT",
  // "AXS/USDT",
  // "FIL/USDT"
]

let symbolsForSettlementPrice = [
  "ETH/USDT",
  // "BNB/USDT",
  "BTC/USDT"
  // 'USDC/USDT',
  // 'ALGO/USDT',
  // "ETH/USDT",
  // "BNB/USDT",
  // "BTC/USDT",
  // "XRP/USDT",
  // "ADA/USDT",
  // "TRX/USDT",
  // "BAT/USDT",
  // "LINK/USDT",
  // "MANA/USDT",
  // "SOL/USDT",
  // "MATIC/USDT",
  // "THETA/USDT",
  // "HNT/USDT",
  // "DOT/USDT",
  // "YFI/USDT",
  // "LUNA/USDT",
  // "UNI/USDT",
  // "AVAX/USDT",
  // "AAVE/USDT",
  // "QNT/USDT",
  // "AXS/USDT",
  // "FIL/USDT"
]

const symbolLastUpdate = {}

const fetchActiveSymbol = async(client)=>{
  const query = `select distinct symbol from dbt_traderdao.activeasset`;
  const res = await client.query(query);
  const newAsset = res.rows;
  // await client.end()
  // console.log('newAsset', newAsset)
  const tradingQuotation = newAsset.map((symbol)=>{
    return symbol.symbol
  }).filter((symbol)=>{
    let regex = /LD/i
    let regex2 = /ETHW/i
    return !(symbol.match(regex)) && !(symbol.match(regex2))
  })
  const quotation = tradingQuotation.filter((symbol)=>{
    let regex = /USDT/i
    return symbol.match(regex)
  })
  // console.log(quotation)
  symbolsForMarkPrice = quotation;
  symbolsForSettlementPrice = quotation;
  symbols = tradingQuotation;
}

export {
  dbInput,
  newBarInput,
  symbols,
  symbolLastUpdate,
  symbolsForMarkPrice,
  symbolsForSettlementPrice,
  accountSetting,
  fetchActiveSymbol
}
