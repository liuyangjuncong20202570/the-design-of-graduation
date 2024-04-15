const GestModel = require('../../models/GestModel.js');
const { defaultURL } = require('../../assets/js/data.js');
const GestService = {
  addGest: async ({ gestname, password, phonenumber }) => {
    return GestModel.create({
      gestname,
      password,
      phonenumber,
      introduction: '暂无简介~',
      avatar: defaultURL,
      gender: 2
    });
  },
  login: async ({ gestname, password }) => {
    return GestModel.find({
      gestname,
      password
    });
  },
  update: async ({ _id, gestname, password, introduction, gender, avatar }) => {
    if (avatar) {
      return GestModel.updateOne(
        { _id },
        {
          gestname,
          password,
          introduction,
          gender,
          avatar
        }
      );
    } else {
      return GestModel.updateOne(
        { _id },
        {
          gestname,
          password,
          introduction,
          gender
        }
      );
    }
  }
};

module.exports = GestService;
