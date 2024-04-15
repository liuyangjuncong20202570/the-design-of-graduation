<template>
  <PublicHeader content="添加产品" title="产品管理" />
  <el-form
    ref="ProductFormRef"
    :model="ProductForm"
    :rules="ProductRules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <div class="basic">
      <div :style="{ marginBottom: '15px' }">基础信息</div>
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="ProductForm.title" />
      </el-form-item>
      <el-form-item label="产品价格" prop="price">
        <el-input v-model.number="ProductForm.price" />
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
    </div>
    <div class="Info">
      <div :style="{ marginBottom: '15px' }">销售信息</div>
      <ProductInfo />
    </div>
    <div class="desc">
      <div :style="{ marginBottom: '15px' }">图文描述</div>
      <el-form-item label="产品内容" prop="content">
        <PublicEditor class="editor" @event="handleEvent" />
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <PublicUpload @file-deliver="getFile" :avatar="ProductForm.cover" style="width: 100%" />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm"> 添加产品 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import ProductInfo from './ProductInfo.vue';
import PublicEditor from '@/components/PublicCpns/PublicEditor.vue';
import PublicUpload from '@/components/PublicCpns/PublicUpload.vue';
import { validateData } from '@/assets/js/publicData';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useProduct from '@/stores/modules/useProduct';

const router = useRouter();
const ProductFormRef = ref();
const ProductForm = reactive({
  title: '',
  content: '',
  category: 1,
  detail: '', //1 最新动态， 2典型案例， 3通知公告
  cover: '',
  price: 1,
  file: null
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
const ProductRules = reactive(validateData);

// 封面处理函数
const getFile = file => {
  ProductForm.cover = URL.createObjectURL(file);
  ProductForm.file = file;
};
const handleEvent = data => {
  ProductForm.content = data;
};
// 提交表单
const productStore = useProduct();
const submitForm = async () => {
  ProductFormRef.value.validate(async valid => {
    if (valid) {
      productStore.PostProductInfo(ProductForm).then(async res => {
        if (res) {
          ElMessage({
            message: '添加成功~~~',
            type: 'success'
          });
          await productStore.fetchProductInfo();
          router.push('/product-manage/productList');
        } else {
          ElMessage({
            message: '添加失败，可能因为网络原因或者该产品已存在！',
            type: 'error'
          });
        }
      });
    }
  });
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 50px;
}

.editor {
  z-index: 2000;
}
.basic,
.Info,
.desc {
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  margin-bottom: 30px;
}
</style>
