var express = require('express');
const CartController = require('../../controlers/web/CartController');
var CartRouter = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'public/gestavataruploads/' });
CartRouter.post('/LYapi/web/cart/addCart', CartController.addCart);
//查询购物车
CartRouter.get('/LYapi/web/cart/getCart/:id', CartController.getCart);
//购物车决定付款单个商品
CartRouter.post('/LYapi/web/cart/purchase', CartController.purchase);
//购物车决定付款所有商品
CartRouter.post('/LYapi/web/cart/purchaseAll', CartController.purchase);
//购物车删除单个商品
CartRouter.delete('/LYapi/web/cart/deleteItem/:id', CartController.delList);
/* GET users listing. */

module.exports = CartRouter;
