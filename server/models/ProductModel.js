const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user模型 ===> user集合（user表 ）
const productType = {
  title: { type: String, required: true, unique: true },
  category: { type: Number, required: true }, //商品类别
  content: String,
  detail: mongoose.Schema.Types.Mixed, //类别，用1，2，3控制
  cover: String, //封面者
  price: Number, //价格
  editTime: Date
};
// 创建use实例
const ProductModel = mongoose.model('product', new Schema(productType));

module.exports = ProductModel;
