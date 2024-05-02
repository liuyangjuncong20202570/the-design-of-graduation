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
      <el-form-item label="产品价格">
        <el-input v-model="ProductForm.price" />
        <span v-if="ProductForm.price === 0" class="count">商品总单价不可为空</span>
      </el-form-item>
    </div>
    <div class="Info">
      <div :style="{ marginBottom: '15px' }">销售信息</div>
      <ProductInfo @inner="handleInner" />
    </div>
    <div class="desc">
      <div :style="{ marginBottom: '15px' }">图文描述</div>
      <el-form-item label="产品内容" prop="content">
        <PublicEditor class="editor" @event="handleEvent" />
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <PublicUpload @file-deliver="getFile" :avatar="ProductForm.cover" style="width: 100%" />
      </el-form-item>
      <el-form-item label="侧边栏效果图" prop="">
        <div class="small">
          <template v-for="(item, index) in slideCovers" :key="item">
            <PublicUploadV2
              class="item"
              @file-deliver="file => getsildeFile(file, index)"
              :avatar="item.slideCover"
              :style="{ width: '100%' }"
            />
          </template>
        </div>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm"> 添加产品 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import PublicUploadV2 from '@/components/PublicCpns/PublicUpload-v2.vue';
import ProductInfo from './ProductInfo.vue';
import PublicEditor from '@/components/PublicCpns/PublicEditor.vue';
import PublicUpload from '@/components/PublicCpns/PublicUpload.vue';
import { validateData } from '@/assets/js/publicData';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useProduct from '@/stores/modules/useProduct';

const slideCovs = ref([]);
const router = useRouter();
const ProductFormRef = ref();
const ProductForm = reactive({
  price: 0,
  title: '',
  content: '',
  category: 1, //1 最新动态， 2典型案例， 3通知公告
  cover: '',
  file: null
});
const innerData = ref();
const slideCovers = reactive([
  {
    file: null,
    slideCover: ''
  },
  {
    file: null,
    slideCover: ''
  },
  {
    file: null,
    slideCover: ''
  },
  {
    file: null,
    slideCover: ''
  },
  {
    file: null,
    slideCover: ''
  }
]);
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
  // console.log(ProductForm.cover);
  ProductForm.file = file;
};
const getsildeFile = (file, index) => {
  slideCovers[index].slideCover = URL.createObjectURL(file);
  slideCovers[index].file = file;
  slideCovs.value.push(file);
};
const handleEvent = data => {
  ProductForm.content = data;
};

const handleInner = data => {
  innerData.value = data;
};
// 提交表单：ProductForm,innerData，还有useProduct中的productInfo
const productStore = useProduct();
const submitForm = async () => {
  const { productInfo } = storeToRefs(productStore);
  ProductFormRef.value.validate(async valid => {
    // console.log(slideCovs.value);
    const formData = new FormData();

    slideCovs.value.forEach((file, index) => {
      formData.append(`images`, file);
    });
    if (valid) {
      const res = await productStore.fetchProductAdd(
        ProductForm,
        innerData.value,
        formData,
        productInfo.value
      );
      if (res) {
        ElMessage({
          message: '添加成功~~~',
          type: 'success'
        });
        await productStore.fetchProductList();
        router.push('/product-manage/productList');
      } else {
        ElMessage({
          message: '添加失败，可能因为网络原因或者该产品已存在！',
          type: 'error'
        });
      }
    }
  });
};
</script>

<style lang="less" scoped>
.count {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  position: absolute;
  top: 100%;
  left: 0;
}

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
.small {
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  .item {
    margin-right: 15px;
  }
}
</style>
