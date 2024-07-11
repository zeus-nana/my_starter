/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

const { onUpdateTrigger } = require('../knexfile');

exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email').unique().notNullable();
      table.string('function').notNullable();
      table.string('role').notNullable();
      table.integer('user_id').references('id').inTable('users');
      table.timestamps(true, true);
    })
    .then(() => knex.raw(onUpdateTrigger('users')));
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
