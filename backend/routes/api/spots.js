
const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { User } = require('../../db/models');
const { Spot } = require('../../db/models');

//const { check } = require('express-validator');
//const { handleValidationErrors } = require('../../utils/validation');

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
        //const userId = req.user.id;

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
                return res.status(404).json({ error: 'Spot not found' });
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




module.exports = router;
