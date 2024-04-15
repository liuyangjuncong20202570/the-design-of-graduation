import request from '../request';

// 获取登录token
export const getLoginToken = value => {
  return request.post({
    url: '/admin/user/login',
    data: value
  });
};
