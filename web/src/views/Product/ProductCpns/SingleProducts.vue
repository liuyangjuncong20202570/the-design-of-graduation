<template>
  <Header />
  <div class="container-single">
    <AsyncProductInfo
      @update="handleUpdate"
      :goods="product"
      :goods-info="productInfo"
      :goods-type="productType"
    />
  </div>
  <!-- <div>SingleProduct:{{ route.params.id }}</div> -->
  <LayoutFooter />
</template>

<script setup>
import Header from '@/views/Layout/Header.vue';
import { useRoute } from 'vue-router';
import LayoutFooter from '@/components/LayoutFooter/LayoutFooter.vue';
import useProduct from '@/stores/modules/useProduct';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const route = useRoute();
const productStore = useProduct();
const product = ref({});
const productInfo = ref({});
const productType = ref({});
const AsyncProductInfo = defineAsyncComponent(() =>
  import('@/components/SingleProducts/ProductInfo.vue')
);
onMounted(async () => {
  const res = await productStore.fetchSingleProduct(route.params.id);
  const resInfo = await productStore.fetchSingleProductInfo(route.params.id);
  const resType = await productStore.fetchSingleProductType(route.params.id);
  if (res && resInfo && resType) {
    const { Product, ProductInfo, ProductType } = storeToRefs(productStore);
    // console.log(ProductType.value);
    (product.value = Product.value[0]),
      (productInfo.value = ProductInfo.value[0]),
      (productType.value = ProductType.value[0]);
  }
});

const handleUpdate = value => {
  const { productV1, productV2, productV3 } = value;
  (product.value = productV1), (productInfo.value = productV2), (productType.value = productV3);
};
</script>

<style lang="less" scoped>
.container-single {
  margin-top: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>
