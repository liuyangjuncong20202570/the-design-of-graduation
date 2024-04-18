var express = require('express');
const ProductTypeController = require('../../controlers/admin/ProductTypeController');
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' });
var ProductTypeRouter = express.Router();

//添加型号
ProductTypeRouter.post(
  '/LYapi/admin/producttype/add',
  upload.single('file'),
  ProductTypeController.add
);
//删除该数据
ProductTypeRouter.delete('/LYapi/admin/producttype/delList/:id', ProductTypeController.delList);

module.exports = ProductTypeRouter;
