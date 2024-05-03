'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 4,
        review: "this place in non-corporeal so not a lot of room but also a lot of room",
        stars: 4
      },
      {
        userId: 2,
        spotId: 3,
        review: "this sure is a review",
        stars: 2
      },
      {
        userId: 2,
        spotId: 4,
        review: "oh yeah, I've been here",
        stars: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2 ] }
    }, {});
  }
};
