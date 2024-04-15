<template>
  <el-form
    ref="ProductInfoRef"
    :model="ProductInfo"
    :rules="ProductInfoRules"
    label-width="120px"
    class="demo-ruleForm form"
    status-icon
  >
    <el-form-item size="small" label="自定义产品规格" prop="spec">
      <el-tag type="info"
        >自定义销售属性为非必填项，您可以自定义填写属性项和属性值的名称，如果不需要设置可以不填写。</el-tag
      >
    </el-form-item>
    <template v-for="(item, index) in startIndex" :key="item">
      <AsyncComponent
        @delete="handleDelete(index)"
        @delievery="handleDelievery"
        :is-show="isShow"
      />
    </template>
    <el-form-item size="small">
      <el-button @click="addCmp" :disabled="isUse" type="info" size="default" round
        >点击添加自定义属性</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm"> 添加产品 </el-button>
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
const AsyncComponent = defineAsyncComponent(() => import('./ProductSaleItem.vue'));
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
const handleDelete = index => {
  startIndex.value.splice(index, 1);
  typeSize.value.splice(index, 1);
  isShow.value = false;
};
const handleDelievery = value => {
  typeSize.value.push(value);
  // console.log(value);
};
const submitForm = () => {
  const newArr = [];
  let set1 = new Set();
  let set2 = new Set();
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
      newArr.push(item);
    }
  });
  console.log(newArr);
};
</script>

<style lang="less" scoped>
.el-form[data-v-345cc7b3] {
  margin-top: 0px;
}
</style>
