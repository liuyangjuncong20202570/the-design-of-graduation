const ProductTypeService = require('../../services/admin/ProductTypeService');

const ProductTypeController = {
  add: async (req, res) => {
    const { type, _id } = req.body;
    const { data, slideCovers } = type;
    const size = JSON.stringify(data);
    const slideAll = [];
    slideCovers.forEach(item => {
      slideAll.push(`/productuploads/${item.file.filename}`);
    });
    try {
      await ProductTypeService.add({ size, _id, slideCovers: JSON.stringify(slideAll) });
      res.send({
        ActionType: 'OK'
      });
    } catch (error) {
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
  }
};

module.exports = ProductTypeController;
