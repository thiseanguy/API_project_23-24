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

router.post('/:spotId/images', async (req, res) => {
    const { spotId } = req.params;
    const { images } = req.body;

    try {
      const spot = await Spot.findByPk(spotId);

      if (!spot) {
        return res.status(404).json({ error: 'Spot not found' });
      }

      const spotImages = await Promise.all(
        images.map(async (image) => {
          const newImage = await SpotImage.create({
            spotId,
            url: image.url,
            preview: image.preview || false
          });
          return newImage;
        })
      );

      res.status(201).json(spotImages);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add images' });
    }
  });

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
