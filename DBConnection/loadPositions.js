import { binanceClient } from "../ExchangeSetting/exchangeConfig.js"
import { dbInput } from "../Inputs/config.js"
import { receiveTimestamp } from "../utilities/timeNow.js"
import logger from "../logger.js"

const loadPositions = async (pool) => {
  try {
    const tableName = dbInput.stableCoinTable
    const balances = await binanceClient.fetchBalance()
    const infos = Object.keys(balances)
    const positions = infos.slice(1, infos.length - 5)
    const stablecoins = []
    positions.forEach((p) => {
      if(balances[p].total !== 0)
      {
        if (p === "USDT" || p === "USDC" || p === "BUSD") {
          stablecoins.push({
            symbol: p,
            total_qty: balances[p].total,
            position_value: balances[p].total,
            avg_bought_price: 0,
            bought_qty: balances[p].total,
            avg_sold_price: 0,
            sold_qty: 0,
            unrealized_pnl: 0,
            realized_pnl: 0,
            mark_price: 1,
            mark_time: "-",
            timestamp: receiveTimestamp(),
            incoming_pnl: 0,
            trading_pnl: 0,
            daily_avg_bought_price: 0,
            daily_bought_qty: 0,
            daily_avg_sold_price: 0,
            daily_sold_qty: 0,
            settlement_time: "-"
          })
        }

      }
    })

    stablecoins.forEach((p) => {
      const queryString = `INSERT INTO ${tableName}(symbol, total_qty, position_value, avg_bought_price, bought_qty, avg_sold_price, sold_qty, unrealized_pnl, realized_pnl, mark_price, mark_time, timestamp, incoming_pnl, trading_pnl, daily_avg_bought_price, daily_bought_qty, daily_avg_sold_price, daily_sold_qty, settlement_time
          )VALUES('${p.symbol}', '${p.total_qty}', '${p.position_value}', '${p.avg_bought_price}', '${p.bought_qty}', '${p.avg_sold_price}', '${p.sold_qty}', '${p.unrealized_pnl}', '${p.realized_pnl}', '${p.mark_price}', '${p.mark_time}', '${p.timestamp}', '${p.incoming_pnl}', '${p.trading_pnl}', '${p.daily_avg_bought_price}', '${p.daily_bought_qty}', '${p.daily_avg_sold_price}', '${p.daily_sold_qty}', '${p.settlement_time}');`
      pool.query(queryString, (err) => {
        if (err !== undefined) logger.error(`[loadPositions/pool.query] ${err}`)
      })
    })

  } catch (err) {
    logger.error(`[loadPrice/catch] ${err}`)
    return "loadPrice err" + err
  }
}

export { loadPositions }
