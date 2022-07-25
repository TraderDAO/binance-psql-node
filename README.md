# crypto-trading-db

### 1. Create a PostgreSQL table for Node.js

1. Init dbt
 ```sh
  dbt init
  ```

2. Crate postgres db
 ```sh
  createdb your_dbname
  ```

3. Open psql
  ```sh
   psql -d your_dbname
  ```
  
4. Create table you need (for example)
  ```sh
   CREATE TABLE btcPrice(id SERIAL PRIMARY KEY, timestamp TEXT, price INT);
  ```

### 2. Run the Code

1. Clone the code
  ```sh
  git clone https://github.com/traderpete/crypto-trading-db.git
  ```
2. NPM install
  ```sh
  npm install 
  ```
3. Setup .env file with the fortmat
  ```sh
  //postgres setting
  user = 
  host= 
  database= 
  password= 
  port= 
  
  //exchange setting (change with the exchange you use)
  API_KEY=
  API_SECRET=
  ```
4. Run
  ```sh
  npm run serve
  ```
