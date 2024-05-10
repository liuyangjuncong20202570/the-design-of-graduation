const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderType = {
  receiver: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  products: Array,
  gestId: {
    type: Schema.Types.ObjectId,
    ref: 'gests'
  },
  deliverTime: Number,
  payWay: Number,
  totalPrice: Number,
  count: Number
};

const OrderModel = mongoose.model('order', new Schema(orderType));

module.exports = OrderModel;
