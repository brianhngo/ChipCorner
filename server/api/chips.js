const router = require('express').Router();
const {
  models: { Chips },
} = require('../db');
const { Op } = require('sequelize');
const { Chip } = require('@mui/material');

router.get('/', async (req, res, next) => {
  try {
    const chips = await Chips.findAll();
    res.status(200).json(chips.sort((a, b) => a.id - b.id));
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

// PUT- individual chip id from Order History

router.put('/orderHistoryChips', async (req, res, next) => {
  try {
    const { chipData } = req.body;

    const data = await Chips.findAll({
      where: {
        id: {
          [Op.or]: chipData,
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
});

// PUT /chips/getAdminSingleProductData individual CHIP for Admin Page
router.put('/getAdminSingleProductData', async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await Chips.findAll({
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch {
    console.error(error);
  }
});

// PUT /chips/saveAdminSingleProductData individual CHIP for Admin Page
router.put('/saveAdminSingleProduct', async (req, res, next) => {
  try {
    const { chipData } = req.body;
    const chip = await Chips.findOne({
      where: {
        id: chipData.id,
      },
    });
    const updatedChip = await chip.update(chipData);
    res.status(200).json(updatedChip);
  } catch (error) {
    console.error(error);
  }
});

router.put('/addNewProduct', async (req, res, next) => {
  try {
    const { chipData } = req.body;
    const chip = await Chips.create({
      title: chipData.title,
      description: chipData.description,
      brand: chipData.brand,
      size: chipData.size,
      baked: chipData.baked,
      ingredients: chipData.ingredients,
      nutritional: chipData.nutritional,
      imageUrl: chipData.imageUrl,
      price: chipData.price,
    });
    res.status(200).json(chip);
  } catch (error) {
    console.error(error);
  }
});

router.put('/deleteAdminSingleProduct', async (req, res, next) => {
  try {
    const { id } = req.body;
    const rowDeleted = await Chips.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(id);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
});

//GET individual chip

router.get('/:id', async (req, res, next) => {
  try {
    const chip = await Chips.findByPk(req.params.id);

    if (chip) {
      res.json(chip);
    } else {
      res.status(404).send('Chip not found');
    }
  } catch (error) {
    // Handle any potential errors here
    next(error);
  }
});

//POST new chip
router.post('/', async (req, res, next) => {
  try {
    const {
      title,
      description,
      brand,
      size,
      price,
      baked,
      ingredients,
      imageUrl,
    } = req.body;
    const newChip = await Chips.create({
      title,
      description,
      brand,
      size,
      price,
      baked,
      ingredients,
      imageUrl,
    });

    res.status(201).json(newChip);
  } catch (err) {
    next(err, 'this is the error');
  }
});

//DELETE chip
router.delete('/:chipId', async (req, res, next) => {
  try {
    const chip = await Chips.findByPk(req.params.chipId);
    if (chip) {
      await chip.destroy();
      res.status(204).send('Chip deleted');
    } else {
      res.status(404).send('Chip not found');
    }
  } catch (err) {
    next(err);
  }
});

//Get Cart Data PUT Route

router.put('/cartData', async (req, res, next) => {
  try {
    const { array } = req.body;
    if (array.length < 1) {
      return res.status(200).json(null);
    }
    const data = await Chips.findAll({
      where: {
        id: {
          [Op.or]: array,
        },
      },
    });

    res.status(200).json(data);
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
      res.status(404).send('Chip not found');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
