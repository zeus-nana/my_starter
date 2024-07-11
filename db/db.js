const knex = require('knex');
const knexfile = require('./knexfile');
const db = knex(knexfile[process.env.NODE_ENV]);

db.raw('select 1+1 as result').then((data) => {
  console.log(data.rows[0].result);
});

module.exports = db;
