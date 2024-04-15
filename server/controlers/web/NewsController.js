const NewsService = require('../../services/web/NewsService.js');
const NewsController = {
  getList: async (req, res) => {
    const { offset, limit, pagination } = req.body;
    const result = await NewsService.getList({ _id: req.params.id, offset, limit, pagination });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    }
  },
  getcateList: async (req, res) => {
    const result = await NewsService.getcateList({ category: req.params.category });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    }
  },
  getAuthor: async (req, res) => {
    const result = await NewsService.getAuthor({ username: req.body.username });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    }
  },
  getrelateNews: async (req, res) => {
    const result = await NewsService.getrelateNews({ author: req.body.author });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    }
  }
};

module.exports = NewsController;
