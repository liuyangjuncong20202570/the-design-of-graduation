<template>
  <el-page-header :content="content" icon="" :title="title" />
</template>

<script setup>
const props = defineProps({
  content: String,
  title: {
    type: String,
    default: '时代新闻管理系统'
  }
});

const { content, title } = toRefs(props);
</script>

<style lang="less" scoped></style>
