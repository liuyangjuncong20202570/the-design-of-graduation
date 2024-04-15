const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// gest模型 ===> gest集合（gest表 ）
const gestType = new Schema({
  gestname: { type: String, required: true, unique: true },
  password: String,
  phonenumber: { type: String, required: true, unique: true },
  introduction: String,
  gender: Number, //性别，用0，1，2控制
  avatar: String // 头像
});

//设置gestname和phonenumber为复合主键
// gestType.index({ gestname: 1, phonenumber: 1 }, { unique: 1, _id: false });
// 创建gest实例
const GestModel = mongoose.model('gest', gestType);

module.exports = GestModel;
