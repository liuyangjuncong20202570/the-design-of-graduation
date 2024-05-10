<template>
  <Header />
  <div class="container-cart">
    <CartListTemplate />
  </div>
  <LayoutFooter />
</template>

<script setup>
import LayoutFooter from '../../components/LayoutFooter/LayoutFooter.vue';
import CartListTemplate from './CartListCpns/CartListTemplate.vue';
import Header from '../../views/Layout/Header.vue';
</script>

<style lang="less" scoped>
.container-cart {
  margin-top: 130px;
  background-color: #f5f5f5;
}
</style>
