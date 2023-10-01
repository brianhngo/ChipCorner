const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Orders },
} = require('../db');

router.put('/orderHistory', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const orderHistory = await Orders.findAll({
      where: {
        userId: userId,
      },
    });
    const sortedData = orderHistory.sort((a, b) => a.id - b.id);
    res.status(200).json(sortedData);
  } catch (err) {
    next(err);
  }
});

router.put('/orderHistoryIndividual', async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const orderHistory = await Orders.findAll({
      where: {
        id: orderId,
      },
    });

    res.status(200).json(orderHistory);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll();
    const sortedData = orders.sort((a, b) => a.id - b.id);
    res.status(200).json(sortedData);
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
    const totalAmount = req.body.data.totalAmount;
    const newOrder = await Orders.create({
      orderInfo: cart,
      userInfo: userInfo,
      userId: userId,
      totalAmount: totalAmount,
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
