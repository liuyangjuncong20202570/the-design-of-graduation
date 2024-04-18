const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user模型 ===> user集合（user表 ）
const productType = {
  title: { type: String, required: true, unique: true }, //商品名
  category: { type: Number, required: true }, //商品类别
  content: String, //商品内容
  cover: String, //封面
  isPublish: Number, //是否发布一开始默认不发布为0
  editTime: Date //编辑时间
};
// 创建use实例
const ProductModel = mongoose.model('product', new Schema(productType));

module.exports = ProductModel;
