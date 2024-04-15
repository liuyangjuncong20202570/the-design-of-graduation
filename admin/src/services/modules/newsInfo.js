import request from '../request';

export const AddNewsInfo = params => {
  return request.post({
    url: '/admin/news/add',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const GetNewsInfo = value => {
  return request.post({
    url: '/admin/news/newsList',
    data: value
  });
};

export const getNewsInfoSingle = value => {
  return request.get({
    url: `/admin/news/getList/${value}`
  });
};

export const publishNewsInfo = params => {
  return request.put({
    url: '/admin/news/publish',
    data: params
  });
};

export const delNewsInfo = value => {
  return request.delete({
    url: `/admin/news/delList/${value}`
  });
};

export const updateNewsInfo = params => {
  return request.post({
    url: '/admin/news/updList',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
