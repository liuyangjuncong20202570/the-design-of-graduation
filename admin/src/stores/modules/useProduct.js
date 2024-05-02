import {
  AddProductBasic,
  AddProductInfo,
  AddProductType,
  GetProductList,
  publishProductList,
  GetProductSingle,
  UpdProductList,
  DelProduct,
  DelProductInfo,
  DelProductType,
  AddProductTypeInfo
} from '@/services/modules/productInfo';
import { defineStore } from 'pinia';

const useProduct = defineStore('Product', {
  state: () => ({
    productInfo: [],
    productList: [],
    productSingle: []
    // productInfo: []
  }),
  actions: {
    async fetchProductAdd(basic, info, images, type) {
      const { ActionType, _id } = await AddProductBasic(basic);
      const { ActionType: ActionTypeInfo } = await AddProductInfo({ ...info, _id });
      images.append('_id', _id);
      console.log({ ...type, _id });
      const { ActionType: ActionTypeInfo2 } = await AddProductTypeInfo({ type, _id });
      const { ActionType: ActionTypeType } = await AddProductType(images);
      if (
        ActionType === 'OK' &&
        ActionTypeInfo === 'OK' &&
        ActionTypeType === 'OK' &&
        ActionTypeInfo2 === 'OK'
      ) {
        return true;
      } else {
        return false;
      }
    },
    // async PostProductInfo(value) {
    //   const { ActionType } = await AddProductInfo(value);
    //   if (ActionType === 'OK') {
    //     return true;
    //   } else if (ActionType === 'NO') {
    //     return false;
    //   } else {
    //     return false;
    //   }
    // },
    async fetchProductList() {
      const { ActionType, data } = await GetProductList();
      if (ActionType === 'OK') {
        this.productList = data;
      }
    },
    async publishProduct(value) {
      const { ActionType } = await publishProductList(value);
      return ActionType === 'OK';
    },
    async DeleteProduct(value) {
      const { ActionType: ActionTypeInfo } = await DelProductInfo(value);
      const { ActionType: ActionTypeType } = await DelProductType(value);
      const { ActionType } = await DelProduct(value);
      return ActionType === 'OK' && ActionTypeInfo === 'OK' && ActionTypeType === 'OK';
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
