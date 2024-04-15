var express = require('express');
const ProductController = require('../../controlers/web/ProductController');
var ProductRouter = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'public/gestavataruploads/' });

/* GET users listing. */
//获取所有产品
ProductRouter.get('/LYapi/web/product/getAll', ProductController.getAll);

module.exports = ProductRouter;
