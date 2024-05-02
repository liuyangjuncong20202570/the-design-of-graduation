<template>
  <RouterLink :to="`/products/${counts._id}`">
    <div class="goods-item">
      <img :src="MAINPORT + counts.cover" alt="" />
      <div class="name">
        {{ counts.title }}
      </div>
      <div class="price">
        <div class="inner">&yen;{{ counts.price }}/件</div>
        <el-rate
          class="rate"
          v-model="value1"
          disabled
          :colors="['#5AA293', '#5AA293', '#5AA293']"
        />
      </div>
    </div>
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
  // display: block;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  // padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;
  border-radius: 10px;
  // border: 1px solid red;
  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .name {
    margin-top: 15px;
    color: rgb(72, 72, 72);
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    height: 50px;
    position: relative;
    margin-left: 0;
    margin-top: 10px;
    font-size: 20px;
    .inner {
      color: #ff6202;
      position: absolute;
      left: -118px;
    }
    .rate {
      position: absolute;
      left: -120px;
      top: 20px;
    }
  }
}
</style>
