import { getAllProduct } from '@/service/modules/productsInfo';

import { defineStore } from 'pinia';

const useProduct = defineStore('Product', {
  state: () => ({
    allProduct: []
  }),
  actions: {
    async fetchAllProduct() {
      const { ActionType, code, msg, data } = await getAllProduct();
      if (ActionType === 'OK') {
        this.allProduct = data;
        return true;
      } else {
        this.allProduct = [];
        return false;
      }
    }
  },
  getters: {}
});

export default useProduct;
