#!/usr/bin/env bash

# PGOPTIONS="--search_path=public"
# export PGOPTIONS

# psql -p 5432 -U postgres -d postgres -w -c  "DROP TABLE IF EXISTS activeasset, assetbalance, markprice, orderstable, settlementprice, stablecoinpnl, targetweight CASCADE;"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE SCHEMA IF NOT EXISTS public;"

# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.markprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.settlementprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.orderstable(id SERIAL PRIMARY KEY, time BIGINT, datetime TEXT , orderId BIGINT, symbol TEXT, base TEXT, side TEXT, price numeric, amount numeric, cost numeric, executedQty numeric, remaining numeric, type TEXT, openStatus TEXT, unfilledStatus TEXT, portfolio_id numeric, account_id numeric, exchange_id numeric);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.assetbalance(id SERIAL PRIMARY KEY, symbol TEXT, amount FLOAT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.activeasset(id SERIAL PRIMARY KEY, symbol TEXT, receivetime TEXT, receiveTimestamp TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.stablecoinpnl(symbol TEXT, target_weight numeric, position_weight numeric, net_weight numeric, total_qty numeric, position_value numeric, avg_bought_price numeric, bought_qty numeric, avg_sold_price numeric, sold_qty numeric, unrealized_pnl numeric, realized_pnl numeric, mark_price numeric, mark_time TEXT, timestamp BIGINT, incoming_pnl numeric, trading_pnl numeric, daily_avg_bought_price numeric, daily_bought_qty numeric, daily_avg_sold_price numeric, daily_sold_qty numeric, settlement_time TEXT);"
# psql -p 5432 -U postgres -d postgres -w -c  "CREATE TABLE public.targetweight(id SERIAL PRIMARY KEY, symbol TEXT, weight numeric);"


PGOPTIONS="--search_path=public"
export PGOPTIONS

psql -d traderDao -c  "DROP TABLE IF EXISTS activeasset, assetbalance, markprice, orderstable, settlementprice, stablecoinpnl, targetweight CASCADE;"
psql -d traderDao -c  "CREATE SCHEMA IF NOT EXISTS public;"

psql -d traderDao -c  "CREATE TABLE public.markprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE public.settlementprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE public.orderstable(id SERIAL PRIMARY KEY, time BIGINT, datetime TEXT , orderId BIGINT, symbol TEXT, base TEXT, side TEXT, price numeric, amount numeric, cost numeric, executedQty numeric, remaining numeric, type TEXT, openStatus TEXT, unfilledStatus TEXT, portfolio_id numeric, account_id numeric, exchange_id numeric);"
psql -d traderDao -c  "CREATE TABLE public.assetbalance(id SERIAL PRIMARY KEY, symbol TEXT, amount FLOAT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE public.activeasset(id SERIAL PRIMARY KEY, symbol TEXT, receivetime TEXT, receiveTimestamp TEXT);"
psql -d traderDao -c  "CREATE TABLE public.stablecoinpnl(symbol TEXT, target_weight numeric, position_weight numeric, net_weight numeric, total_qty numeric, position_value numeric, avg_bought_price numeric, bought_qty numeric, avg_sold_price numeric, sold_qty numeric, unrealized_pnl numeric, realized_pnl numeric, mark_price numeric, mark_time TEXT, timestamp BIGINT, incoming_pnl numeric, trading_pnl numeric, daily_avg_bought_price numeric, daily_bought_qty numeric, daily_avg_sold_price numeric, daily_sold_qty numeric, settlement_time TEXT);"
psql -d traderDao -c  "CREATE TABLE public.targetweight(id SERIAL PRIMARY KEY, symbol TEXT, weight numeric);"
