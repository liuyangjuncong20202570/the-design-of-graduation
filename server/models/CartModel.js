const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartType = {
  count: Number, //购买数量
  price: Number, //价格
  size: Array, //商品sku
  store: Number, //商品库存
  isPurchase: Number, //是否结算
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  gestId: {
    type: Schema.Types.ObjectId,
    ref: 'gests'
  }
};

const CartModel = mongoose.model('cart', new Schema(cartType));

module.exports = CartModel;
