const ProductModel = require('../../models/ProductModel.js');

const ProductService = {
  add: async ({ title, category, content, detail, cover, price, editTime }) => {
    return ProductModel.create({ title, category, content, detail, cover, price, editTime });
  },
  getList: async ({ _id }) => {
    return _id ? ProductModel.find({ _id }) : ProductModel.find({});
  },
  // listPublish: async ({ _id, isPublish, editTime }) => {
  //   return NewsModel.updateOne(
  //     { _id },
  //     {
  //       isPublish,
  //       editTime
  //     }
  //   );
  // },
  delList: async _id => {
    return ProductModel.deleteOne({ _id });
  },
  updList: async ({ _id, category, content, detail, cover, editTime }) => {
    if (cover) {
      return ProductModel.updateOne({ _id }, { category, content, detail, cover, editTime });
    } else {
      return ProductModel.updateOne({ _id }, { category, content, detail, editTime });
    }
  }
};

module.exports = ProductService;
