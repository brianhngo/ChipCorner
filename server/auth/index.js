const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token: token });
  } catch (err) {
    res.status(err.status || 401).send({ error: err.message });
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.create(username, password);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.get('/checkAdminStatus', async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const userData = await User.findByToken(token);
      console.log('userData.admin', userData.admin);
      if (userData.admin === true) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
