import request from '../request/index.js';

export const getNewsList = value => {
  return request.post({
    url: '/web/news/list',
    data: value
  });
};

export const getcateList = value => {
  return request.get({
    url: `/web/news/catelist/${value}`
  });
};

export const getSingleNews = value => {
  return request.get({
    url: `/web/news/singleLlist/${value}`
  });
};

export const getAuthor = value => {
  return request.post({
    url: '/web/news/author',
    data: {
      username: value
    }
  });
};

export const getrelateNews = value => {
  return request.post({
    url: '/web/news/relateNews',
    data: {
      author: value
    }
  });
};
