// 此处放置全局共享数据
import { defineStore } from 'pinia';

const useMain = defineStore('main', {
  state: () => ({
    isAuthorized: false
  }),
  getters: {},
  actions: {}
});

export default useMain;
