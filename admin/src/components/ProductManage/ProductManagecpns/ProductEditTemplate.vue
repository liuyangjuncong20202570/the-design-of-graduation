<template>
  <el-page-header @back="handleBank" content="编辑产品" title="产品管理" />
  <el-form
    ref="ProductFormRef"
    :model="ProductForm"
    :rules="productRules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="产品名称" prop="title">
      <el-input v-model="ProductForm.title" />
    </el-form-item>
    <el-form-item label="产品价格" prop="price">
      <el-input v-model="ProductForm.price" />
    </el-form-item>
    <el-form-item label="产品摘要" prop="introduction">
      <el-input
        :rows="5"
        placeholder="写一条对该产品的摘要吧~~~"
        v-model="ProductForm.introduction"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="产品详述" prop="detail">
      <el-input
        :rows="5"
        placeholder="写一条对该产品的详述吧~~~"
        v-model="ProductForm.detail"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <PublicUpload @file-deliver="getFile" :avatar="ProductForm.cover" style="width: 100%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm"> 更新产品 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import PublicUpload from '@/components/PublicCpns/PublicUpload.vue';
import PublicEditor from '@/components/PublicCpns/PublicEditor.vue';
import { validateData } from '@/assets/js/publicData';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useProduct from '@/stores/modules/useProduct';

const productStore = useProduct();
const route = useRoute();
const router = useRouter();
const ProductFormRef = ref();
const ProductForm = reactive({
  title: '',
  introduction: '',
  detail: '', //1 最新动态， 2典型案例， 3通知公告
  cover: '',
  price: 1,
  file: null
});
const productRules = reactive(validateData);

// 封面处理函数
const getFile = file => {
  ProductForm.cover = URL.createObjectURL(file);
  ProductForm.file = file;
};

// 数据库中获取单条数据并渲染
onMounted(async () => {
  await productStore.fetchSingleProduct(route.params.id);
  const { productSingle } = storeToRefs(productStore);
  Object.assign(ProductForm, {
    ...productSingle.value[0]
  });
});

const submitForm = async () => {
  ProductFormRef.value.validate(async valid => {
    if (valid) {
      if (productStore.UpdateProductList(ProductForm)) {
        ElMessage({
          message: '更新成功~~~',
          type: 'success'
        });
        await productStore.fetchProductInfo();
        router.back();
      } else {
        ElMessage({
          message: '更新失败，请稍后再试',
          type: 'error'
        });
      }
    }
  });
};
// 返回回调
const handleBank = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 50px;
}
</style>
