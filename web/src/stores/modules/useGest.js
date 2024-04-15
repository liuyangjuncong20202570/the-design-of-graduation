import { addNewGest, loginGest, updateGest } from '@/service/modules/gestInfo';
import { defineStore } from 'pinia';

const useGest = defineStore('Gest', {
  state: () => ({
    gestData: {},
    visible: false
  }),
  actions: {
    async fetchAddGest({ gestname, password, phonenumber }) {
      // console.log(payload);
      const { ActionType, msg, data } = await addNewGest({ gestname, password, phonenumber });
      // console.log(data);
      if (ActionType === 'OK') {
        this.gestData = data;
        return {
          status: true,
          msg
        };
      } else if (ActionType === 'error') {
        return {
          status: false,
          msg
        };
      }
    },
    async fetchLoginGest({ gestname, password }) {
      const { ActionType, msg, data } = await loginGest({ gestname, password });
      if (ActionType === 'OK') {
        this.gestData = data;
        console.log(this.gestData);
        return {
          status: true,
          msg
        };
      } else if (ActionType === 'error') {
        return {
          status: false,
          msg
        };
      }
    },
    async fetchUpdateGest(value) {
      const {
        ActionType,
        data: { gestname, password, introduction, gender, avatar }
      } = await updateGest(value);
      if (ActionType === 'OK') {
        if (avatar) {
          (this.gestData.gestname = gestname),
            (this.gestData.password = password),
            (this.gestData.gender = gender),
            (this.gestData.introduction = introduction),
            (this.gestData.avatar = avatar);
        } else {
          (this.gestData.gestname = gestname),
            (this.gestData.password = password),
            (this.gestData.gender = gender),
            (this.gestData.introduction = introduction);
        }
        return true;
      } else if (ActionType === 'error') {
        return false;
      }
    }
  },
  persist: {
    path: ['gestData']
  }
});

export default useGest;
