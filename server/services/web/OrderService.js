const OrderModel = require('../../models/OrderModel');
const { ObjectId } = require('mongodb');

const OrderService = {
  addOrder: async ({
    receiver,
    phoneNumber,
    address,
    products,
    gestId,
    deliverTime,
    payWay,
    totalPrice,
    count
  }) => {
    const res = await OrderModel.create({
      receiver,
      phoneNumber,
      address,
      products,
      gestId,
      deliverTime,
      payWay,
      totalPrice,
      count
    });
    return res._id;
  },
  getOrder: async ({ _id }) => {
    return await OrderModel.find({ _id });
  }
};

module.exports = OrderService;
