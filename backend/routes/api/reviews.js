const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

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

//Get all reviews from current user
router.get('/current', requireAuth, async (req, res) => {
    try {
      const currentUserId = req.user.id;

      const reviews = await Review.findAll({
        where: {
          userId: currentUserId
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
          },
          {
            model: ReviewImage,
            attributes: ['id', 'url']
          }
        ]
      });

      // res format
      const resReviews = reviews.map(review => ({
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: {
          id: review.User.id,
          firstName: review.User.firstName,
          lastName: review.User.lastName
        },
        Spot: {
          id: review.Spot.id,
          ownerId: review.Spot.ownerId,
          address: review.Spot.address,
          city: review.Spot.city,
          state: review.Spot.state,
          country: review.Spot.country,
          lat: review.Spot.lat,
          lng: review.Spot.lng,
          name: review.Spot.name,
          price: review.Spot.price,
          previewImage: review.Spot.previewImage
        },
        ReviewImages: review.ReviewImages.map(image => ({
          id: image.id,
          url: image.url
        }))
      }));

      res.json({ Reviews: resReviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).send('Internal Server Error');
    }
  });



module.exports = router;
