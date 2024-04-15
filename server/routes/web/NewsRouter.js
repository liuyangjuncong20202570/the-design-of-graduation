var express = require('express');
const NewsController = require('../../controlers/web/NewsController');
var NewsRouter = express.Router();

NewsRouter.post('/LYapi/web/news/list', NewsController.getList);
NewsRouter.get('/LYapi/web/news/singleLlist/:id', NewsController.getList);
NewsRouter.get('/LYapi/web/news/catelist/:category', NewsController.getcateList);
NewsRouter.post('/LYapi/web/news/author', NewsController.getAuthor);
NewsRouter.post('/LYapi/web/news/relateNews', NewsController.getrelateNews);

module.exports = NewsRouter;
