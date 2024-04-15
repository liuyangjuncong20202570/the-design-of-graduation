const NewsModel = require('../../models/NewsModel.js');
const UserModel = require('../../models/UserModel.js');

const NewsService = {
  getList: async ({ _id, offset = 0, limit = 10, pagination = false }) => {
    if (_id) {
      return NewsModel.find({ _id, isPublish: 1 });
    } else {
      const { docs } = await NewsModel.paginate(
        { isPublish: 1 },
        { offset, limit, pagination, sort: { editTime: -1 } }
      );
      return docs;
    }
  },
  getcateList: async ({ category }) => {
    return NewsModel.find({ category, isPublish: 1 }).sort({ editTime: -1 });
  },
  getAuthor: async ({ username }) => {
    return UserModel.find({ username });
  },
  getrelateNews: async ({ author }) => {
    return NewsModel.find({ author, isPublish: 1 }).sort({ editTime: -1 });
  }
};

module.exports = NewsService;
