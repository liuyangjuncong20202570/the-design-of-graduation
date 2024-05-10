var express = require('express');
const AddressController = require('../../controlers/web/AddressController');
var AddressRouter = express.Router();
const multer = require('multer');

AddressRouter.post('/LYapi/web/address/addAddress', AddressController.addAddress);
AddressRouter.get('/LYapi/web/address/getAddress/:id', AddressController.getAddress);
AddressRouter.delete('/LYapi/web/address/delAddress/:id', AddressController.delAddress);

module.exports = AddressRouter;
