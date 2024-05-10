const AddressService = require('../../services/web/AddressService');

const AddressController = {
  addAddress: async (req, res) => {
    const { receiver, phoneNumber, position, desc, gestId } = req.body;
    const result = await AddressService.addAddress({
      receiver,
      phoneNumber,
      position,
      desc,
      gestId
    });
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
  getAddress: async (req, res) => {
    const result = await AddressService.getAddress({ gestId: req.params.id });
    if (result) {
      res.send({
        ActionType: 'OK',
        data: result
      });
    } else {
      res.send({
        ActionType: 'error'
      });
    }
  },
  delAddress: async (req, res) => {
    const result = await AddressService.delAddress({ _id: req.params.id });
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

module.exports = AddressController;
