<template>
  <div class="wrapper">
    <div class="title">
      <h3 class="main">{{ props.mainText }}</h3>
    </div>
    <div class="container">
      <div class="shadow">
        <div class="left">{{ props.title }}</div>
        <div class="right">{{ props.subTitle }}</div>
      </div>
      <img :src="props.banner" alt="" />
      <div class="goods">
        <template v-for="item in props.goods"> <ProductItemV2 :counts="item" /> </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductItemV2 from './ProductItem-v2.vue';
const props = defineProps({
  mainText: {
    type: String,
    required: true,
    default: '默认主题'
  },
  goods: {
    type: Array,
    required: true
  },
  banner: {
    type: String
  },
  title: {
    type: String
  },
  subTitle: {
    type: String
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
  }
  .container {
    position: relative;
    display: flex;
    // align-items: center;
    .shadow {
      cursor: pointer;
      position: absolute;
      top: 50%;
      height: 76px;
      display: flex;
      font-size: 18px;
      color: #fff;
      line-height: 76px;
      font-weight: normal;
      .left {
        text-align: center;
        width: 80px;
        background: rgba(0, 0, 0, 0.9);
      }
      .right {
        text-align: center;
        flex: 1;
        background: rgba(0, 0, 0, 0.7);
        width: 120px;
        // height: 66px;
      }
    }
    .goods {
      width: 990px;
      display: flex;
      flex-shrink: 0;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }
    img {
      width: 240px;
      height: 610px;
    }
  }
}
</style>
