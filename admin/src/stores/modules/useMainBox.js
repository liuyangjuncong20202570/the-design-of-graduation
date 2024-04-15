import { defineStore } from 'pinia';

const useMainBox = defineStore('MainBox', {
  state: () => ({
    isCollapse: false
  }),
  persist: {
    paths: ['isCollapse']
  }
});

export default useMainBox;
