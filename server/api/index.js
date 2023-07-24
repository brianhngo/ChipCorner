const router = require('express').Router();
const {
  models: { User },
} = require('../db');

//middleware for checking admin user
const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const user = await User.findByToken(token);
    if (user && user.isAdmin()) {
      next();
    } else {
      res.status(403).send('Only Admin can access');
    }
  } catch (error) {
    res.status(401).send('Unauthorized: only accessible for Admin');
  }
};

router.use('/users', isAdmin, require('./users'));
router.use('/chips', require('./chips'));
// router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;