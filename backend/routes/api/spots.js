
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

// const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

//restores the user object from the JWT toke
router.use(restoreUser);


// Get all spots
router.get('/', async (req, res) => {
try {
    const spots = await Spot.findAll();

    const resBody = {
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

    res.status(200);
    res.json(resBody);
} catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


router.get('/current', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        const spots = await Spot.findAll({
            where: {
                ownerId: userId
            }
        });


        const resBody = {
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


        res.status(200);
        res.json(resBody);
    } catch (error) {
        console.error('Error fetching spots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get spot details by id
router.get('/:spotId', async (req, res) => {
    try {
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({ error: "We couldn't find your spot" });
        }

        const resBody = {
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
        };

        res.status(200)
        res.json(resBody);
    } catch (error) {
        console.error('Error fetching spot:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
});


const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required.'),
    check('city')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('City is required.'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required.'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
      check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
      check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
      check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage('Name must be less than 50 characters'),
      check('description')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Description is required'),
      check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

//Create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const userId = req.user.id;
    const spot = await Spot.create({
        ownerId: userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    const newSpot = {
        id: spot.id,
        ownerId: userId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.name,
        price: spot.name,
      };

      const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    return res.status(201).json(newSpot)
})

//Add an image to a spot based on spot's Id
const validateSpotImage = [
    check('url')
      .exists({ checkFalsy: true })
      .withMessage('a valid url is required.'),
    check('preview')
      .exists({ checkFalsy: true })
      .isBoolean(true)
      .withMessage('preview must be true or false.'),
    handleValidationErrors
  ];
router.post('/:spotId/images',
requireAuth,
validateSpotImage,
async (req, res) => {

    const {url, preview} = req.body;
    const userId = req.user.id;

    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        return res.status(404).json({ error: "Spot couldn't be found" });
    }

    if(spot.ownerId !== userId) {
        return res.status(401).json({ error: "you are not authorized to add images to this spot"})
    }

    const image = await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview,
    });

    const newSpotImage = {
        url: image.url,
        preview: image.preview
    }

    return res.status(200).json(newSpotImage)
})

//Edit a spot
router.put('/:spotId',
requireAuth,
validateSpot,
async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spotId = req.params.spotId
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({ error: "Spot couldn't be found" });
    }

    if(spot.ownerId !== userId) {
        return res.status(401).json({ error: "you are not authorized to edit this spot"})
    }

    if (address) spot.address = address;
    if (city) spot.city = city;
    if (state) spot.state = state;
    if (country) spot.country = country;
    if (lat) spot.lat = lat;
    if (lng) spot.lng = lng;
    if (name) spot.name = name;
    if (description) spot.description = description;
    if (price) spot.price = price;

    await spot.save();

    return res.status(200).json(spot)
})

//Delete a spot
router.delete('/:spotId',
requireAuth,
async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const userId = req.user.id;



    try {
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({ error: 'Spot not found' });
        }
        if(spot.ownerId !== userId) {
            return res.status(401).json({ error: "you are not authorized to edit this spot"})
        }

        await spot.destroy();

        return res.status(200).json({ message: 'Spot deleted successfully' });
    } catch (error) {
        console.error('Error deleting spot:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
)

module.exports = router;
