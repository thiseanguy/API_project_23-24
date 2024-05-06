'use strict';


const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        id: 1,
        reviewId: 1,
        url: "demo rev-image"
      },
      {
        id: 2,
        reviewId: 2,
        url: "second demo rev-image"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2 ] }
    }, {});
  }
};
