
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { User } = require('../../db/models');
const { Spot } = require('../../db/models');


const router = express.Router();
