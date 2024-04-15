const GestService = require('../../services/web/GestService.js');
const JWT = require('../../util/JWT.js');
const { EXPIRETIME } = require('../../assets/js/data.js');
const GestController = {
  addGest: async (req, res) => {
    const { gestname, password, phonenumber } = req.body;
    try {
      var result = await GestService.addGest({
        gestname,
        password,
        phonenumber
      });
      if (result) {
        // 允许登录，此处后端提供唯一登录凭证token
        const token = JWT.generator(
          {
            _id: result._id,
            username: result.gestname
          },
          EXPIRETIME
        );
        // 设定请求头
        res.header('Authorization', token);
        res.send({
          ActionType: 'OK',
          msg: '注册成功~',
          data: result
        });
      }
      return;
    } catch (error) {
      res.send({
        ActionType: 'error',
        code: '504',
        msg: '用户名或手机号已注册!'
      });
      return;
    }
  },
  login: async (req, res) => {
    const { gestname, password } = req.body;
    const result = await GestService.login({ gestname, password });
    if (result.length) {
      // 允许登录，此处后端提供唯一登录凭证token
      const token = JWT.generator(
        {
          _id: result[0]._id,
          gestname: result[0].gestname
        },
        EXPIRETIME
      );
      // 设定请求头
      res.header('Authorization', token);
      res.send({
        ActionType: 'OK',
        code: '200',
        msg: '登陆成功~',
        data: result[0]
      });
    } else {
      res.send({
        ActionType: 'error',
        code: '404',
        msg: '该用户还未注册，快去注册吧~'
      });
    }
  },
  update: async (req, res) => {
    //通过Token拿到用户ID
    const Token = req.headers['authorization'].split(' ')[1];
    var payload = JWT.verify(Token);
    const _id = payload._id;
    const { gestname, password, introduction, gender } = req.body;
    const avatar = req.file ? `/gestavataruploads/${req.file?.filename}` : '';
    try {
      await GestService.update({
        _id,
        gestname,
        password,
        introduction,
        gender: Number(gender),
        avatar
      });
      if (avatar) {
        res.send({
          ActionType: 'OK',
          data: {
            gestname,
            password,
            gender: Number(gender),
            introduction,
            avatar
          }
        });
      } else {
        res.send({
          ActionType: 'OK',
          data: {
            gestname,
            password,
            gender: Number(gender),
            introduction
          }
        });
      }
    } catch (error) {
      res.send({
        ActionType: 'error',
        data: {}
      });
    }
  }
};

module.exports = GestController;
