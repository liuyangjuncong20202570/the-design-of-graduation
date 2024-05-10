import request from '../request';

export const addOrder = params => {
  return request.post({
    url: '/web/orders/addOrder',
    data: params
  });
};

export const getOrder = value => {
  return request.get({
    url: `/web/orders/getOrder/${value}`
  });
};
