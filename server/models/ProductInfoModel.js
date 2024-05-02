const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user模型 ===> user集合（user表 ）
const productInfoType = {
  productAge: String, //适用人群
  productBrand: String, //产品品牌
  productMteri: String, //产品原料
  productType: String, //产品类型
  totalStore: Number, //总库存
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  }
};
// 创建use实例
const ProductInfoModel = mongoose.model('productInfo', new Schema(productInfoType));

module.exports = ProductInfoModel;
