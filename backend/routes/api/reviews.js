const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { validationResult } = require('express-validator');

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

  //Add an Image to a Review based on reviewId
  router.post('/:reviewId/images',
  requireAuth,
  async (req, res) => {

    const { url } = req.body;
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const review = await Review.findByPk(reviewId);
    if(!review) {
      return res.status(404).json({ message: "Review could not be found" });
    };

    if(review.userId !== userId) {
      return res.status(401).json({ error: "you are not authorized to add images to this spot"})
    };

    const totalImages = await ReviewImage.count({
      where: { reviewId }
    });

    if (totalImages >= 10) {
      return res.status(403).json({ error: "Maximum image limit reached" });
    }

    const image = await ReviewImage.create({
      reviewId: reviewId,
      url: url,
    })

    const newReviewImage = {
      reviewId: reviewId,
      url: image.url
    }

    return res.status(200).json({newReviewImage});
  })

  //Edit a review
  const findReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const reviewUpdate = await Review.findByPk(reviewId);
    if (!reviewUpdate) {
      return res.status(404).json({ message: 'Review could not be found' });
    }
    req.reviewUpdate = reviewUpdate;
    next();
  };

  const validateReviewUpdate = [
    check('review')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars are required')
      .isInt({ min: 1, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),
      handleValidationErrors
  ];

  router.put('/:reviewId',
    requireAuth,
    findReview,
    validateReviewUpdate,
    async (req, res) => {

      const reviewId = req.params.reviewId;
      const reviewUpdate = await Review.findByPk(reviewId);
      // const { review, stars } = req.body;

      // // does review exist
      // if (!reviewUpdate) {
      //   return res.status(404).json({ message: 'Review could not be found' });
      // }
      // Authorize
      if (reviewUpdate.userId !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to edit this review' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().reduce((acc, error) => {
          acc[error.param] = error.msg;
          return acc;
        }, {});

        return res.status(400).json({
          message: 'Bad Request',
          errors: formattedErrors,
        });
      }

      // Update the review
      const { review, stars } = req.body;
      if (review) reviewUpdate.review = review;
      if (stars) reviewUpdate.stars = stars;
      await reviewUpdate.save();

      return res.status(200).json({ reviewUpdate });
    }
  )



module.exports = router;
