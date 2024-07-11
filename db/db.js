const knex = require('knex');
const knexfile = require('./knexfile');
const db = knex(knexfile.development);

db.raw('select 1+1 as result').then((data) => {
  console.log(data.rows[0].result);
});

module.exports = db;
