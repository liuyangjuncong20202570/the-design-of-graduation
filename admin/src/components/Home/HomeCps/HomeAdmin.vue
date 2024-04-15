<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="4">
        <el-avatar shape="square" :size="120" :src="avatarUrl" />
      </el-col>
      <el-col :span="20">
        <h3 style="line-height: 120px">欢迎 {{ userInfo.username }} 回来~~~，{{ welcomText }}</h3>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { MAINPORT } from '../../../assets/js/publicData';
import { storeToRefs } from 'pinia';
import { DEFAULTURL } from '../../../assets/js/publicData';
import useUser from '@/stores/modules/useUser';
const UserStore = useUser();
const { userInfo } = storeToRefs(UserStore);
// 控制头像URL计算属性
const avatarUrl = computed(() =>
  userInfo.value.avatar ? MAINPORT + userInfo.value.avatar : DEFAULTURL
);
const welcomText = computed(() => {
  return new Date().getHours() < 12 ? '打工人开始上班喽~' : '您可能有点累了，喝杯咖啡提提神吧~';
});
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 50px;
}
</style>
