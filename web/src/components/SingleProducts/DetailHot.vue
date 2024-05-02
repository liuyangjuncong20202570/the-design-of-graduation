<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <template v-for="item in hotList" :key="item._id">
      <div @click="handleClick(item._id)" class="goods-item">
        <img :src="MAINPORT + item.cover" alt="" />
        <p class="name ellipsis">{{ item.title }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
// 以24小时热榜获取数据渲染模版
// import { getHotGoodsAPI } from '@/apis/detail'
import { MAINPORT } from '@/assets/js/publicData';
import { computed } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProduct from '@/stores/modules/useProduct';
import { storeToRefs } from 'pinia';

// 设计props参数 适配不同的 title 和 数据
const props = defineProps({
  hotType: {
    type: Number
  }
});

// 适配title 1 - 24小时热榜 2 - 周热榜
const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
};
const title = computed(() => TYPEMAP[props.hotType]);

const productStore = useProduct();
// 1. 封装接口
// 2. 调用接口渲染模版
const hotList = ref([]);
const getHotList = async () => {
  const res = await productStore.fetchFreshProduct(props.hotType);
  if (res) {
    // hotList.value = res.result?.slice(0, 3);
    const { diffProduct } = storeToRefs(productStore);
    console.log(diffProduct.value);
    hotList.value = diffProduct.value.slice(0, 3);
  }
};

const emit = defineEmits(['update']);
onMounted(() => getHotList());
const router = useRouter();
const handleClick = async path => {
  router.push(`/products/${path}`);
  const res = await productStore.fetchSingleProduct(path);
  const resInfo = await productStore.fetchSingleProductInfo(path);
  const resType = await productStore.fetchSingleProductType(path);
  if (res && resInfo && resType) {
    console.log('1111');
    const { Product, ProductInfo, ProductType } = storeToRefs(productStore);
    console.log(ProductType.value);
    emit('update', {
      productV1: Product.value[0],
      productV2: ProductInfo.value[0],
      productV3: ProductType.value[0]
    });
  }
  // location.reload();
};
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: #e26237;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
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
}
</style>
