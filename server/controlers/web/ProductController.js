const ProductService = require('../../services/web/ProductService.js');

const ProductController = {
  getAll: async (req, res) => {
    const result = await ProductService.getAll();
    if (result.length || result.length === 0) {
      res.send({
        ActionType: 'OK',
        code: '200',
        msg: '获取成功',
        data: result
      });
    } else {
      res.send({
        ActionType: 'error',
        code: '405',
        msg: '数据获取失败',
        data: []
      });
    }
  },
  getFresh: async (req, res) => {
    const result = await ProductService.getFresh({ category: req.params.category });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    } else {
      res.send({
        ActionType: 'error',
        code: '501'
      });
    }
  },
  getSingle: async (req, res) => {
    const result = await ProductService.getSingle({ _id: req.params.id });
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

module.exports = ProductController;
