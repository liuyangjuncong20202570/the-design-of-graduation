const NewsService = require('../../services/admin/NewsService.js');
const NewsController = {
  add: async (req, res) => {
    // 调用service对数据库进行增删改查
    const cover = req.file ? `/newsuploads/${req.file.filename}` : '';
    const { title, content, category, isPublish, author } = req.body;
    await NewsService.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
      author
    });
    res.send({
      ActionType: 'OK'
    });
  },
  getList: async (req, res) => {
    const result = await NewsService.getList({
      _id: req.params.id,
      role: Number(req.body.role),
      author: req.body.username
    });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    }
  },
  listPublish: async (req, res) => {
    const result = await NewsService.listPublish({
      ...req.body,
      editTime: new Date()
    });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    }
  },
  delList: async (req, res) => {
    const result = await NewsService.delList({ _id: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    }
  },
  updList: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : '';
    const { title, content, category, isPublish, _id, author } = req.body;
    var result = await NewsService.updList({
      _id,
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
      author
    });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    }
  }
};

module.exports = NewsController;
