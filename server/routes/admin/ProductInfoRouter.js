var express = require('express');
const ProductInfoController = require('../../controlers/admin/ProductInfoController');
const multer = require('multer');
// const upload = multer({ dest: 'public/productuploads/' });
var ProductInfoRouter = express.Router();

//添加型号
ProductInfoRouter.post('/LYapi/admin/productinfo/add', ProductInfoController.add);
ProductInfoRouter.delete('/LYapi/admin/productinfo/delList/:id', ProductInfoController.delList);

module.exports = ProductInfoRouter;
