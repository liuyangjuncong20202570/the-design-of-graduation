const ProductModel = require('../../models/ProductModel.js');

const ProductService = {
  add: async ({ price, title, category, content, cover, isPublish, editTime }) => {
    const newData = await ProductModel.create({
      price,
      title,
      category,
      content,
      cover,
      isPublish,
      editTime
    });
    return newData._id;
  },
  getList: async ({ _id }) => {
    return _id ? ProductModel.find({ _id }) : ProductModel.find({});
  },
  isPublish: async ({ _id, isPublish, editTime }) => {
    return ProductModel.updateOne(
      { _id },
      {
        isPublish,
        editTime
      }
    );
  },
  delList: async ({ _id }) => {
    return ProductModel.deleteOne({ _id });
  },
  updList: async ({ _id, title, category, content, cover, editTime }) => {
    if (cover) {
      return ProductModel.updateOne({ _id }, { title, category, content, cover, editTime });
    } else {
      return ProductModel.updateOne({ _id }, { title, category, content, editTime });
    }
  }
};

module.exports = ProductService;
