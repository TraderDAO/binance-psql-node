#!/usr/bin/env bash

# PGOPTIONS="--search_path=public"
# export PGOPTIONS

# psql -p 5432 -U postgres -d postgres -w -c  "DROP TABLE IF EXISTS activeasset, assetbalance, markprice, orderstable, settlementprice, stablecoinpnl, targetweight, alpha CASCADE;"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE SCHEMA IF NOT EXISTS public;"

# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE markprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE settlementprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"

# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE assetbalance(id SERIAL PRIMARY KEY, symbol TEXT, amount FLOAT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE activeasset(id SERIAL PRIMARY KEY, symbol TEXT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE stablecoinpnl(symbol TEXT, target_weight numeric, position_weight numeric, net_weight numeric, total_qty numeric, position_value numeric, avg_bought_price numeric, bought_qty numeric, avg_sold_price numeric, sold_qty numeric, unrealized_pnl numeric, realized_pnl numeric, mark_price numeric, mark_time TEXT, timestamp BIGINT, incoming_pnl numeric, trading_pnl numeric, daily_avg_bought_price numeric, daily_bought_qty numeric, daily_avg_sold_price numeric, daily_sold_qty numeric, settlement_time TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE targetweight(id SERIAL PRIMARY KEY, symbol TEXT, weight numeric);"
# psql -p 5432 -U postgres -d postgres -w -c  "create table alpha(id serial primary key, symbol text, signaltime text, dbreceivetime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, alarm numeric, pix numeric, stopOut numeric, inOut numeric, noDays numeric); "
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.orderstable(id SERIAL PRIMARY KEY, clientOrderId text, orderId text, orderListId text, orderReqTime text, serverTime text, dbWrittingTime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, exchangeReceiveTime text, exchangeReceiveTimestamp numeric, datetime text, lastTradeTime text, lastTradeTimestamp text, updateTime text, symbol TEXT, base TEXT, side TEXT, price numeric, amount numeric, type TEXT, origQty numeric, executedQty numeric, cummulativeQuoteQty numeric, cost numeric, remaining numeric, filled numeric, reduceOnly BOOLEAN, triggerPrice numeric, openStatus TEXT, unfilledStatus TEXT, fee text, portfolio_id numeric, account_id numeric, exchange_id numeric, key_id numeric);"



PGOPTIONS="--search_path=public"
export PGOPTIONS

psql -d traderDao -c  "DROP TABLE IF EXISTS activeasset, assetbalance, markprice, orderstable, settlementprice, stablecoinpnl, targetweight, alpha, ledger, safeBalance CASCADE;"
psql -d traderDao -c  "CREATE SCHEMA IF NOT EXISTS public;"

psql -d traderDao -c  "CREATE TABLE markprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE settlementprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"

psql -d traderDao -c  "CREATE TABLE assetbalance(id SERIAL PRIMARY KEY, symbol TEXT, amount FLOAT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE activeasset(id SERIAL PRIMARY KEY, symbol TEXT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE stablecoinpnl(symbol TEXT, target_weight numeric, position_weight numeric, net_weight numeric, total_qty numeric, position_value numeric, avg_bought_price numeric, bought_qty numeric, avg_sold_price numeric, sold_qty numeric, unrealized_pnl numeric, realized_pnl numeric, mark_price numeric, mark_time TEXT, timestamp BIGINT, incoming_pnl numeric, trading_pnl numeric, daily_avg_bought_price numeric, daily_bought_qty numeric, daily_avg_sold_price numeric, daily_sold_qty numeric, settlement_time TEXT);"
psql -d traderDao -c  "CREATE TABLE targetweight(id SERIAL PRIMARY KEY, symbol TEXT, weight numeric);"
psql -d traderDao -c  "create table alpha(id serial primary key, symbol text, signaltime text, dbreceivetime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, alarm numeric, pix numeric, stopOut numeric, inOut numeric, noDays numeric); "
psql -d traderDao -c  "CREATE TABLE public.orderstable(id SERIAL PRIMARY KEY, clientOrderId text, orderId text, orderListId text, orderReqTime text, serverTime text, dbWrittingTime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, exchangeReceiveTime text, exchangeReceiveTimestamp numeric, datetime text, lastTradeTime text, lastTradeTimestamp text, updateTime text, symbol TEXT, base TEXT, side TEXT, price numeric, amount numeric, type TEXT, origQty numeric, executedQty numeric, cummulativeQuoteQty numeric, cost numeric, remaining numeric, filled numeric, reduceOnly BOOLEAN, triggerPrice numeric, openStatus TEXT, unfilledStatus TEXT, fee text, portfolio_id numeric, account_id numeric, exchange_id numeric, key_id numeric);"

psql -d traderDao -c  "CREATE TABLE ledger(id SERIAL PRIMARY KEY, exchangeId text, txId text, timestamp text, datetime text, type text, currency text, amount float, network text, status text, confirmTimes text);"


psql -d traderDao -c  "CREATE TABLE safeBalance(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, amount numeric, value numeric, receiveTime TEXT);"






