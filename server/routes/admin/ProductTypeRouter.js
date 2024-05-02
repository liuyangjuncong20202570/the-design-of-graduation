var express = require('express');
const ProductTypeController = require('../../controlers/admin/ProductTypeController');
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' });
var ProductTypeRouter = express.Router();

//添加型号
ProductTypeRouter.post(
  '/LYapi/admin/producttype/addImages',
  upload.array('images'),
  ProductTypeController.addImages
);
ProductTypeRouter.post('/LYapi/admin/producttype/addInfos', ProductTypeController.addInfos);
//删除该数据
ProductTypeRouter.delete('/LYapi/admin/producttype/delList/:id', ProductTypeController.delList);

module.exports = ProductTypeRouter;
