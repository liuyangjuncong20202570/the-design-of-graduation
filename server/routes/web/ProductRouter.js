var express = require('express');
const ProductController = require('../../controlers/web/ProductController');
const ProductInfoController = require('../../controlers/admin/ProductInfoController');
const ProductTypeController = require('../../controlers/admin/ProductTypeController');
var ProductRouter = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'public/gestavataruploads/' });

/* GET users listing. */
//获取所有产品
ProductRouter.get('/LYapi/web/product/getAll', ProductController.getAll);
//获取新鲜好物/人气推荐等产品
ProductRouter.get('/LYapi/web/product/getFresh/:category', ProductController.getFresh);
//获取单个商品信息
ProductRouter.get('/LYapi/web/product/getSingle/:id', ProductController.getSingle);
//获取单个商品尺寸信息
ProductRouter.get('/LYapi/web/product/getSingleInfo/:id', ProductInfoController.getInfo);
//获取单个商品类型信息
ProductRouter.get('/LYapi/web/product/getSingleType/:id', ProductTypeController.getType);
module.exports = ProductRouter;
