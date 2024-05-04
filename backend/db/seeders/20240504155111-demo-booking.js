'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        id: 1,
        spotId: 1,
        userId: 2,
        startDate:"2021-11-19",
        endDate: "2021-11-20",
      },
      {
        id: 2,
        spotId: 2,
        userId: 3,
        startDate:"2021-10-05",
        endDate: "2021-10-10",
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2 ] }
    }, {});
  }
};
