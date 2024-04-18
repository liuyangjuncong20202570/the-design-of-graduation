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
    <el-form-item label="产品类别" prop="category">
      <el-select
        :style="{ width: '100%' }"
        v-model="ProductForm.category"
        placeholder="请选择产品类别"
      >
        <el-option
          :style="{ zIndex: '10002' }"
          v-for="item in category"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="图文描述" prop="">
      <PublicEditor
        class="editor"
        v-if="ProductForm.content"
        :content="ProductForm.content"
        @event="handleEvent"
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
  category: 1,
  content: '' //1 最新动态， 2典型案例， 3通知公告
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

const category = [
  {
    label: '新鲜好物',
    value: 1
  },
  {
    label: '人气推荐',
    value: 2
  },
  {
    label: '居家',
    value: 3
  },
  {
    label: '美食',
    value: 4
  },
  {
    label: '服饰',
    value: 5
  },
  {
    label: '母婴',
    value: 6
  }
];

const handleEvent = data => {
  ProductForm.content = data;
};

const submitForm = async () => {
  ProductFormRef.value.validate(async valid => {
    if (valid) {
      console.log('111');
      const res = await productStore.UpdateProductList(ProductForm);
      if (res) {
        ElMessage({
          message: '更新成功~~~',
          type: 'success'
        });
        await productStore.fetchProductList();
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

.editor {
  z-index: 2000;
}
</style>
