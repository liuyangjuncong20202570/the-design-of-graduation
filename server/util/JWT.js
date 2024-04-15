const jsonwebtoken = require('jsonwebtoken');
// 声明加密解密密钥
const secrect = 'LYJC';
const JWT = {
  // 生成token方法
  generator(value, expire) {
    return jsonwebtoken.sign(value, secrect, { expiresIn: expire });
  },
  // 验证token方法
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secrect);
    } catch (error) {
      return false;
    }
  }
};

module.exports = JWT;
