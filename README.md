# crypto-trading-db

### 1. [Install PostgreSQL](https://postgresapp.com/downloads.html) 


### 2. Run the Code

1. Clone the code
  ```sh
  git clone https://github.com/TraderDAO/binance-psql-node.git
  ```
2. Go to The Directory of This Project
  ```sh
  cd  binance-psql-node
  ```
3. NPM install
  ```sh
  npm install 
  ```
4. Setup .env file with the fortmat
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
5. Initialize PSQL by the script
  ```sh
  ./initDBSetting.sh
  ```
6. Run the server
  ```sh
  npm run serve
  ```
