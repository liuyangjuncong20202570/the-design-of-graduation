<template>
  <div class="container">
    <div :style="{ backgroundImage: `url(${MAINPORT + props.moreNews?.cover})` }" class="img"></div>
    <div class="text">
      <div class="bottom">
        {{ props.moreNews?.title }}
      </div>
      <div class="time">{{ formatTime(props.moreNews?.editTime) }}</div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { MAINPORT } from '@/assets/js/publicData';

const formatTime = time => {
  return moment(time).format('LLL');
};
const props = defineProps({
  moreNews: {
    type: Object,
    required: true
  }
});
</script>

<style lang="less" scoped>
.container {
  cursor: pointer;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  flex-direction: row;
}

.text {
  box-sizing: border-box;
  margin-left: 10px;
  .bottom {
    font-size: 14px;
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
    font-size: 12px;
    margin-top: 5px;
    font-size: 13px;
    color: #948c84;
  }
}

.img {
  margin-left: 15px;
  border-radius: 5%;
  width: 100px;
  height: 68px;
  background-size: cover;
}
</style>
