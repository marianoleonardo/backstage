const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  user: config.postgres_user,
  host: config.postgres_host,
  database: config.postgres_database,
  password: config.postgres_password,
  port: config.postgres_port,
});

const userPool = new Pool({
  user: config.postgres_backstage_user,
  host: config.postgres_backstage_host,
  database: config.postgres_backstage_databases,
  password: config.postgres_backstage_pwd,
  port: config.postgres_backstage_port,
});

module.exports = {pool, userPool};
