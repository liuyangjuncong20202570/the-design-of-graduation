const NewsModel = require('../../models/NewsModel.js');

const NewsService = {
  add: async ({ title, content, category, isPublish, cover, editTime, author }) => {
    return NewsModel.create({ title, content, category, isPublish, cover, editTime, author });
  },
  getList: async ({ _id, role, author }) => {
    if (_id) {
      return NewsModel.find({ _id });
    } else {
      if (role === 1) {
        return NewsModel.find({});
      } else if (author) {
        return NewsModel.find({ author });
      } else {
        return NewsModel.find({});
      }
    }
    // return _id ? NewsModel.find({ _id }) : NewsModel.find({ author });
  },
  listPublish: async ({ _id, isPublish, editTime }) => {
    return NewsModel.updateOne(
      { _id },
      {
        isPublish,
        editTime
      }
    );
  },
  delList: async _id => {
    return NewsModel.deleteOne({ _id });
  },
  updList: async ({ _id, title, content, category, cover, isPublish, editTime, author }) => {
    if (cover) {
      return NewsModel.updateOne(
        { _id },
        { title, content, category, cover, isPublish, editTime, author }
      );
    } else {
      return NewsModel.updateOne(
        { _id },
        { title, content, category, isPublish, editTime, author }
      );
    }
  }
};

module.exports = NewsService;
