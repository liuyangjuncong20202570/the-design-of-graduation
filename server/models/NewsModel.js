const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

// user模型 ===> user集合（user表 ）
const newsType = {
  title: String,
  content: String,
  category: Number, //类别，用1，2，3控制
  cover: String, //封面
  isPublish: Number, // 0未发布，1已发布
  editTime: Date, //修改时间
  author: String //作者
};
// 创建use实例
const NewsModel = mongoose.model('news', new Schema(newsType).plugin(mongoosePaginate));

module.exports = NewsModel;
