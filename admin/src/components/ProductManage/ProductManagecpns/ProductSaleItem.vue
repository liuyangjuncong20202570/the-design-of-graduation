<template>
  <el-form-item v-if="isShow" size="small">
    <div class="wrapper">
      <el-input
        class="input"
        v-model="element.elName"
        style="width: 240px"
        placeholder="属性名称"
      />
      <el-tag
        @click="handleClick"
        :style="{ cursor: 'pointer', marginRight: '10px' }"
        size="large"
        effect="dark"
      >
        移除
      </el-tag>
      <el-tag type="success" @click="delievery" style="cursor: pointer" size="large" effect="dark">
        确认
      </el-tag>
      <br />
      <template v-for="item in startArr">
        <el-input
          class="input"
          @blur="handleBlur"
          v-model="element.elValue[item]"
          style="width: 240px"
          placeholder="属性值"
        />
      </template>
    </div>
  </el-form-item>
</template>

<script setup>
import _ from 'underscore';
const isShow = ref(true);
const startArr = ref([0]);
const handleBlur = () => {
  if (startArr.value.length === 10) return;
  startArr.value.push(startArr.value.length);
};
const element = reactive({
  elName: '',
  elValue: []
});
const props = defineProps({
  isShow: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['delete', 'delievery']);
const handleClick = () => {
  emit('delete');
  isShow.value = props.isShow;
};
const delievery = () => {
  // let uniqueValues = [...new Set(element.elValue)];
  // let newElement = { elName: element.elName, elValue: uniqueValues };
  _.throttle(emit('delievery', element), 1000);
  // emit('delievery', element);
};
</script>

<style lang="less" scoped>
.input {
  width: 108px;
  margin-bottom: 5px;
  font-size: 12px;
  height: 34px;
  line-height: 34px \0;
  padding: 0 9px;
  font-size: 12px;
}
</style>
