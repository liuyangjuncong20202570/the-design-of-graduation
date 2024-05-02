const ProductInfoService = require('../../services/admin/ProductInfoService.js');

const ProductInfoController = {
  add: async (req, res) => {
    const { productAge, productBrand, productMteri, productType, totalStore, _id } = req.body;
    try {
      await ProductInfoService.add({
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
  },
  getInfo: async (req, res) => {
    const result = await ProductInfoService.getInfo({ productId: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    } else {
      res.send({
        ActionType: 'error',
        code: '508'
      });
    }
  }
};

module.exports = ProductInfoController;
