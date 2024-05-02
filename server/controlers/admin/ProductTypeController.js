const ProductTypeService = require('../../services/admin/ProductTypeService');
const { MAINPORT } = require('../../assets/js/data.js');
const ProductTypeController = {
  addInfos: async (req, res) => {
    const { type, _id } = req.body;
    const result = await ProductTypeService.addInfos({ type, _id });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    } else {
      res.send({
        ActionType: 'error'
      });
    }
  },
  addImages: async (req, res) => {
    console.log('属性2', req.body);
    console.log('图片', req.files);
    const { _id } = req.body;
    const slideCovers = [];
    req.files.forEach(item => {
      slideCovers.push(`${MAINPORT}/productuploads/${item.filename}`);
    });
    console.log(slideCovers);
    // const { data, slideCovers, _id } = req.body;
    // const { data, slideCovers } = type;
    // const size = JSON.stringify(data);
    // const slideCovers = req.files;
    // console.log('数组上传：', req.files, data, slideCovers);
    // const slideAll = [];
    // slideCovers.forEach(item => {
    //   slideAll.push(`/productuploads/${item.file.filename}`);
    // });
    // console.log(slideCovers);
    // console.log(slideAll);
    try {
      await ProductTypeService.addImages({ _id, slideCovers });
      res.send({
        ActionType: 'OK'
      });
    } catch (error) {
      console.log(error);
      res.send({
        ActionType: 'error'
      });
    }
  },
  delList: async (req, res) => {
    const result = await ProductTypeService.delList({ productId: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK'
      });
    } else {
      res.send({
        ActionType: 'error'
      });
    }
  },
  getType: async (req, res) => {
    const result = await ProductTypeService.getType({ productId: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    } else {
      res.send({
        ActionType: 'error',
        code: '508'
      });
    }
  }
};

module.exports = ProductTypeController;
