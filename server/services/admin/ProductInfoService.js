const ProductInfoModel = require('../../models/ProductInfoModel');

const ProductInfoService = {
  add: async ({ price, productAge, productBrand, productMteri, productType, totalStore, _id }) => {
    return ProductInfoModel.create({
      price,
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
  }
};

module.exports = ProductInfoService;
