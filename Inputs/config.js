const dbInputs = {
    tableName: "btcprice",
    loadInterval: 10000,
    param1: "timestamp",
    param2: "price"

};

const tradingInputs = {
    market: "BTCUSDT",
    exchange: "binance"
}

export{
    dbInputs,
    tradingInputs
}