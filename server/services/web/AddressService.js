const AddressModel = require('../../models/AddressModel');
const { ObjectId } = require('mongodb');

const AddressService = {
  addAddress: async ({ receiver, phoneNumber, position, desc, gestId }) => {
    return AddressModel.create({
      receiver,
      phoneNumber,
      address: position + desc,
      isDefault: 0,
      gestId
    });
  },
  getAddress: async ({ gestId }) => {
    return AddressModel.find({ gestId });
  },
  delAddress: async _id => {
    return AddressModel.deleteOne({ _id });
  }
};

module.exports = AddressService;
