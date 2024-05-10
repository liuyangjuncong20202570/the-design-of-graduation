import {
  addAddress,
  addReceiveAddress,
  delAddress,
  getAddress
} from '@/service/modules/addressInfo';
import { defineStore } from 'pinia';

const useAddress = defineStore('Address', {
  state: () => ({
    CHAddress: [],
    positionsData: []
  }),
  actions: {
    async fetchAllCity() {
      const res = await addAddress();
      const { code } = res;
      if (code === 1) {
        this.CHAddress = res;
        return true;
      }
    },
    async fetchAddAddress(value) {
      const { ActionType } = await addReceiveAddress(value);
      return ActionType === 'OK';
    },
    async fetchAddress(value) {
      const { ActionType, data } = await getAddress(value);
      if (ActionType === 'OK') {
        this.positionsData = data;
        return true;
      } else {
        return false;
      }
    },
    async fetchDelAddress(value) {
      const { ActionType } = await delAddress(value);
      return ActionType === 'OK';
    }
  },
  getters: {}
});

export default useAddress;
