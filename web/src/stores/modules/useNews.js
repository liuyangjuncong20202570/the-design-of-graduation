import {
  getAuthor,
  getNewsList,
  getSingleNews,
  getcateList,
  getrelateNews
} from '@/service/modules/newsInfo';
import { defineStore } from 'pinia';
import { SWIPERPAGE } from '@/assets/js/publicData';

const useNews = defineStore('News', {
  state: () => ({
    newsList: [],
    isLoading: false,
    offset: 0,
    categoryList: [],
    singleList: [],
    authorMsg: [],
    relateNews: []
  }),
  actions: {
    async fetchNewsList({ offset = 0, limit = 10, pagination = false }) {
      const { ActionType, data } = await getNewsList({ offset, limit, pagination });
      if (ActionType === 'OK') {
        this.newsList = data;
      }
    },
    async fetchCategoryList(value) {
      const { ActionType, data } = await getcateList(value);
      if (ActionType === 'OK') {
        this.categoryList = data;
      }
    },
    async fetchSingleNews(value) {
      const { ActionType, data } = await getSingleNews(value);
      if (ActionType === 'OK') {
        this.singleList = data;
      }
    },
    async fetchAuthorMsg(value) {
      const { ActionType, data } = await getAuthor(value);
      if (ActionType === 'OK') {
        this.authorMsg = data;
      }
    },
    async fetchRelateNews(value) {
      const { ActionType, data } = await getrelateNews(value);
      if (ActionType === 'OK') {
        this.relateNews = data;
      }
    }
  }
});

export default useNews;
