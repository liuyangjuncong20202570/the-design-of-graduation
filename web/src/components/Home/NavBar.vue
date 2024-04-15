<template>
  <el-menu
    :default-active="router.fullPath"
    class="el-menu-demo navbar"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/news">新闻中心</el-menu-item>
    <el-menu-item index="/product">产品与服务</el-menu-item>
    <el-menu-item @click="handleClick" :index="bindRoute">个人中心</el-menu-item>
    <!-- <el-menu-item v-else @click="handleClick2">个人中心</el-menu-item> -->
  </el-menu>
  <div class="right">时代新闻网</div>
</template>

<script setup>
import useGest from '@/stores/modules/useGest';
import { useRoute, useRouter } from 'vue-router';
const bindRoute = ref('/main/login');
const route = useRoute();
const router = useRouter();
const handleClick = () => {
  if (localStorage.getItem('Gest')) {
    bindRoute.value = '/gestmenu/main';
  }
};
</script>

<style lang="less" scoped>
.navbar {
  background-color: #fff;
  position: sticky;
  top: 0px;
  z-index: 1000;
}

.right {
  position: fixed;
  top: 0;
  right: 20px;
  width: 100px;
  height: 59px;
  line-height: 59px;
  text-align: center;
  z-index: 1000;
}
</style>
