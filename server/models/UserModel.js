const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user模型 ===> user集合（user表 ）
const userType = {
  username: { type: String, required: true, unique: true },
  password: String,
  gender: Number, //性别，用0，1，2控制
  introduction: String, //简介
  avatar: String, // 头像
  role: Number //是否为管理员（主键）管理员1，编辑2
};
// 创建use实例
const UserModel = mongoose.model('user', new Schema(userType));

module.exports = UserModel;
