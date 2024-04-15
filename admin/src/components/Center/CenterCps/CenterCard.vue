<template>
  <el-card class="box-card">
    <el-avatar :fit="cover" :size="150" :src="avatarUrl" />
    <h3 class="divide">{{ userInfo.username }}</h3>
    <h3 class="divide">{{ standard }}</h3>
  </el-card>
</template>

<script setup>
import { MAINPORT } from '../../../assets/js/publicData';
import { storeToRefs } from 'pinia';
import { DEFAULTURL } from '../../../assets/js/publicData';
import useUser from '@/stores/modules/useUser';
const UserStore = useUser();
const { userInfo } = storeToRefs(UserStore);
const avatarUrl = computed(() =>
  userInfo.value.avatar ? MAINPORT + userInfo.value.avatar : DEFAULTURL
);
const standard = computed(() => (userInfo.value.role === 1 ? '管理员' : '编辑'));
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 50px;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .divide {
    margin-top: 10px;
  }
}
</style>
