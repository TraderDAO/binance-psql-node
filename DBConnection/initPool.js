import 'dotenv/config'
import pkg from 'pg';
const { Pool } = pkg;


const initDB = () =>{

    const pool = new Pool({
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        port: process.env.port,
    });

    return pool;
}

export {
    initDB,
}