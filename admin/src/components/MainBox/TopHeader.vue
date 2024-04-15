<template>
  <div class="container">
    <div @click="resize" class="left">
      <el-icon><Menu /></el-icon>
      <span class="text1">时代新闻管理系统</span>
    </div>
    <div class="right">
      <span class="text2">欢迎 {{ userInfo.username }} 回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon color="#FFFFFF" :size="30"><User /></el-icon>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleRouter('/center')">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Menu, User } from '@element-plus/icons-vue';
import useMainBox from '@/stores/modules/useMainBox.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useUser from '@/stores/modules/useUser';

const MainBoxStore = useMainBox();
const UserStore = useUser();
const { userInfo } = storeToRefs(UserStore);
const { isCollapse } = storeToRefs(MainBoxStore);
const resize = () => {
  isCollapse.value = !isCollapse.value;
};
const router = useRouter();
const handleRouter = value => {
  router.push(value);
};
const handleLogout = () => {
  localStorage.removeItem('Token');
  userInfo.value = {};
  router.push('/Login');
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  background-color: #2d3a4b;
  color: #ffffff;
  align-items: center;
  width: 100%;
  height: 60px;
  line-height: 60px;

  .left {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text1 {
      padding-left: 10px;
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text2 {
      padding-right: 10px;
    }
  }
}
</style>
