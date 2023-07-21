const router = require('express').Router();
const {
  models: { Chips },
} = require('../db');
const { Op } = require('sequelize');

// GET localhost:3000/api/chips/
router.get('/', async (req, res, next) => {
  try {
    const data = await Chips.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

const landingPageChipId = [2, 4, 6, 8, 10, 12];

// get localhost:3000/api/chips/landingPage
router.get('/landingPage', async (req, res, next) => {
  try {
    const data = await Chips.findAll({
      where: {
        id: {
          [Op.or]: landingPageChipId,
        },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleChipInfo = await Chips.findByPk(req.params.id);
    res.json(singleChipInfo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
