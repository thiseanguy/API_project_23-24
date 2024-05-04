const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Booking } = require('../../db/models');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { validationResult } = require('express-validator');

const router = express.Router();

//restores the user object from the JWT toke
router.use(restoreUser);

//Get all current user's bookings
router.get('/current',
requireAuth,
async (req, res) => {
    try{
        const userId = req.user.id;

        const bookings = await Booking.findAll({
            where:  {
                userId: userId
            },
            include: [
                {
                  model: Spot,
                  attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
                }
              ]
        })

        // res format
        const resBookings = bookings.map(booking => ({
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
                id: booking.Spot.id,
                ownerId: booking.Spot.ownerId,
                address: booking.Spot.address,
                city: booking.Spot.city,
                state: booking.Spot.state,
                country: booking.Spot.country,
                lat: booking.Spot.lat,
                lng: booking.Spot.lng,
                name: booking.Spot.name,
                description: booking.Spot.description,
                price: booking.Spot.price,
                createdAt: booking.Spot.createdAt,
                updatedAt: booking.Spot.updatedAt,
                avgRating: booking.Spot.avgRating,
                previewImage: booking.Spot.previewImage
            },
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }));

        res.json({ Bookings: resBookings });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/:bookingId',
requireAuth,
async (req, res) => {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    const userId = req.user.id;

    try {
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if(booking.userId !== userId) {
            return res.status(401).json({ error: "you are not authorized to edit this review"})
        }

        await booking.destroy();

        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
