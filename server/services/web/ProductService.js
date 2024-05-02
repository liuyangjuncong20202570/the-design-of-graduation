const ProductModel = require('../../models/ProductModel.js');

const ProductService = {
  getAll: async () => {
    return ProductModel.find();
  },
  getFresh: async ({ category }) => {
    return await ProductModel.find({ category, isPublish: 1 }).sort({ editTime: -1 });
  },
  getSingle: async ({ _id }) => {
    return await ProductModel.find({ _id });
  }
};

module.exports = ProductService;
