<template>
  <el-table row-key="id" :data="newArr" style="width: 100%" height="250" default-expand-all>
    <el-table-column prop="elName" label="属性" />
    <el-table-column label="价格(元)" width="320">
      <template #default="scope">
        <el-input
          v-if="!scope.row.isEl"
          v-model="scope.row.elPrice"
          style="width: 240px"
          placeholder="0"
        />
      </template>
    </el-table-column>
    <el-table-column label="库存(件)" width="600">
      <template #default="scope">
        <el-input
          v-if="!scope.row.isEl"
          v-model="scope.row.elCount"
          style="width: 240px"
          placeholder="请输入件数"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { formatArr } from '@/assets/js/FormatArr';
import useProduct from '@/stores/modules/useProduct';
import { storeToRefs } from 'pinia';
const props = defineProps({
  storeData: {
    type: Array,
    default: []
  }
});
const newArr = ref([]);
newArr.value = formatArr(props.storeData);
const productStore = useProduct();
const { productInfo } = storeToRefs(productStore);
onMounted(() => {
  productInfo.value = newArr.value;
});
</script>

<style lang="less" scoped></style>
