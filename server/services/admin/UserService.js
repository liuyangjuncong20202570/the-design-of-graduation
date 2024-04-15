const UserModel = require('../../models/UserModel');

const UserService = {
  // 调用数据库find方法查找username，password匹配的用户
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password
    });
  },
  // 根据主键_id更新用户数据
  update: async ({ _id, username, gender, introduction, avatar }) => {
    if (avatar) {
      return UserModel.updateOne(
        { _id },
        {
          username,
          gender,
          introduction,
          avatar
        }
      );
    } else {
      return UserModel.updateOne(
        { _id },
        {
          username,
          gender,
          introduction
        }
      );
    }
  },
  // 插入新用户
  add: async ({ username, password, role, introduction, avatar, gender, file }) => {
    return UserModel.create({
      username,
      password,
      role,
      introduction,
      avatar,
      gender,
      file
    });
  },
  // 获取用户列表
  getList: async ({ username }) => {
    return username
      ? UserModel.find({ username }, ['username', 'role', 'introduction', 'gender'])
      : UserModel.find({}, ['username', 'role', 'avatar', 'introduction', 'gender']);
  },
  // 删除用户信息
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
  // 更新用户
  updList: async body => {
    return UserModel.updateOne({ _id: body._id }, body);
  }
};

module.exports = UserService;
