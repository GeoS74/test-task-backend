const { Pool } = require('pg');

const config = require('../config');
const logger = require('./logger');

const data = {
  user: config.postgres.user,
  host: config.postgres.host,
  database: '',
  password: config.postgres.password,
  port: config.postgres.port,
};

(async () => {
  let pool = new Pool(data);

  // dropped database
  if (process.argv[2] === '--drop') {
    await pool.query(`DROP DATABASE ${config.postgres.database}`)
      .then(() => logger.info(`database "${config.postgres.database}" dropped`))
      .catch((error) => logger.warn(error.message))
      .finally(() => process.exit());
  }

  // created database
  await pool.query(`CREATE DATABASE ${config.postgres.database}`)
    .then(() => logger.info(`create database "${config.postgres.database}"`))
    .catch((error) => logger.warn(error.message));

  // connect new database
  data.database = config.postgres.database;
  pool = new Pool(data);

  // created tables
  await pool.query(`
    CREATE TABLE companies (
      id SERIAL PRIMARY KEY,
      inn TEXT UNIQUE NOT NULL,
      address  TEXT,
      tel TEXT,
      title TEXT
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  await pool.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      title TEXT UNIQUE NOT NULL
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  await pool.query(`
    CREATE TABLE stocks (
      id SERIAL PRIMARY KEY,
      id_company INTEGER NOT NULL REFERENCES companies ON DELETE CASCADE
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  await pool.query(`
    CREATE TABLE leftovers (
      id SERIAL PRIMARY KEY,
      id_stock INTEGER NOT NULL REFERENCES stocks ON DELETE CASCADE,
      id_product INTEGER NOT NULL REFERENCES products ON DELETE CASCADE
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  await pool.query(`
    CREATE TABLE shops (
      id SERIAL PRIMARY KEY,
      title TEXT UNIQUE NOT NULL
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  await pool.query(`
    CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  await pool.query(`
    CREATE TABLE sales (
      id SERIAL PRIMARY KEY,
      id_customer INTEGER NOT NULL REFERENCES customers ON DELETE CASCADE,
      id_shop INTEGER NOT NULL REFERENCES shops ON DELETE CASCADE,
      id_company INTEGER NOT NULL REFERENCES companies ON DELETE CASCADE,
      id_product INTEGER NOT NULL REFERENCES products ON DELETE CASCADE
    );
  `)
    .then(() => logger.info('create table "companies"'))
    .catch((error) => logger.warn(error.message));

  logger.info('database init complete');
  process.exit();
})();
