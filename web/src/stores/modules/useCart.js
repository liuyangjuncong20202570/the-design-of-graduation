import { addCart, deleteOne, getCart, purchaseAll } from '@/service/modules/cartsInfo';
import { defineStore } from 'pinia';

const useCart = defineStore('Cart', {
  state: () => ({
    cartList: [],
    allCheckVal: false,
    checkoutList: []
  }),
  actions: {
    async fetchAddCart(value) {
      const { ActionType } = await addCart(value);
      return ActionType === 'OK';
    },
    async fetchCartList(value) {
      const { ActionType, data } = await getCart(value);
      if (ActionType === 'OK') {
        this.cartList = data;
        return true;
      } else {
        return false;
      }
    },
    async fetchPurchase(value) {
      console.log(value);
      const { _id, isPurchase } = value;
      if (_id) {
        const { ActionType } = await purchaseCart(value);
        if (ActionType === 'OK') {
          return true;
        }
      } else {
        const { ActionType } = await purchaseAll(value);
        if (ActionType === 'OK') {
          this.allCheckVal = true;
          return true;
        }
      }
    },
    async fetchDeleteOne(value) {
      const { ActionType } = await deleteOne(value);
      return ActionType === 'OK';
    }
  },
  getters: {}
});

export default useCart;
