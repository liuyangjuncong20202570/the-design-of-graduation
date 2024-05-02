const ProductInfoModel = require('../../models/ProductInfoModel');

const ProductInfoService = {
  add: async ({ productAge, productBrand, productMteri, productType, totalStore, _id }) => {
    return ProductInfoModel.create({
      productAge,
      productBrand,
      productMteri,
      productType,
      totalStore,
      productId: _id
    });
  },
  delList: async ({ productId }) => {
    return ProductInfoModel.deleteOne({ productId });
  },
  getInfo: async ({ productId }) => {
    return ProductInfoModel.find({ productId });
  }
};

module.exports = ProductInfoService;
