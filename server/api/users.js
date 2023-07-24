const router = require('express').Router();
const {
  models: { User },
} = require('../db');


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

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const isAdmin = token ? true : false;

    if (isAdmin) {
      // If the user is an admin, continue to the next middleware/route handler
      req.isAdmin = true;
      next();
    } else {
      // If the user is not an admin, respond with a 403 Forbidden status
      res.status(403).send('Access forbidden');
    }
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

router.get('/checkAdminStatus', isAdmin, async (req, res, next) => {
  try {
    // The isAdmin middleware would have added the `isAdmin` property to the request object
    const isAdmin = req.isAdmin;
    res.json({ isAdmin });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
