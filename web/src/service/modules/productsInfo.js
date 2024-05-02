import request from '../request';

//获取所欲商品列表
export const getAllProduct = () => {
  return request.get({
    url: '/web/product/getAll'
  });
};

//获取不同类别商品
export const getFreshProduct = value => {
  return request.get({
    url: `/web/product/getFresh/${value}`
  });
};

//获取单个商品信息
export const getSingleProduct = value => {
  return request.get({
    url: `/web/product/getSingle/${value}`
  });
};

//获取单个商品尺寸信息
export const getSingleProductInfo = value => {
  return request.get({
    url: `/web/product/getSingleInfo/${value}`
  });
};

//获取单个商品类型信息
export const getSingleProductType = value => {
  return request.get({
    url: `/web/product/getSingleType/${value}`
  });
};
