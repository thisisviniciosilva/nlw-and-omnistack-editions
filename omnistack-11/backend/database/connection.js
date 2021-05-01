const knex = require('knex');
const knexfile = require('../knexfile');

const config =
  process.env.NODE_ENV === 'test' ? knexfile.test : knexfile.development;

const connection = knex(config);

module.exports = connection;
