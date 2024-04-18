<template>
  <el-upload
    class="upload-demo"
    action=""
    drag
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
    multiple
    accept="image/*"
    :before-upload="checkFileType"
  >
    <img v-if="props.avatar" :src="useAvatar" class="avatar" />
    <div v-else class="container">
      <el-icon :size="50" class="el-icon--upload"><Plus /></el-icon>
    </div>
  </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { MAINPORT } from '../../assets/js/publicData';

// 上传前检查是否为可接收文件
const checkFileType = file => {
  const fileName = file.name;
  const fileType = fileName.substring(fileName.lastIndexOf('.'));
  // jpeg,.png,.jpg,.bmp,.gif
  if (
    fileType === '.jpg' ||
    fileType === '.png' ||
    fileType === '.jpeg' ||
    fileType === '.bmp' ||
    fileType === '.gif'
  ) {
    // 不处理
  } else {
    ElMessage({
      message: '非图片文件请勿上传',
      type: 'error'
    });
    return false;
  }
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片文件大小不可超过 2MB!');
    return false;
  }
};

const props = defineProps({
  avatar: {
    required: true
  }
});

const useAvatar = computed(() => {
  return props.avatar.includes('blob') ? props.avatar : MAINPORT + props.avatar;
});

const emit = defineEmits(['file-deliver']);
const handleChange = file => {
  emit('file-deliver', file.raw);
};
</script>

<style lang="less" scoped>
.avatar {
  width: 100%;
  height: auto;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
}
:deep(.el-upload-dragger) {
  width: 120px;
  height: 120px;
}
</style>
