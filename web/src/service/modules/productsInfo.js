import request from '../request';

//获取所欲商品列表
export const getAllProduct = () => {
  return request.get({
    url: '/web/product/getAll'
  });
};
