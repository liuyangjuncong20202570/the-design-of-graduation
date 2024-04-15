const { EXPIRETIME } = require('../../assets/js/data');
const UserService = require('../../services/admin/UserService');

const JWT = require('../../util/JWT.js');

const UserController = {
  // 登录方法
  login: async (req, res) => {
    // req.body
    var result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: '-1',
        data: '用户名密码不匹配'
      });
    } else {
      // 允许登录，此处后端提供唯一登录凭证token
      const token = JWT.generator(
        {
          _id: result[0]._id,
          username: result[0].username
        },
        EXPIRETIME
      );
      // 设定请求头
      res.header('Authorization', token);
      res.send({
        code: 200,
        ActionType: 'OK',
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0, //性别,0:保密，1：男，2：女
          introduction: result[0].introduction, //简介
          avatar: result[0].avatar,
          role: result[0].role //是否为管理员（主键）管理员1，编辑2
        }
      });
    }
  },

  // 更新方法
  update: async (req, res, next) => {
    // 通过token拿到用户ID
    const Token = req.headers['authorization'].split(' ')[1];
    var payload = JWT.verify(Token);
    // 通过JWT模块找到唯一id进行更新
    const _id = payload._id;
    const { username, gender, introduction } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file?.filename}` : '';
    // 调用services，更新数据库内容
    await UserService.update({
      _id,
      username,
      introduction,
      gender: Number(gender),
      avatar
    });
    if (avatar) {
      res.send({
        ActionType: 'OK',
        data: {
          username,
          gender: Number(gender),
          introduction,
          avatar
        }
      });
    } else {
      res.send({
        ActionType: 'OK',
        data: {
          username,
          gender: Number(gender),
          introduction
        }
      });
    }
  },

  // 添加方法
  add: async (req, res, next) => {
    const { username, password, role, introduction, gender, file } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file?.filename}` : '';
    try {
      var result = await UserService.add({
        username,
        password,
        role,
        introduction,
        avatar,
        gender: Number(gender),
        file
      });
      res.send({
        ActionType: 'OK'
      });
      return;
    } catch (error) {
      res.send({
        ActionType: 'error',
        code: '202',
        msg: '类型校验错误'
      });
    }
  },

  // 获取用户列表
  getList: async (req, res, next) => {
    const result = await UserService.getList({ username: req.params.username });
    res.send({
      ActionType: 'OK',
      data: result
    });
  },
  // 删除用户信息
  delList: async (req, res, next) => {
    const result = await UserService.delList({ _id: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK',
        code: 200
      });
    } else {
      res.send({
        ActionType: 'FALSE',
        code: 204
      });
    }
  },
  // 更新数据
  updList: async (req, res, next) => {
    const result = await UserService.updList(req.body);
    if (result) {
      res.send({
        ActionType: 'OK',
        code: 200
      });
    }
  }
};

module.exports = UserController;
