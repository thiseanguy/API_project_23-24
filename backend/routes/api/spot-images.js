const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

//restores the user object from the JWT toke
router.use(restoreUser);
router.get('/:imageId',
requireAuth,
async (req, res) => {
    const imageId = req.params.imageId;
    const image = await SpotImage.findByPk(imageId);

    return res.status(200).json({ image });
});

//Delete a spot image
router.delete('/:imageId',
requireAuth,
async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const image = await SpotImage.findByPk(imageId);

    if (!image) {
        return res.status(404).json({ error: 'SpotImage not found' });
    }
    const imageSpot = await Spot.findByPk(image.spotId)





    if(imageSpot.ownerId !== userId) {
        return res.status(401).json({ error: "you are not authorized to edit this spot"})
    }

    await image.destroy();

    return res.status(200).json({ message: 'SpotImage deleted successfully' });

});


module.exports = router;
