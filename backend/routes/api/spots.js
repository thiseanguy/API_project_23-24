
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { User } = require('../../db/models');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
try {
    const spots = await Spot.findAll();

    const response = {
        Spots: spots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.avgRating,
        previewImage: spot.previewImage
        }))
    };

    res.status(200).json(response);
} catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


module.exports = router;
