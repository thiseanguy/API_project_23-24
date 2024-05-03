'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
        avgRating: 4.5,
        previewImage: "image url"
      },
      {
        ownerId: 2,
        address: "126 proseco ln",
        city: "Francetown",
        state: "Texas",
        country: "United States of America",
        lat: 44.7657358,
        lng: -120.5629327,
        name: "Wine House",
        description: "There's wine here. We make wine in the backyard",
        price: 250,
        avgRating: 3.5,
        previewImage: "image url"
      },
      {
        ownerId: 3,
        address: "757 Damalco rd",
        city: "Boston",
        state: "Massahachoosits",
        country: "United States of America",
        lat: 42.3640058,
        lng: -71.0527467,
        name: "Big Bean Bungalow",
        description: "This is where all the baked beans live",
        price: 40,
        createdAt: "2010-06-20 20:39:36",
        updatedAt: "2010-06-20 20:39:36",
        avgRating: 2,
        previewImage: "image url"
      },
      {
        ownerId: 4,
        address: "444 quatro qtr",
        city: "barberville",
        state: "Lousianna",
        country: "United States of America",
        lat: 29.9584058,
        lng: 90.0644467,
        name: "Four Gettaboutit",
        description: "They Needed a Fourth Spot",
        price: 44,
        createdAt: "2024-04-04 20:39:36",
        updatedAt: "2024-04-04 20:39:36",
        avgRating: 4,
        previewImage: "image url"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy', "Wine House", "Big Bean Bungalow", "Four Gettaboutit" ] }
    }, {});
  }
};
