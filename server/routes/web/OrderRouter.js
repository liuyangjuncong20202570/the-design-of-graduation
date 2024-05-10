var express = require('express');
const OrderController = require('../../controlers/web/OrderController');
var OrderRouter = express.Router();
const multer = require('multer');

OrderRouter.post('/LYapi/web/orders/addOrder', OrderController.addOrder);
OrderRouter.get('/LYapi/web/orders/getOrder/:id', OrderController.getOrder);

module.exports = OrderRouter;
