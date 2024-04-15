import request from '../request';

export const getUserinfo = params => {
  return request.post({
    url: '/admin/user/update',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const postUserinfo = params => {
  return request.post({
    url: '/admin/user/add',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getUserList = () => {
  return request.get({
    url: '/admin/user/list'
  });
};

export const deleteUser = value => {
  return request.delete({
    url: `/admin/user/list/${value}`
  });
};

export const updateUser = (value, params) => {
  return request.put({
    url: `/admin/user/updlist/${value}`,
    data: params
  });
};

export const getSearchLish = name => {
  return request.get({
    url: `/admin/user/searchlist/${name}`
  });
};
