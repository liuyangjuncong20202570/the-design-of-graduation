import { defineStore } from 'pinia';
import { getLoginToken } from '@/services';
import {
  deleteUser,
  getSearchLish,
  getUserList,
  getUserinfo,
  postUserinfo,
  updateUser
} from '../../services/modules/userInfo';

const useUser = defineStore('Login', {
  state: () => ({
    userInfo: {},
    userList: [],
    visible: false,
    userMsgsingle: {
      username: '',
      password: '',
      role: 2,
      introduction: ''
    },
    isShow: false,
    searchList: []
  }),
  actions: {
    // 获取登录状态，Token
    async LoginStatus(value) {
      const { code, data } = await getLoginToken(value);
      this.userInfo = data;
      return code;
    },

    // 更新用户数据
    async UpdateUserinfo(value) {
      const {
        ActionType,
        data: { username, gender, introduction, avatar }
      } = await getUserinfo(value);
      if (ActionType === 'OK') {
        if (avatar) {
          this.userInfo.username = username;
          (this.userInfo.gender = gender),
            (this.userInfo.introduction = introduction),
            (this.userInfo.avatar = avatar);
          return true;
        } else {
          this.userInfo.username = username;
          (this.userInfo.gender = gender), (this.userInfo.introduction = introduction);
          return true;
        }
      }
    },
    // 添加用户
    async addUserinfo(value) {
      const { ActionType } = await postUserinfo(value);
      if (ActionType === 'OK') {
        return true;
      } else if (ActionType === 'error') {
        return false;
      } else {
        return false;
      }
    },
    // 获取用户列表
    async fethchUserlist() {
      const { ActionType, data } = await getUserList();
      if (ActionType === 'OK') {
        this.userList = data;
      }
    },
    // 删除用户信息
    async delUserlist(value) {
      const { ActionType } = await deleteUser(value);
      if (ActionType === 'OK') {
        return true;
      } else {
        return false;
      }
    },
    async updUsersingle(value, params) {
      const { ActionType, data } = await updateUser(value, params);
      if (ActionType === 'OK') {
        this.userMsgsingle = data;
      }
    },
    async getSearchList(name) {
      const { ActionType, data } = await getSearchLish(name);
      if (ActionType === 'OK') {
        this.searchList = data;
      }
    }
  },
  persist: {
    path: ['userInfo']
  }
});

export default useUser;
