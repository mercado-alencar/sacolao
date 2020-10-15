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
    ssl: { rejectUnauthorized: false },
    showLogs: process.env.DB_SHOW_LOG,
    dialect: 'postgres',
    dialectOptions: {
      "ssl": { "require": true }
    }
  };

  const pool = new Pool(options);

  const createTables = (client) => {
    if(process.env.DB_RESET === 1) {

    client.query(`CREATE SCHEMA IF NOT EXISTS MERCADO_ALENCAR`);
    client.query(`DROP TABLE MERCADO_ALENCAR.VENDA`);
    client.query(`
        CREATE TABLE IF NOT EXISTS MERCADO_ALENCAR.VENDA (
        ID serial,
        NOME VARCHAR (50),
        TELEFONE VARCHAR (50),
        SACOLAO VARCHAR (50),
        COMPRAS VARCHAR (50),
        ENDERECO VARCHAR (150),
        NUMERO VARCHAR (10),
        REFERENCIA VARCHAR (150),
        BAIRRO VARCHAR (50),
        RECEBER BOOLEAN,
        LEVAR_TROCO BOOLEAN,
        CARTAO BOOLEAN,
        TROCO_PARA VARCHAR (50),
        OBS VARCHAR (150),
        DATA VARCHAR (50),
        HORA VARCHAR (50),
        ENTREGUE BOOLEAN
        )
        `);
     client.query(`
        CREATE TABLE IF NOT EXISTS MERCADO_ALENCAR.SORTEIO (
        ID serial,
        NOME VARCHAR (50),
        TELEFONE VARCHAR (50),
        DATA VARCHAR (50)
        )
        `);
    }

  }
  // callback - checkout a client
  pool.connect((err, client, done) => {
    if (err) throw err

    createTables(client);
    logger.info('Database connected');

  })


  const wrapper = (query, params = []) => {
    if (new Boolean(options.showLogs)) {
      logger.info('EXECUTE QUERY ' + query);
    }
    return pool.query(query, params)
  };

  return {
    query: wrapper
  }
})();
