import { defineStore } from 'pinia';

const useLogin = defineStore('Login', {
  state: () => ({
    isSignup: false
  })
});

export default useLogin;
