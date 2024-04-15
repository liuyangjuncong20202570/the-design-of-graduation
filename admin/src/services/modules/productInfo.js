import request from '../request';

export const AddProductInfo = params => {
  return request.post({
    url: '/admin/product/add',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const GetProductInfo = () => {
  return request.get({
    url: '/admin/product/proList'
  });
};

export const DelProductInfo = value => {
  return request.delete({
    url: `/admin/product/delList/${value}`
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
