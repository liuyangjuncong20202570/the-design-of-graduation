var express = require('express');
const NewsController = require('../../controlers/admin/NewsController');
const multer = require('multer');
const upload = multer({ dest: 'public/newsuploads/' });
var NewsRouter = express.Router();

NewsRouter.post('/LYapi/admin/news/add', upload.single('file'), NewsController.add);
NewsRouter.post('/LYapi/admin/news/updList', upload.single('file'), NewsController.updList);
NewsRouter.post('/LYapi/admin/news/newsList', NewsController.getList);
NewsRouter.get('/LYapi/admin/news/getList/:id', NewsController.getList);
NewsRouter.put('/LYapi/admin/news/publish', NewsController.listPublish);
NewsRouter.delete('/LYapi/admin/news/delList/:id', NewsController.delList);

module.exports = NewsRouter;
