const ProductService = require('../../services/admin/ProductService.js');
const ProductController = {
  add: async (req, res) => {
    // 调用service对数据库进行增删改查
    const cover = req.file ? `/productuploads/${req.file.filename}` : '';
    console.log(req.file);
    const { price, title, category, content } = req.body;
    try {
      const _id = await ProductService.add({
        price: Number(price),
        title,
        category: Number(category),
        content,
        cover,
        isPublish: 0,
        editTime: new Date()
      });
      res.send({
        ActionType: 'OK',
        _id
      });
      return;
    } catch (error) {
      res.send({
        ActionType: 'NO',
        error
      });
      return;
    }
  },
  getList: async (req, res) => {
    const result = await ProductService.getList({
      _id: req.params.id
    });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    }
  },
  isPublish: async (req, res) => {
    const { _id, isPublish } = req.body;
    const result = await ProductService.isPublish({
      _id,
      isPublish,
      editTime: new Date()
    });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    }
  },
  delList: async (req, res) => {
    const result = await ProductService.delList({ _id: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    }
  },
  updList: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : '';
    const { title, category, content, _id } = req.body;
    var result = await ProductService.updList({
      _id,
      title,
      category,
      content,
      cover,
      editTime: new Date()
    });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    }
  }
};

module.exports = ProductController;
