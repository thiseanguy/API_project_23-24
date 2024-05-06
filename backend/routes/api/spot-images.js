const express = require('express')
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const {User} = require('../../db/models');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');

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


        const spotImage = await SpotImage.findByPk(imageId);
        if (!spotImage) {
            return res.status(404).json({ error: "image could not be found"})
        }
        const spot = await Spot.findByPk(spotImage.spotId);

        if(userId !== spot.ownerId) {
            return res.status(401).json({ error: "you are not authorized to edit this review"})
        }

        await spotImage.destroy();

        return res.status(200).json({ message: 'spot-image deleted successfully' });
    }
)


module.exports = router;
