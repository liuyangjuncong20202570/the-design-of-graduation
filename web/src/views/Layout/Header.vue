<template>
  <div class="container-header">
    <div class="left">
      <img src="../../assets/avatars/BZLogo.png" alt="" />
    </div>
    <div class="middle">
      <SearchBar
        :path="path"
        placeholder="请输入商品名称"
        :dataList="fetchList"
        :customeStyle="customeStyle"
      />
    </div>
    <div class="right">
      <div class="user">
        <el-popconfirm
          trigger="hover"
          width="250"
          cancel-button-text="不，我再想想"
          confirm-button-text="是的，狠心退出"
          title="您确定要退出吗？"
          @confirm="handleConfirm"
        >
          <template #reference>
            <el-icon :style="{ cursor: 'pointer' }" color="#27B597" size="30"><User /></el-icon>
          </template>
        </el-popconfirm>
      </div>
      <div class="service">
        <el-icon :style="{ cursor: 'pointer' }" color="#27B597" size="30"><Service /></el-icon>
      </div>
      <div @click="handleCart" class="cart">
        <el-badge :hidden="cartNum === 0" :value="cartNum" class="item">
          <el-icon :style="{ cursor: 'pointer' }" color="#27B597" size="30"
            ><ShoppingCart
          /></el-icon>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, ShoppingCart, Service } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import SearchBar from '@/components/publicCpns/SearchBar.vue';
import useProduct from '@/stores/modules/useProduct';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useCart from '@/stores/modules/useCart';
import { emitter } from '@/assets/js/EventEmitter';
import useGest from '@/stores/modules/useGest';

const CartStore = useCart();
const { cartList } = storeToRefs(CartStore);
const cartNum = ref(0);
const fetchList = ref([]);

const GestStore = useGest();
const { gestData } = storeToRefs(GestStore);
onMounted(async () => {
  const productStore = useProduct();
  const res = await productStore.fetchAllProduct();
  const res2 = await CartStore.fetchCartList(gestData.value._id);
  if (res && res2) {
    const { allProduct } = storeToRefs(productStore);
    const { cartList } = storeToRefs(CartStore);
    fetchList.value = allProduct.value;
    cartNum.value = cartList.value.length;
  } else {
    ElMessage({
      message: '网络错误，数据获取失败',
      type: 'warning'
    });
  }
});
// console.log(fetchList.value);
const customeStyle = {
  width: '700px'
};
const router = useRouter();
const handleConfirm = () => {
  localStorage.removeItem('Token');
  localStorage.removeItem('Gest');
  router.replace('/main/login');
};
const path = '/products/';
emitter.on('flushCart', async () => {
  const res = await CartStore.fetchCartList(gestData.value._id);
  if (res) {
    const { cartList } = storeToRefs(CartStore);
    cartNum.value = cartList.value.length;
  }
});

const handleCart = () => {
  router.push('/cartList');
};
</script>

<style lang="less" scoped>
.container-header {
  border-bottom: 1px solid #f5f5f5;
  z-index: 999;
  position: fixed;
  height: 130px;
  background-color: #fff !important;
  display: flex;
  .left {
    padding-left: 50px;
    width: 500px;
    // flex: 1;
    img {
      height: 130px;
    }
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex: 1;
    width: 600px;
  }
  .right {
    // flex: 1;
    width: 600px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
