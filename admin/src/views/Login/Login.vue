<template>
  <!-- Login页面背景 -->
  <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
  <!--  -->

  <!-- 登录容器 -->
  <div class="container">
    <div class="wrapper">
      <div class="title">电子商务新闻管理系统</div>
      <img src="@/assets/avatars/Logo.png" alt="Logo" />
      <LoginTemplate class="inner"></LoginTemplate>
    </div>
  </div>
  <!--  -->
</template>

<script setup>
// import options from '@/assets/js/ParticlePreset.js';
import configs from '@tsparticles/configs';
import LoginTemplate from './LoginTemplate.vue';

const options = configs.backgroundMask;
const particlesLoaded = async container => {
  console.log('Particles container loaded', container);
};
</script>

<style lang="less" scoped>
.container {
  width: 800px;
  height: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  color: white;
  transform: translate(-50%, -50%);
  background-color: rgba(9, 10, 14, 0.7);
  text-align: center;
  border-radius: 10px;

  .wrapper {
    padding-top: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
      padding-bottom: 30px;
      width: 300px;
      margin: 0 auto;
      font-size: 30px;
    }

    .inner {
      padding-top: 100px;
      position: absolute;
      width: 500px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
