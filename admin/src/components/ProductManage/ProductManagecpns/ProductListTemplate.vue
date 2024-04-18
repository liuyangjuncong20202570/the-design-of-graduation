<template>
  <el-card>
    <PublicHeader content="产品列表" title="产品管理" />
    <el-table :data="productList" style="width: 100%">
      <el-table-column fixed prop="title" label="产品名称" />
      <el-table-column prop="category" label="产品类别">
        <template #default="scope">
          {{ categoryFormat(scope.row.category) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ formatTime(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column label="是否发布">
        <template #default="scope">
          <el-switch
            :click="handleSwitch(scope.row)"
            v-model="scope.row.isPublish"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle :icon="Edit" @click="handleEdit(scope.row)" />
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="你确定想要删除该产品吗？"
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
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useProduct from '@/stores/modules/useProduct';

const router = useRouter();
const productStore = useProduct();

onMounted(async () => {
  await productStore.fetchProductList();
});
const { productList } = storeToRefs(productStore);

const handleSwitch = value => {
  productStore.publishProduct({ _id: value._id, isPublish: value.isPublish });
};

const categoryFormat = value => {
  const arr = ['新鲜好物', '人气推荐', '居家', '美食', '服饰', '母婴'];
  return arr[value - 1];
};

const handleDelete = async data => {
  const res = await productStore.DeleteProduct(data._id);
  if (res) {
    ElMessage({
      message: '删除成功~~~',
      type: 'success'
    });
    productStore.fetchProductList();
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
