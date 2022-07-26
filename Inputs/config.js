const dbInputs = {
    tableName: "btcprice3",
    loadInterval: 10000,
};

const tradingInputs = {
    market: "BTCBUSD",
    timeframe: "1m",
    exchange: "binance"
}

const symbols = [
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