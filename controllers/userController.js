const express = require('express');
const db = require('../db/db');

const getAllUsers = (req, res) => {
  try {
    const users = db('users');
    return res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await db('users').where({ id: req.params.id }).first();
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    // Validation
    if (!(await isValidUser(newUser))) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing informations',
      });
    }

    // Check if user already exists
    const userExists = await checkUserExists(newUser.email);
    if (userExists) {
      return res.status(400).json({
        status: 'fail',
        message: 'This user (email) already exists',
      });
    }
    // Create user
    const createdUser = await db('users').insert(newUser, '*');

    return res.status(201).json({
      status: 'success',
      data: {
        user: createdUser[0],
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
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
