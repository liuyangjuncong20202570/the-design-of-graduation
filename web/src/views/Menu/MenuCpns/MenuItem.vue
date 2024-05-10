<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img :src="MAINPORT + gestData?.avatar" />
      </div>
      <h4>{{ gestData.gestname }}</h4>
    </div>
    <div class="item">
      <a @click="handleClick" href="javascript:;">
        <span class="iconfont icon-hy"></span>
        <p>资料更新</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <div class="like-container">
    <div class="home-panel">
      <div class="header">
        <h4 data-v-bcb266e0="">猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <GoodsItem
          class="item"
          v-for="good in likeList.slice(0, 4)"
          :key="good._id"
          :goods="good"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GoodsItem from '@/components/publicCpns/GoodsItem.vue';
import { MAINPORT } from '@/assets/js/publicData';
import useGest from '../../../stores/modules/useGest';
import { storeToRefs } from 'pinia';
import useProduct from '@/stores/modules/useProduct';
const gestStore = useGest();
const { gestData, visible } = storeToRefs(gestStore);
const handleClick = () => {
  visible.value = !visible.value;
};
const likeList = ref([]);
onMounted(async () => {
  const productStore = useProduct();
  const res = await productStore.fetchFreshProduct(1);
  if (res) {
    const { diffProduct } = storeToRefs(productStore);
    console.log(diffProduct.value);
    likeList.value = diffProduct.value;
  }
});
</script>

<style lang="less" scoped>
.home-overview {
  height: 132px;
  background: url('../../../assets/avatars/center-bg.png') no-repeat center / cover;
  display: flex;
  .item {
    p {
      margin-top: 0px;
    }
  }

  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }

  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &:first-child {
      border-right: 1px solid #f4f4f4;
    }

    a {
      color: white;
      font-size: 16px;
      text-align: center;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}

.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: 400;
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-around;
    .item {
      width: 160px !important;
      height: 260px !important;
    }
  }
}
</style>
