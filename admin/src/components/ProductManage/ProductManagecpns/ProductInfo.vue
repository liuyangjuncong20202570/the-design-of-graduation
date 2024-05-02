<template>
  <el-form
    ref="ProductInfoRef"
    :model="ProductInfo"
    :rules="ProductInfoRules"
    label-width="120px"
    class="demo-ruleForm form"
    status-icon
  >
    <el-form-item size="small" label="自定义产品规格">
      <el-tag type="info"
        >自定义销售属性为非必填项，您可以自定义填写属性项和属性值的名称，如果不需要设置可以不填写。</el-tag
      >
    </el-form-item>
    <template v-for="(item, index) in startIndex" :key="item">
      <AsyncComponent
        @delete="data => handleDelete(data, index)"
        @delievery="handleDelievery"
        :is-show="isShow"
      />
    </template>
    <el-form-item size="small">
      <el-button @click="addCmp" :disabled="isUse" type="info" size="default" round
        >点击添加自定义属性</el-button
      >
      <el-button
        @click="submitForm"
        :disabled="typeSize.length === 0"
        type="warning"
        size="default"
        round
        >确认添加以上属性</el-button
      >
    </el-form-item>
    <el-form-item v-if="uniqueArr.length" label="销售规格" size="default">
      <ProductDetail :key="uniqueArr" :store-data="uniqueArr" />
    </el-form-item>
    <el-form-item label="总库存">
      <el-input v-model="productInfos.totalStore" />
      <span v-if="productInfos.totalStore === 0" class="count"
        >总库存不可为空，且子属性所含库存不可超过总库存</span
      >
    </el-form-item>
    <el-form-item label="产品品牌">
      <el-input v-model="productInfos.productBrand" />
      <span v-if="!productInfos.productBrand" class="brand">产品品牌不可为空</span>
    </el-form-item>
    <el-form-item label="产品类型">
      <el-input v-model="productInfos.productType" />
      <span v-if="!productInfos.productType" class="type">产品类型不可为空</span>
    </el-form-item>
    <el-form-item label="产品材质">
      <el-input v-model="productInfos.productMteri" />
      <span v-if="!productInfos.productMteri" class="mteri">产品材质不可为空</span>
    </el-form-item>
    <el-form-item label="适用人群">
      <el-input @blur="handleBur" v-model="productInfos.productAge" />
      <span v-if="!productInfos.productAge" class="age">适用人群不可为空</span>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { validateData } from '@/assets/js/publicData';

const typeSize = ref([]);
const ProductInfoRef = ref();
const ProductInfo = reactive({});
const ProductInfoRules = reactive(validateData);
const startIndex = ref([]);
const isShow = ref(true);
const newArr = ref([]);
const uniqueArr = ref([]);
const productInfos = reactive({
  totalStore: 0,
  productBrand: '',
  productType: '',
  productMteri: '',
  productAge: ''
});
const AsyncComponent = defineAsyncComponent(() => import('./ProductAddCpns/ProductSaleItem.vue'));
const ProductDetail = defineAsyncComponent(() => import('./ProductAddCpns/ProductDetail.vue'));
const addCmp = async () => {
  startIndex.value.push(startIndex.value.length);
};
const isUse = computed(() => {
  if (startIndex.value.length === 4) {
    return true;
  } else {
    return false;
  }
});

const handleDelete = (item, index) => {
  startIndex.value.splice(index, 1);
  uniqueArr.value.forEach((i, id) => {
    if (i.elName === item.elName) {
      uniqueArr.value.splice(id, 1);
    }
  });
  typeSize.value.forEach((i, id) => {
    if (i.elName === item.elName) {
      typeSize.value.splice(id, 1);
    }
  });
  isShow.value = false;
};
const handleDelievery = value => {
  typeSize.value.push(value);
  // console.log(value);
};
const submitForm = () => {
  let set1 = new Set();
  let set2 = new Set();
  if (typeSize.value.length) {
    typeSize.value.forEach(item => {
      if (!set1.has(item.elName)) {
        set1.add(item.elName);
        item.elValue.forEach(idx => {
          if (!set2.has(item.elValue[idx])) {
            set2.add(item.elValue[idx]);
          } else {
            return;
          }
        });
        newArr.value.push(item);
      }
    });
  } else {
    newArr.value.push(item);
  }
  uniqueArr.value = Array.from(new Set(newArr.value));
  newArr.value = [];
};
const emit = defineEmits(['inner']);
const handleBur = () => {
  emit('inner', productInfos);
};
</script>

<style lang="less" scoped>
.el-form[data-v-345cc7b3] {
  margin-top: 0px;
}

.count,
.price,
.brand,
.type,
.mteri,
.age {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
