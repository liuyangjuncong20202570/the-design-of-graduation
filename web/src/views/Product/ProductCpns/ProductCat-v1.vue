<template>
  <div class="wrapper">
    <div class="title">
      <h3 class="main">{{ props.mainText }}</h3>
      <small class="sub">{{ props.subText }}</small>
    </div>
    <div class="goods">
      <template v-for="item in props.goods"> <ProductItemV1 :counts="item" /> </template>
    </div>
  </div>
</template>

<script setup>
import ProductItemV1 from './ProductItem-v1.vue';
const props = defineProps({
  mainText: {
    type: String,
    required: true,
    default: '默认主题'
  },
  subText: {
    type: String,
    required: true,
    default: '默认副标题'
  },
  goods: {
    type: Array,
    required: true
  }
});
</script>

<style lang="less" scoped>
.wrapper {
  .title {
    padding: 40px 0;
    display: flex;
    .main {
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
    }
    .sub {
      margin-top: 15px;
      font-size: 16px;
      color: #999;
      margin-left: 20px;
    }
  }
  .goods {
    display: flex;
    flex-shrink: 0;
    justify-content: space-evenly;
  }
}
</style>
