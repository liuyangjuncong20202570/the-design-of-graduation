const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productType = {
  size: String,
  slideCovers: String, //侧边栏
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  }
};

const ProductTypeModel = mongoose.model('productType', new Schema(productType));

module.exports = ProductTypeModel;
