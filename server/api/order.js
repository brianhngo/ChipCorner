const router = require('express').Router();
const {
  models: { Orders },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//GET individual order
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Orders.findByPk(req.params.orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    next(err);
  }
});

//POST new order
router.post('/', async (req, res, next) => {
  try {
    const cart = req.body.data.cart;
    const userInfo = req.body.data.userInfo;
    const userId = req.body.data.userId;
    console.log('req.body', req.body);
    console.log(cart);
    console.log(userInfo);
    console.log(userId);
    const newOrder = await Orders.create({
      orderInfo: cart,
      userInfo: userInfo,
      userId: userId,
    });
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

//DELETE order
router.delete('/:orderId', async (req, res, next) => {
  try {
    const order = await Orders.findByPk(req.params.orderId);
    if (order) {
      await order.destroy();
      res.status(204).send('Order deleted');
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    next(err);
  }
});

//PUT order - update
router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Orders.findByPk(req.params.orderId);
    if (order) {
      const updatedOrder = await order.update(req.body);
      res.json(updatedOrder);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
