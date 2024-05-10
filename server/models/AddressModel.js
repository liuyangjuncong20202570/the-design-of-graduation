const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressType = {
  receiver: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  isDefault: Number, //是否为默认地址0为不是，1为默认地址，默认插入的第一个数据为默认地址
  gestId: {
    type: Schema.Types.ObjectId,
    ref: 'gests'
  }
};

const AddressModel = mongoose.model('address', new Schema(addressType));

module.exports = AddressModel;
