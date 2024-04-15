<template>
  <el-input v-model="searchname" placeholder="请输入搜索用户名" class="input-with-select">
    <template #prepend>
      <el-button @click="handleShow" :icon="Search" />
    </template>
  </el-input>
</template>

<script setup>
import useUser from '@/stores/modules/useUser';
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';

const searchname = ref();
const userStore = useUser();
const { isShow } = storeToRefs(userStore);
const handleShow = () => {
  isShow.value = !isShow.value;
  userStore.getSearchList(searchname.value);
};
</script>

<style lang="less" scoped></style>
