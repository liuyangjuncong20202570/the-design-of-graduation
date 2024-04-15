var express = require('express');
const GestController = require('../../controlers/web/GestController');
var GestRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/gestavataruploads/' });

/* GET users listing. */
// 此处使用接口回调函数均封装于UserContrller中
// 登录接口，使用post请求
// UserRouter.post('/LYapi/admin/user/login', UserController.login);
// UserRouter.post('/LYapi/admin/user/update', upload.single('file'), UserController.update);
// 用户注册接口
GestRouter.post('/LYapi/web/gest/add', GestController.addGest);
//登录接口
GestRouter.post('/LYapi/web/gest/login', GestController.login);
//用户更新信息接口
GestRouter.post('/LYapi/web/gest/update', upload.single('file'), GestController.update);
// UserRouter.get('/LYapi/admin/user/list', UserController.getList);
// UserRouter.get('/LYapi/admin/user/searchlist/:username', UserController.getList);
// UserRouter.delete('/LYapi/admin/user/list/:id', UserController.delList);
// UserRouter.put('/LYapi/admin/user/updlist/:id', UserController.updList);

module.exports = GestRouter;
