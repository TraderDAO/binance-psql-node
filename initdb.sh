#!/usr/bin/env bash

PGOPTIONS="--search_path=public"
export PGOPTIONS

PGPASSWORD=3QIfWVSayB psql -h orangeskylab-1.c9ejcf8ctlf9.us-west-2.rds.amazonaws.com -p 5432 -U postgres -d postgres -w -c "DROP TABLE IF EXISTS markprice, settlementprice, orderstable CASCADE;"
PGPASSWORD=3QIfWVSayB psql -h orangeskylab-1.c9ejcf8ctlf9.us-west-2.rds.amazonaws.com -p 5432 -U postgres -d postgres -w -c "CREATE SCHEMA IF NOT EXISTS public;"
PGPASSWORD=3QIfWVSayB psql -h orangeskylab-1.c9ejcf8ctlf9.us-west-2.rds.amazonaws.com -p 5432 -U postgres -d postgres -w -c "CREATE TABLE public.markprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
PGPASSWORD=3QIfWVSayB psql -h orangeskylab-1.c9ejcf8ctlf9.us-west-2.rds.amazonaws.com -p 5432 -U postgres -d postgres -w -c "CREATE TABLE public.settlementprice(id SERIAL PRIMARY KEY, symbol TEXT, price numeric, timestamp BIGINT, datetime TEXT, receivetime TEXT, receiveTimestamp TEXT);"
PGPASSWORD=3QIfWVSayB psql -h orangeskylab-1.c9ejcf8ctlf9.us-west-2.rds.amazonaws.com -p 5432 -U postgres -d postgres -w -c "CREATE TABLE public.orderstable(id SERIAL PRIMARY KEY, time BIGINT, orderId TEXT UNIQUE, symbol TEXT, base TEXT, side TEXT, price numeric, amount numeric, cost numeric, executedQty numeric, remaining numeric, type TEXT, openStatus TEXT, unfilledStatus TEXT, portfolio_id numeric, account_id numeric, exchange_id numeric);"