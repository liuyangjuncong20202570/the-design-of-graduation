<template>
  <div class="container">
    <div class="left">
      <img src="../../assets/avatars/BZLogo.png" alt="" />
    </div>
    <div class="middle">
      <SearchBar :dataList="fetchList" :customeStyle="customeStyle" />
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
      <div class="cart">
        <el-icon :style="{ cursor: 'pointer' }" color="#27B597" size="30"><ShoppingCart /></el-icon>
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

const fetchList = ref([]);
onMounted(async () => {
  const productStore = useProduct();
  const res = await productStore.fetchAllProduct();
  if (res) {
    const { allProduct } = storeToRefs(productStore);
    fetchList.value = allProduct.value;
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
</script>

<style lang="less" scoped>
.container {
  height: 130px;
  background-color: #fff;
  display: flex;
  .left {
    padding-left: 50px;
    width: 600px;
    img {
      height: 130px;
    }
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .right {
    width: 600px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
