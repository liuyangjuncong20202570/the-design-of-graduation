const ProductInfoService = require('../../services/admin/ProductInfoService.js');

const ProductInfoController = {
  add: async (req, res) => {
    const { price, productAge, productBrand, productMteri, productType, totalStore, _id } =
      req.body;
    try {
      await ProductInfoService.add({
        price,
        productAge,
        productBrand,
        productMteri,
        productType,
        totalStore,
        _id
      });
      res.send({
        ActionType: 'OK'
      });
      return;
    } catch (error) {
      res.send({
        ActionType: 'error',
        error
      });
      return;
    }
  },
  delList: async (req, res) => {
    const result = await ProductInfoService.delList({ productId: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    } else {
      res.send({
        ActionType: 'error'
      });
    }
  }
};

module.exports = ProductInfoController;
