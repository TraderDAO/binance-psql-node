#!/usr/bin/env bash

PGOPTIONS="--search_path=dbt_traderdao"
export PGOPTIONS

psql -d traderDao -c "DROP TABLE IF EXISTS markprice, orderstable;"
psql -d traderDao -c "CREATE SCHEMA IF NOT EXISTS dbt_traderdao;"
psql -d traderDao -c "CREATE TABLE dbt_traderdao.markprice(id SERIAL PRIMARY KEY, timestamp BIGINT, symbol TEXT, price numeric);"
psql -d traderDao -c "CREATE TABLE dbt_traderdao.orderstable(id SERIAL PRIMARY KEY, time BIGINT, orderId BIGINT, symbol TEXT, side TEXT, price numeric, amount numeric, cost numeric, executedQty numeric, remaining numeric, type TEXT, openStatus TEXT, unfilledStatus TEXT);"