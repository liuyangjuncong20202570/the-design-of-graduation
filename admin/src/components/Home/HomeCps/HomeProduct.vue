<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>公司产品</span>
      </div>
    </template>
    <el-carousel v-if="loopList?.length" :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in loopList.slice(0, 4)" :key="item._id">
        <div
          :style="{
            backgroundImage: `url(${MAINPORT + item.cover})`,
            backgroundSize: 'cover'
          }"
        >
          <h3>{{ item.title }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup>
import { MAINPORT } from '@/assets/js/publicData';
import useProduct from '@/stores/modules/useProduct';
import { storeToRefs } from 'pinia';

const productStore = useProduct();
const loopList = ref();
onMounted(async () => {
  await productStore.fetchProductInfo();
  const { productInfo } = storeToRefs(productStore);
  loopList.value = productInfo.value;
});
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 70px;
}

.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
