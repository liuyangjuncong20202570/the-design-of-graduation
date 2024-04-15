<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }">
    <div class="container">
      <div :style="{ backgroundImage: `url(${MAINPORT + props.content.cover})` }" class="img"></div>
      <div style="padding: 14px">
        <div class="bottom">
          {{ props.content.title }}
        </div>
        <div class="time">{{ formatTime(props.content.editTime) }}</div>
        <div class="time">作者：{{ props.content.author }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { MAINPORT } from '@/assets/js/publicData';
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

moment.locales();
const formatTime = time => {
  return moment(time).format('lll');
};
</script>

<style lang="less" scoped>
.el-card {
  flex-shrink: 0;
  cursor: pointer;
  width: 500px;
  margin-bottom: 15px;
  .container {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    flex-direction: row;
  }
}
.bottom {
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.time {
  margin-top: 5px;
  font-size: 13px;
  color: #948c84;
}

.img {
  width: 250px;
  height: 150px;
  background-size: cover;
}
</style>
