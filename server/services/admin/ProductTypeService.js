const ProductTypeModel = require('../../models/ProductTypeModel');

const ProductTypeService = {
  add: async ({ size, _id, slideCovers }) => {
    return ProductTypeModel.create({
      size,
      productId: _id,
      slideCovers
    });
  },
  delList: async ({ productId }) => {
    return ProductTypeModel.deleteOne({ productId });
  }
};

module.exports = ProductTypeService;
