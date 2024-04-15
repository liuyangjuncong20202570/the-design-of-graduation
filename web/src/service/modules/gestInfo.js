import request from '../request';

//注册新用户
export const addNewGest = value => {
  return request.post({
    url: '/web/gest/add',
    data: value
  });
};
//用户登录
export const loginGest = value => {
  return request.post({
    url: '/web/gest/login',
    data: value
  });
};
//用户更新
export const updateGest = value => {
  return request.post({
    url: '/web/gest/update',
    data: value
  });
};
