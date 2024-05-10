const OrderService = require('../../services/web/OrderService.js');

const OrderController = {
  addOrder: async (req, res) => {
    try {
      const {
        receiver,
        phoneNumber,
        address,
        products,
        gestId,
        deliverTime,
        payWay,
        totalPrice,
        count
      } = req.body;
      const orderId = await OrderService.addOrder({
        receiver,
        phoneNumber,
        address,
        products,
        gestId,
        deliverTime: Number(deliverTime),
        payWay: Number(payWay),
        totalPrice: Number(totalPrice),
        count: Number(count)
      });
      console.log(orderId);
      res.send({
        ActionType: 'OK',
        _id: orderId
      });
    } catch (error) {
      console.log(error);
      res.send({
        ActionType: 'error'
      });
    }
  },
  getOrder: async (req, res) => {
    try {
      const result = await OrderService.getOrder({ _id: req.params.id });
      if (result) {
        res.send({
          ActionType: 'OK',
          data: result[0]
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        ActionType: 'error'
      });
    }
  }
};

module.exports = OrderController;
