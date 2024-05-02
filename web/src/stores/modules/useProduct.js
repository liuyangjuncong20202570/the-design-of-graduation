import {
  getAllProduct,
  getFreshProduct,
  getSingleProduct,
  getSingleProductInfo,
  getSingleProductType
} from '@/service/modules/productsInfo';

import { defineStore } from 'pinia';

const useProduct = defineStore('Product', {
  state: () => ({
    allProduct: [],
    diffProduct: [],
    Product: [],
    ProductInfo: [],
    ProductType: []
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
    },
    async fetchFreshProduct(value) {
      const { ActionType, data } = await getFreshProduct(value);
      if (ActionType === 'OK') {
        this.diffProduct = data;
        return true;
      } else if (ActionType === 'error') {
        return false;
      }
    },
    async fetchSingleProduct(value) {
      const { ActionType, data } = await getSingleProduct(value);
      if (ActionType === 'OK') {
        this.Product = data;
        return true;
      } else if (ActionType === 'error') {
        return false;
      }
    },
    async fetchSingleProductInfo(value) {
      const { ActionType, data } = await getSingleProductInfo(value);
      if (ActionType === 'OK') {
        this.ProductInfo = data;
        return true;
      } else if (ActionType === 'error') {
        return false;
      }
    },
    async fetchSingleProductType(value) {
      const { ActionType, data } = await getSingleProductType(value);
      if (ActionType === 'OK') {
        this.ProductType = data;
        return true;
      } else if (ActionType === 'error') {
        return false;
      }
    }
  },
  getters: {}
});

export default useProduct;
