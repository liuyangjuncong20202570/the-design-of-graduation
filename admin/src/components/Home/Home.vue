<template>
  <PublicHeader content="首页" />
  <HomeAdmin />
  <HomeProduct />
</template>

<script setup>
import HomeAdmin from './HomeCps/HomeAdmin.vue';
import HomeProduct from './HomeCps/HomeProduct.vue';
import PublicHeader from '../PublicCpns/PublicHeader.vue';
</script>

<style lang="less" scoped></style>
