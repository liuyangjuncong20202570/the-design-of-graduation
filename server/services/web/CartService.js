const CartModel = require('../../models/CartModel');
const { ObjectId } = require('mongodb');

const CartService = {
  addCart: async ({ count, price, size, store, productId, gestId }) => {
    return await CartModel.create({ count, price, size, store, isPurchase: 0, productId, gestId });
  },
  getCart: async ({ gestId }) => {
    console.log(gestId);
    return await CartModel.aggregate([
      {
        $match: {
          gestId: new ObjectId(gestId)
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $lookup: {
          from: 'productinfos',
          localField: 'productId',
          foreignField: 'productId',
          as: 'productinfo'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $unwind: '$productinfo'
      },
      {
        $project: {
          _id: 1,
          product: {
            title: 1,
            cover: 1
          },
          productinfo: {
            productBrand: 1
          },
          count: 1,
          price: 1,
          size: 1,
          store: 1,
          gestId: 1,
          isPurchase: 1
        }
      }
    ]);
  },
  purchase: async ({ isPurchase, _id }) => {
    if (_id) {
      return CartModel.updateOne({ _id }, { isPurchase });
    } else {
      return CartModel.updateMany({ isPurchase });
    }
  },
  delList: async ({ _id }) => {
    return CartModel.deleteOne({ _id });
  }
};

module.exports = CartService;
