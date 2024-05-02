<template>
  <div class="wrapper">
    <Header />
    <ProductBanner />
    <div class="content">
      <ProductCatV1
        main-text="新鲜好物"
        sub-text="新鲜出炉 品质靠谱"
        :goods="loopArr[0]?.slice(0, 4)"
      />
      <ProductCatV1
        main-text="人气推荐"
        sub-text="人气爆款 不容错过"
        :goods="loopArr[1]?.slice(0, 4)"
      />
      <ProductCatV2
        main-text="居家"
        :banner="getAssetsFile('jujia.jpg')"
        :goods="loopArr[2]?.slice(0, 8)"
        title="居家馆"
        sub-title="3折起狂欢"
      />
      <ProductCatV2
        main-text="美食"
        :banner="getAssetsFile('meishi.png')"
        :goods="loopArr[3]?.slice(0, 8)"
        title="美食馆"
        sub-title="尽享大额优惠"
      />
      <ProductCatV2
        main-text="服饰"
        :banner="getAssetsFile('fushi.jpg')"
        :goods="loopArr[4]?.slice(0, 8)"
        title="居家馆"
        sub-title="全场3件享8折"
      />
      <ProductCatV2
        main-text="母婴"
        :banner="getAssetsFile('muying.jpg')"
        :goods="loopArr[5]?.slice(0, 8)"
        title="母婴馆"
        sub-title="第2件享半价"
      />
    </div>
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutFooter from '../../../components/LayoutFooter/LayoutFooter.vue';
import { getAssetsFile } from '@/assets/js/publicData';
import ProductCatV1 from './ProductCat-v1.vue';
import ProductCatV2 from './ProductCat-v2.vue';
import ProductBanner from './ProductBanner.vue';
import useProduct from '@/stores/modules/useProduct';
import Header from '@/views/Layout/Header.vue';
import { storeToRefs } from 'pinia';

const productStore = useProduct();
const loopArr = ref([]);
onMounted(async () => {
  for (let i = 0; i < 6; i++) {
    const res = await productStore.fetchFreshProduct(i + 1);
    const { diffProduct } = storeToRefs(productStore);
    if (res) {
      loopArr.value.push(diffProduct.value);
    }
  }
});
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  .content {
    padding: 0 215px;
  }
}
</style>
