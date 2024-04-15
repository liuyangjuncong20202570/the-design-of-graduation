const ProductService = require('../../services/admin/ProductService.js');
const ProductController = {
  add: async (req, res) => {
    // 调用service对数据库进行增删改查
    const cover = req.file ? `/productuploads/${req.file.filename}` : '';
    const { title, category, content, detail, price } = req.body;
    try {
      await ProductService.add({
        title,
        category,
        content,
        detail,
        cover,
        price,
        editTime: new Date()
      });
      res.send({
        ActionType: 'OK'
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
  // listPublish: async (req, res) => {
  //   const result = await NewsService.listPublish({
  //     ...req.body,
  //     editTime: new Date()
  //   });
  //   if (result) {
  //     res.send({
  //       ActionType: 'OK'
  //     });
  //   }
  // },
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
    const { title, category, content, detail, _id } = req.body;
    var result = await ProductService.updList({
      _id,
      title,
      category,
      content,
      detail,
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
