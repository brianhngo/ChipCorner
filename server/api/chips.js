const router = require('express').Router();
const {
    models: { Chips },
  } = require("../db"); 
  const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
    try {
      const chips = await Chips.findAll();
      res.json(chips);
    } catch (err) {
      next(err);
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

//GET individual chip
router.get('/:chipId', async (req, res, next) => {
    try {
      const chip = await Chips.findByPk(req.params.chipId);
      if(chip){
        res.json(chip);
      } else {
        res.status(404).send("Chip not found");
      }
    } catch (err) {
      next(err);
    }
});

//POST new chip
router.post('/', async (req, res, next) => {
    try {
      const newChip = await Chips.create(req.body);
      res.status(201).json(newChip);
    } catch (err) {
      next(err);
    }
  });

//DELETE chip
router.delete('/:chipId', async (req, res, next) => {
    try {
      const chip = await Chips.findByPk(req.params.chipId);
      if (chip) {
        await chip.destroy();
        res.status(204).send("Chip deleted");
      } else {
        res.status(404).send("Chip not found");
      }
    } catch (err) {
      next(err);
    }
  });

//PUT chip - update
router.put('/:chipId', async (req, res, next) => {
    try {
      const chip = await Chips.findByPk(req.params.chipId);
      if (chip) {
        const updatedChip = await chip.update(req.body);
        res.json(updatedChip);
      } else {
        res.status(404).send("Chip not found");
      }
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;