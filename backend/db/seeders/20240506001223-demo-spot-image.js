'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 2,
        url: "demo image",
        preview: true
      },
      {
        spotId: 2,
        url: "second demo image",
        preview: true
      },
      {
        spotId: 4,
        url: "third demo image",
        preview: true
      },
      {
        spotId: 4,
        url: "scary web",
        preview: true
      },
      {
        spotId: 4,
        url: "belis",
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [ 1, 2, 3, 4, 5 ] }
    }, {});
  }
};
