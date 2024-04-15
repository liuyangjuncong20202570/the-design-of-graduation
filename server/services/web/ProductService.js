const ProductModel = require('../../models/ProductModel.js');

const ProductService = {
  getAll: async () => {
    return ProductModel.find();
  }
};

module.exports = ProductService;
