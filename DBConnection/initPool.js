import "dotenv/config";
import pkg from "pg";
import logger from "../logger.js";
const { Pool, Client } = pkg;

const initDB = () => {
  try {
    const pool = new Pool({
      user: process.env.user,
      host: process.env.host,
      database: process.env.database,
      password: process.env.password,
      port: process.env.port,
    });
    return pool;
  } catch (err) {
    logger.error(`[initDB] ${err}`);
    return console.log("initDB err", err);
  }
};

const initClient = () => {
  try {
    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.database,
      password: process.env.password,
      port: process.env.port,
    });
    client.connect();
    return client;
  } catch (err) {
    logger.error(`[initClient] ${err}`);
    return console.log("initClient err", err);
  }
};

export { initDB, initClient };
