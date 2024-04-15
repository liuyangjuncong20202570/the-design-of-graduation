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
// NewsRouter.post('/LYapi/admin/news/updList', upload.single('file'), NewsController.updList);
// NewsRouter.post('/LYapi/admin/news/newsList', NewsController.getList);
// NewsRouter.get('/LYapi/admin/news/getList/:id', NewsController.getList);
// NewsRouter.put('/LYapi/admin/news/publish', NewsController.listPublish);
ProductRouter.delete('/LYapi/admin/product/delList/:id', ProductController.delList);

module.exports = ProductRouter;
