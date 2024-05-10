const CartService = require('../../services/web/CartService.js');

const CartController = {
  addCart: async (req, res) => {
    const { count, price, size, store, productId, gestId } = req.body;
    try {
      const result = await CartService.addCart({
        count: Number(count),
        price: Number(price),
        size,
        store: Number(store),
        productId,
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
    } catch (error) {
      console.log(error);
      res.send({
        ActionType: 'net wrong',
        code: '508'
      });
    }
  },
  getCart: async (req, res) => {
    try {
      const result = await CartService.getCart({ gestId: req.params.id });
      if (result) {
        res.send({
          ActionType: 'OK',
          data: result
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        ActionType: 'error',
        code: '409'
      });
    }
  },
  purchase: async (req, res) => {
    const { _id = 0, isPurchase } = req.body;
    if (_id) {
      const result = await CartService.purchase({ isPurchase, _id });
      if (result) {
        res.send({
          ActionType: 'OK'
        });
      } else {
        res.send({
          ActionType: 'error'
        });
      }
    } else {
      const result = await CartService.purchase({ isPurchase });
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
  },
  delList: async (req, res) => {
    const result = await CartService.delList({ _id: req.params.id });
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

module.exports = CartController;
