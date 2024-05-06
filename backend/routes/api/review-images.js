const express = require('express')
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const {User} = require('../../db/models');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

router.use(restoreUser);

// delete spot-image
router.delete('/:imageId',
    requireAuth,
    async (req, res) => {
        const imageId = req.params.imageId;
        const userId = req.user.id


        const reviewImage = await ReviewImage.findByPk(imageId);
        if (!reviewImage) {
            return res.status(404).json({ error: "image could not be found"})
        }
        const review = await Review.findByPk(reviewImage.reviewId);

        if(userId !== review.userId) {
            return res.status(401).json({ error: "you are not authorized to edit this review"})
        }

        await reviewImage.destroy();

        return res.status(200).json({ message: 'review-image deleted successfully' });
    }
)

module.exports = router;
