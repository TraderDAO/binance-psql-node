const dbInputs = {
    tableName: "btcprice3",
    orderstable:"orderstable",
    loadInterval: 10000, 
};

const tradingInputs = {
    market: "BTCBUSD",
    timeframe: "1m",
    exchange: "binance"
}

const symbols = [
    // "CRV/BUSD",
    // "ADA/BUSD",
    // "FTM/BUSD"
    "ETHUSDT",
    "BTCUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "BATUSDT",
    "BNBUSDT",
    "LINKUSDT",
    "MANAUSDT",
    "SOLUSDT",
    "MATICUSDT",
    "THETAUSDT",
    "HNTUSDT",
    "DOTUSDT",
    "YFIUSDT",
    "LUNAUSDT",
    "UNIUSDT",
    "AVAXUSDT",
    "AAVEUSDT",
    "QNTUSDT",
    "AXSUSDT",
    "FILUSDT"
]

export{
    dbInputs,
    tradingInputs,
    symbols
}