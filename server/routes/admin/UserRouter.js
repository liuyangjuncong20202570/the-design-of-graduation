var express = require('express');
const UserController = require('../../controlers/admin/UserController');
var UserRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/avataruploads/' });

/* GET users listing. */
// 此处使用接口回调函数均封装于UserContrller中
// 登录接口，使用post请求
UserRouter.post('/LYapi/admin/user/login', UserController.login);
UserRouter.post('/LYapi/admin/user/update', upload.single('file'), UserController.update);
// 对用户列表进行增删改查
UserRouter.post('/LYapi/admin/user/add', upload.single('file'), UserController.add);
UserRouter.get('/LYapi/admin/user/list', UserController.getList);
UserRouter.get('/LYapi/admin/user/searchlist/:username', UserController.getList);
UserRouter.delete('/LYapi/admin/user/list/:id', UserController.delList);
UserRouter.put('/LYapi/admin/user/updlist/:id', UserController.updList);

module.exports = UserRouter;
