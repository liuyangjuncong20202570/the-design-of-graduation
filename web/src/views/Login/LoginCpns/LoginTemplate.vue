<template>
  <div class="all">
    <img src="../../../assets/avatars/bg.png" alt="" class="wave" />
    <div class="container">
      <div class="img">
        <img src="../../../assets/avatars/img-3.svg" alt="" />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

import useLogin from '@/stores/modules/useLogin';
import Loginpart from './Loginpart.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';


</script>

<style lang="less" scoped>
.all {
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  .container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 18rem;
    padding: 0 2rem;
  }
  .img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .img img {
    width: 500px;
  }

  /*媒体查询*/
  @media screen and (max-width: 1080px) {
    .container {
      grid-gap: 9rem;
    }
  }
  @media screen and (max-width: 1024px) {
    form {
      width: 290px;
    }
    form h2 {
      font-size: 2.4rem;
      margin: 8px 0;
    }
    .img img {
      width: 360px;
    }
  }
  @media screen and (max-width: 768px) {
    .wave {
      display: none;
    }
    .img {
      display: none;
    }
    .container {
      grid-template-columns: 1fr;
    }
    .login-box {
      justify-content: center;
    }
  }
}
</style>
