<template>
  <el-aside :width="isCollapse ? '64px' : '240px'">
    <el-menu
      :default-active="route.fullPath"
      :router="true"
      :collapse-transition="false"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled></HomeFilled></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <el-sub-menu v-admin index="/user-manage">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news-manage/newsadd">创建新闻</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Reading /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product-manage/productadd">添加商品</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer
} from '@element-plus/icons-vue';
import useMainBox from '@/stores/modules/useMainBox.js';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import useUser from '@/stores/modules/useUser';

const UserStore = useUser();
const { userInfo } = storeToRefs(UserStore);
const route = useRoute();
const MainBoxStore = useMainBox();
const { isCollapse } = storeToRefs(MainBoxStore);

const vAdmin = {
  mounted(el) {
    if (userInfo.value.role !== 1) {
      el.parentNode.removeChild(el);
    }
  }
};
</script>

<style lang="less" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>
