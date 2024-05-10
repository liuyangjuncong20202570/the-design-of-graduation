<script setup>
import { MAINPORT } from '@/assets/js/publicData';
defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
});
</script>
<template>
  <RouterLink to="/" class="goods-item">
    <img :src="MAINPORT + goods.cover" alt="" />
    <div class="name">{{ goods.title }}</div>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    width: 160px;
    padding-top: 10px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: #cf4444;
    font-size: 20px;
  }
}
</style>
