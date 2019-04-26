require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const { getUser, getPost, getComment, getComments } = require('../data/dataHelpers');

describe('aggregation tests', () => {

  it.only('gets the popular users', () =>{
    getUser();
    getPost();
    getComment();
  });
});
