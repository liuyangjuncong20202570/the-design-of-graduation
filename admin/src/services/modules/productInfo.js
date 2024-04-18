import request from '../request';

export const AddProductBasic = params => {
  return request.post({
    url: '/admin/product/add',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const AddProductInfo = params => {
  return request.post({
    url: '/admin/productinfo/add',
    data: params
  });
};

export const AddProductType = params => {
  return request.post({
    url: '/admin/producttype/add',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const GetProductList = () => {
  return request.get({
    url: '/admin/product/proList'
  });
};

export const DelProduct = value => {
  return request.delete({
    url: `/admin/product/delList/${value}`
  });
};

export const DelProductInfo = value => {
  return request.delete({
    url: `/admin/productinfo/delList/${value}`
  });
};

export const DelProductType = value => {
  return request.delete({
    url: `/admin/producttype/delList/${value}`
  });
};

export const GetProductSingle = value => {
  return request.get({
    url: `/admin/product/singleList/${value}`
  });
};

export const UpdProductList = params => {
  return request.post({
    url: '/admin/product/updList',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const publishProductList = params => {
  return request.post({
    url: '/admin/product/ispublish',
    data: params
  });
};
