import {
  AddNewsInfo,
  GetNewsInfo,
  delNewsInfo,
  getNewsInfoSingle,
  publishNewsInfo,
  updateNewsInfo
} from '@/services/modules/newsInfo';
import { defineStore } from 'pinia';

const useNews = defineStore('News', {
  state: () => ({
    newsInfo: [],
    isShow: false,
    newsSingle: []
  }),
  actions: {
    async PostNewsInfo(value) {
      const { ActionType } = await AddNewsInfo(value);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    },
    async fetchNewsInfo(params) {
      const { ActionType, data } = await GetNewsInfo(params);
      if (ActionType === 'OK') {
        this.newsInfo = data;
      }
    },
    async PutNewsInfo(payload) {
      const { ActionType } = await publishNewsInfo(payload);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    },
    async DeleteNewsInfo(value) {
      const { ActionType } = await delNewsInfo(value);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    },
    async fetchSingleNews(value) {
      const { ActionType, data } = await getNewsInfoSingle(value);
      if (ActionType === 'OK') {
        this.newsSingle = data;
        return true;
      } else {
        return false;
      }
    },
    async UpdateNewsList(params) {
      const { ActionType } = await updateNewsInfo(params);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    }
  }
});
export default useNews;
