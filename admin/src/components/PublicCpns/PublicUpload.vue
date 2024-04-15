<template>
  <el-upload
    class="upload-demo"
    action=""
    drag
    :show-file-list="true"
    :auto-upload="false"
    :on-change="handleChange"
    multiple
    accept="image/*"
    :before-upload="checkFileType"
  >
    <img v-if="props.avatar" :src="useAvatar" class="avatar" />
    <div v-else class="container">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽到此处上传或 <em>点击此处进行上传</em></div>
    </div>
    <template #tip>
      <div class="el-upload__tip">jpg/png 文件大小应不超过2mb</div>
    </template>
  </el-upload>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue';
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
:deep(.el-upload-dragger) {
  width: 300px;
  height: 300px;
}
</style>
