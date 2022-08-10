# binance-psql-node

Import price, order from Binance using Nodejs
## Pre-requirement

### PostgreSQL

[PostgreSQL Installation](https://postgresapp.com/downloads.html) 

## Getting started

1. Installation

```sh
git clone https://github.com/TraderDAO/binance-psql-node.git
cd  binance-psql-node
npm install 
```
2. Setup `.env` file with the fortmat in `.env.example`

```sh
cp .env.example .env
code .env
```

3. Initialize PSQL by the script

```sh
./initdb.sh
```

4. Run the server

```sh
npm run serve
```
