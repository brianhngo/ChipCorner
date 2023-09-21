const router = require('express').Router();
const {
  models: { User },
} = require('../db');

router.use('/users', require('./users'));
router.use('/chips', require('./chips'));
router.use('/stripe', require('./stripe'));
router.use('/order', require('./order'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
