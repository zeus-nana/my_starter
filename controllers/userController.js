const express = require('express');
const db = require('../db/db');

const getAllUsers = (req, res) => {
  res.send('Get all users');
};

const getUser = (req, res) => {
  res.send('Get user');
};

const createUser = async (req, res, next) => {
  console.log('ok');

  const newUser = req.body;

  // Validation
  if (!(await isValidUser(newUser))) {
    return res.status(400).send('Invalid user');
  }

  // Check if user already exists
  const userExists = await checkUserExists(newUser.email);
  if (userExists) {
    return res.status(400).send('User already exists');
  }

  // Create user
  await db('users').insert(newUser);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};

const updateUser = (req, res) => {
  res.send('Update user');
};

const deleteUser = (req, res) => {
  res.send('Delete user');
};

const checkUserExists = async (email, next) => {
  const user = await db('users').where({ email }).first();
  return user;
};

/*
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
 */

//User Validation
const isValidUser = async (body) => {
  return !(
    !body.username ||
    !body.password ||
    !body.email ||
    !body.function ||
    !body.role
  );
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
