var express = require('express');
const ProductController = require('../../controlers/admin/ProductController');
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' });
var ProductRouter = express.Router();

ProductRouter.post('/LYapi/admin/product/add', upload.single('file'), ProductController.add);
ProductRouter.get('/LYapi/admin/product/proList', ProductController.getList);
ProductRouter.get('/LYapi/admin/product/singleList/:id', ProductController.getList);
ProductRouter.post(
  '/LYapi/admin/product/updList',
  upload.single('file'),
  ProductController.updList
);
ProductRouter.post('/LYapi/admin/product/ispublish', ProductController.isPublish);
ProductRouter.delete('/LYapi/admin/product/delList/:id', ProductController.delList);

module.exports = ProductRouter;
