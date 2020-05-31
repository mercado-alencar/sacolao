/**
 TODO Utilizar https: //www.npmjs.com/package/js-hibernate
 **/
let connection = false;
module.exports = (() => {
    const dotenv = require('dotenv');
    const logger = require('../utils/logger');
    dotenv.config();
    const {
        Pool
    } = require('pg');
    const options = {
        user: process.env.DB_USER,
        host: process.env.DB_URL,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5432,
      //  ssl: true
    };
    const pool = new Pool(options);

    const createTables = (client) => {

        client.query(`
        CREATE TABLE IF NOT EXISTS EXTENSAO (
        ID serial,
        EMAIL VARCHAR (50) UNIQUE,
        PASSWORD VARCHAR (50),
        LAST_PAYMENT date);
        `);
        client.query(`
        CREATE TABLE IF NOT EXISTS LOGIN (
          ID serial,
          USUARIO VARCHAR (50) UNIQUE,
          SENHA VARCHAR (50)
        );
        `);

    }
// callback - checkout a client
pool.connect((err, client, done) => {
    if (err) throw err
    
    createTables(client);
    logger.info('Database connected'); 

  })
  

    const wrapper = (query, params = []) => pool.query(query, params);
    return {
        query: wrapper
    }
})();