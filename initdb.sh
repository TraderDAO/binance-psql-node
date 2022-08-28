#!/usr/bin/env bash

PGOPTIONS="--search_path=public"
export PGOPTIONS

 -w -c "DROP TABLE IF EXISTS markprice, settlementprice, orderstable;"
 -w -c "CREATE SCHEMA IF NOT EXISTS public;"
 -w -c "CREATE TABLE public.markprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
 -w -c "CREATE TABLE public.settlementprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
 -w -c "CREATE TABLE public.orderstable(id SERIAL PRIMARY KEY, time BIGINT, orderId TEXT UNIQUE, symbol TEXT, base TEXT, side TEXT, price numeric, amount numeric, cost numeric, executedQty numeric, remaining numeric, type TEXT, openStatus TEXT, unfilledStatus TEXT, portfolio_id numeric, account_id numeric, exchange_id numeric);"