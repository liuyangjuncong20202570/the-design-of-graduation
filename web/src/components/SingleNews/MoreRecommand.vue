<template>
  <div class="title">更多推荐</div>
  <template v-for="item in props?.moreList?.slice(0, 9)" :key="item._id">
    <RecommandItem @click="handleClick(item)" class="item" :more-news="item" />
    <el-divider />
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import RecommandItem from './RecommandItem.vue';
const router = useRouter();
const props = defineProps({
  moreList: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update']);
const handleClick = item => {
  emit('update', item);
  router.push(`/news/${item._id}`);
};
</script>

<style lang="less" scoped>
.title {
  padding-left: 10px;
  margin-left: 20px;
  margin-bottom: 15px;
  font-size: 13px;
  border-left: 5px solid #3377e8;
}

.item:first-child {
  margin-top: 30px;
}
</style>
