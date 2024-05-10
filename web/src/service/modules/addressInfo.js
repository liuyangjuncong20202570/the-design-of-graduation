import request from '../request';

//添加地址
export const addAddress = () => {
  return request.get({
    url: 'https://www.mxnzp.com/api/address/list?app_id=stneivffmvrvghhh&app_secret=lMJpm9wG1dBXBis3bitKJX7JmyJgRH0d'
  });
};

//添加地址
export const addReceiveAddress = params => {
  return request.post({
    url: '/web/address/addAddress',
    data: params
  });
};

//查询地址
export const getAddress = value => {
  return request.get({
    url: `/web/address/getAddress/${value}`
  });
};

//删除地址
export const delAddress = value => {
  return request.delete({
    url: `/web/address/delAddress/${value}`
  });
};
