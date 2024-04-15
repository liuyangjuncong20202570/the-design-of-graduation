<template>
  <PublicHeader content="个人中心" />
  <el-row :gutter="20">
    <el-col :span="8">
      <CenterCard />
    </el-col>
    <el-col :span="16">
      <CenterMsg />
    </el-col>
  </el-row>
</template>

<script setup>
import PublicHeader from '../PublicCpns/PublicHeader.vue';
import CenterCard from './CenterCps/CenterCard.vue';
import CenterMsg from './CenterCps/CenterMsg.vue';
</script>

<style lang="less" scoped></style>
