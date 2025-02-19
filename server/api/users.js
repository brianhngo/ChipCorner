const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { User, Chips },
} = require('../db');
const { requireToken, isAdmin } = require('./adminAuth');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/adminUsersList', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users.sort((a, b) => a.id - b.id));
  } catch (err) {
    next(err);
  }
});

router.put('/adminUserInfo', async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findAll({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//changing Admin Status
router.put('/saveAdminSingleUser', async (req, res, next) => {
  try {
    const { id, admin } = req.body;

    const user = await User.findOne({ where: { id: id } });
    if (user) {
      const updateUser = await user.update({
        admin: admin,
      });
      if (admin === true) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/deleteAdminUser', async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    await user.destroy();
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// updating profile
router.put('/updateprofile', async (req, res, next) => {
  try {
    const { firstname, lastname, phone, token } = req.body;
    const user = await User.findByToken(token);
    if (user) {
      const updateUser = await user.update({
        firstname: firstname || null,
        lastname: lastname || null,
        phone: phone || null,
      });
      res.send(true);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// getProfileData
router.put('/getprofiledata', async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findByToken(token);
    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// updating profile
router.put('/updateprofile2', async (req, res, next) => {
  try {
    const { address, zipcode, city, state, country, token } = req.body;
    const user = await User.findByToken(token);
    if (user) {
      const updateUser = await user.update({
        address: address || null,
        zipcode: zipcode || null,
        city: city || null,
        state: state || null,
        country: country || null,
      });
      res.send(true);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/getUsersChipData', async (req, res, next) => {
  try {
    const { listOfChips } = req.body;
    const chipData = await Chips.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: listOfChips,
        },
      },
    });
    res.status(200).json(chipData);
  } catch (error) {
    console.error(error);
  }
});

// get bookmark

router.put('/bookmarksdata', async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findByToken(token);
    const objectData = Object.values(user.bookmark).filter(
      (element) => element !== null
    );
    const chipData = await Chips.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: objectData,
        },
      },
    });
    res.status(200).json(chipData);
  } catch (error) {
    console.log(error);
  }
});

// update bookmark
router.put('/bookmark', async (req, res, next) => {
  try {
    const { userId, id, status } = req.body;
    const user = await User.findByPk(userId);
    if (user) {
      if (status === 'add') {
        const bookmarkColumn = user.bookmark || {};
        bookmarkColumn[id] = id;
        // Update the 'bookmark' property of the 'user' instance
        await user.update({ bookmark: null });
        await user.update({ bookmark: bookmarkColumn });
      } else {
        const bookmarkColumn = user.bookmark || {};
        bookmarkColumn[id] = null;
        await user.update({ bookmark: null });
        await user.update({ bookmark: bookmarkColumn });
      }
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET individual user by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
});

//POST new user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

//DETLE user (individual)
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
});

// PUT Need to check if the information the user inputs (username && email ) doesn't exist in DB
router.put('/verifyNewUserInputs', async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = await User.findAll({
      where: {
        username: username,
        email: email,
      },
    });
    if (user.length >= 1) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    next(error);
  }
});

//PUT user (individual) - update
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const updatedUser = await user.update(req.body);
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
});
