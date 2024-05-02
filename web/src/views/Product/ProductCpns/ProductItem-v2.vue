<template>
  <RouterLink :to="`/products/${counts._id}`" class="goods-item">
    <img :src="MAINPORT + counts.cover" alt="" />
    <p class="name ellipsis">{{ counts.title }}</p>
    <div class="price">&yen;{{ counts.price }}</div>
  </RouterLink>
</template>

<script setup>
import { MAINPORT } from '@/assets/js/publicData';
const value1 = ref(5);
const props = defineProps({
  counts: {
    type: Object,
    default: () => ({}),
    required: true
  }
});
const { counts } = props;
</script>

<style lang="less" scoped>
.goods-item {
  display: block;
  width: 160px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;

  .ellipsis {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

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
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    width: 160px;
    color: #e47f49;
    font-size: 20px;
  }
}
</style>
