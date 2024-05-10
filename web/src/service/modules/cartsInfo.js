//添加购物车
import request from '../request';

//获取所欲商品列表
export const addCart = params => {
  return request.post({
    url: '/web/cart/addCart',
    data: params
  });
};

//获取购物车
export const getCart = value => {
  return request.get({
    url: `/web/cart/getCart/${value}`
  });
};

//更新一件商品
export const purchaseCart = value => {
  return request.post({
    url: `/web/cart/purchase`,
    data: value
  });
};

//更新所有商品
export const purchaseAll = value => {
  return request.post({
    url: `/web/cart/purchaseAll`,
    data: value
  });
};

//删除某件商品
export const deleteOne = value => {
  return request.delete({
    url: `/web/cart/deleteItem/${value}`
  });
};
