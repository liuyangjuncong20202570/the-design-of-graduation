import { addOrder, getOrder } from '@/service/modules/orderInfo';
import { defineStore } from 'pinia';

const useOrder = defineStore('order', {
  state: () => ({
    orderId: '',
    orderItem: {}
  }),
  actions: {
    async fetchAddOrder(value) {
      const { ActionType, _id } = await addOrder(value);
      if (ActionType === 'OK') {
        this.orderId = _id;
        return true;
      } else {
        return false;
      }
    },
    async fetchOrder(value) {
      const { ActionType, data } = await getOrder(value);
      if (ActionType === 'OK') {
        this.orderItem = data;
        return true;
      } else {
        return false;
      }
    }
  },
  getters: {}
});

export default useOrder;
