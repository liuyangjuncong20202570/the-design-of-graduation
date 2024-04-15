<template>
  <el-card>
    <PublicHeader content="产品列表" title="产品管理" />
    <el-table :data="productInfo" style="width: 100%">
      <el-table-column fixed prop="title" label="产品名称" />
      <el-table-column prop="introduction" label="产品简介"> </el-table-column>
      <el-table-column prop="detail" label="产品详述"> </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ formatTime(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle :icon="Edit" @click="handleEdit(scope.row)" />
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="你确定想要删除该篇新闻吗？"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button circle :icon="Delete" type="danger" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { Edit, Delete } from '@element-plus/icons-vue';
import formatTime from '@/assets/js/formatTime';
import PublicHeader from '@/components/PublicCpns/PublicHeader.vue';
import useNews from '@/stores/modules/useNews';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useUser from '@/stores/modules/useUser';
import useProduct from '@/stores/modules/useProduct';

const router = useRouter();
const productStore = useProduct();

onMounted(async () => {
  await productStore.fetchProductInfo();
});
const { productInfo } = storeToRefs(productStore);

const handleDelete = data => {
  if (productStore.DeleteProductInfo(data._id)) {
    ElMessage({
      message: '删除成功~~~',
      type: 'success'
    });
    productStore.fetchProductInfo();
  } else {
    ElMessage({
      message: '删除失败，请稍后再试',
      type: 'error'
    });
  }
};

// 编辑回调
const handleEdit = data => {
  router.push(`/product-manage/productedit/${data._id}`);
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 50px;
}
</style>
