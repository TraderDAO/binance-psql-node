#!/usr/bin/env bash

PGOPTIONS="--search_path=sbinancedata"
export PGOPTIONS

psql -d dbtpractice -c "DROP TABLE IF EXISTS markprice, orderstable;"
psql -d dbtpractice -c "CREATE SCHEMA IF NOT EXISTS sbinancedata;"
psql -d dbtpractice -c "CREATE TABLE dbtpractice.sbinancedata.markprice(id SERIAL PRIMARY KEY, timestamp TEXT, symbol TEXT, price FLOAT(8));"
psql -d dbtpractice -c "CREATE TABLE dbtpractice.sbinancedata.orderstable(id SERIAL PRIMARY KEY, time TEXT, orderId BIGINT, symbol TEXT, side TEXT, price FLOAT(8), amount FLOAT(8), cost FLOAT(8), executedQty FLOAT(8), remaining FLOAT(8), type TEXT, openStatus TEXT, unfilledStatus TEXT);"