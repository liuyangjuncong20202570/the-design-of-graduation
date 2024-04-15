import {
  AddProductInfo,
  DelProductInfo,
  GetProductInfo,
  GetProductSingle,
  UpdProductList
} from '@/services/modules/productInfo';
import { defineStore } from 'pinia';

const useProduct = defineStore('Product', {
  state: () => ({
    productInfo: [],
    productSingle: []
  }),
  actions: {
    async PostProductInfo(value) {
      const { ActionType } = await AddProductInfo(value);
      if (ActionType === 'OK') {
        return true;
      } else if (ActionType === 'NO') {
        return false;
      } else {
        return false;
      }
    },
    async fetchProductInfo() {
      const { ActionType, data } = await GetProductInfo();
      if (ActionType === 'OK') {
        this.productInfo = data;
      }
    },
    async DeleteProductInfo(value) {
      const { ActionType } = await DelProductInfo(value);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    },
    async fetchSingleProduct(value) {
      const { ActionType, data } = await GetProductSingle(value);
      if (ActionType === 'OK') {
        this.productSingle = data;
      }
    },
    async UpdateProductList(value) {
      const { ActionType } = await UpdProductList(value);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    }
  }
});

export default useProduct;
