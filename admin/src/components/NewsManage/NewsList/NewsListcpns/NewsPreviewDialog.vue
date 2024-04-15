<template>
  <el-dialog v-model="isShow" title="新闻预览" width="40%">
    <h2>{{ props.content.title }}</h2>
    <div class="time">{{ formatTime(props.content.editTime) }}</div>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <div class="htmlcontent" v-html="props.content.content"></div>
  </el-dialog>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue';
import formatTime from '@/assets/js/formatTime';
import useNews from '@/stores/modules/useNews';
import { storeToRefs } from 'pinia';

const props = defineProps({
  content: {
    required: true,
    type: Object
  }
});

const newsStore = useNews();
const { isShow } = storeToRefs(newsStore);
</script>

<style lang="less" scoped>
.time {
  font-size: 12px;
  color: gray;
}

.htmlcontent {
  :deep(img) {
    max-width: 100%;
  }
}
</style>
