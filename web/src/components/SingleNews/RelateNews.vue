<template>
  <div class="title">最近文章</div>
  <div class="content">
    <el-tree :icon="CaretRight" :data="props?.list" @node-click="handleClick" />
  </div>
  <el-divider />
</template>

<script setup>
import useNews from '@/stores/modules/useNews';
import { CaretRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const newsStore = useNews();
const router = useRouter();
const props = defineProps({
  list: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update']);
const handleClick = async data => {
  await newsStore.fetchSingleNews(data._id);
  const { singleList } = storeToRefs(newsStore);
  emit('update', singleList.value);
  router.replace(`/news/${data._id}`);
};
</script>

<style lang="less" scoped>
.title {
  padding-left: 10px;
  margin-left: 20px;
  font-size: 13px;
  border-left: 5px solid #3377e8;
}

.content {
  margin-top: 15px;
  .el-tree {
    width: 100%;
    font-size: 13px;
    :deep(.el-tree-node__label) {
      width: 100%;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
