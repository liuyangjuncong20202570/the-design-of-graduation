const ProductTypeModel = require('../../models/ProductTypeModel');

const ProductTypeService = {
  addInfos: async ({ type, _id }) => {
    console.log(type);
    return ProductTypeModel.create({
      size: type,
      slideCovers: null,
      productId: _id
    });
  },
  addImages: async ({ _id, slideCovers }) => {
    console.log(slideCovers, _id);
    // const id = new ObjectId(_id);
    try {
      console.log('111');
      return await ProductTypeModel.updateOne({ productId: _id }, { slideCovers });
    } catch (error) {
      console.log(error);
      return;
    }
  },
  delList: async ({ productId }) => {
    return ProductTypeModel.deleteOne({ productId });
  },
  getType: async ({ productId }) => {
    return ProductTypeModel.find({ productId });
  }
};

module.exports = ProductTypeService;
