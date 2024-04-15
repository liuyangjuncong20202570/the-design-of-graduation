<template>
  <div id="editor"></div>
</template>

<script setup>
import E from 'wangeditor';

const props = defineProps({
  content: {
    required: true
  }
});
const emit = defineEmits(['event']);
onMounted(() => {
  const editor = new E('#editor');
  editor.config.onchange = function (newHtml) {
    emit('event', newHtml);
  };
  // 配置触发 onchange 的时间频率，默认为 200ms
  editor.config.onchangeTimeout = 500; // 修改为 500ms
  editor.create();
  props.content && editor.txt.html(props.content);
});
</script>

<style lang="less" scoped></style>
