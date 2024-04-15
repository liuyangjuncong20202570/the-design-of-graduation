<template>
  <div class="container">
    <div class="content">
      <div class="main">
        <h2 class="title">{{ currentNews?.title }}</h2>
        <div class="info">
          <span class="author">{{ currentNews?.author }}</span> ·
          <span class="time">{{ formatTime(currentNews?.editTime) }}</span> ·
          {{ categoryFormat(currentNews?.category) }}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="text" v-html="currentNews?.content"></div>
      </div>
      <div class="sidebar">
        <AuthorBar :author="author" />
        <RelateNews @update="watchUpdate" :list="relateList" />
        <MoreRecommand @update="watchUpdate2" :more-list="moreList" />
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
import MoreRecommand from '@/components/SingleNews/MoreRecommand.vue';
import RelateNews from '@/components/SingleNews/RelateNews.vue';
import AuthorBar from '@/components/SingleNews/AuthorBar.vue';
import { StarFilled } from '@element-plus/icons-vue';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import useNews from '@/stores/modules/useNews';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const moreList = ref();
const relateList = ref();
const author = ref();
const currentNews = ref();
const route = useRoute();
const newsStore = useNews();
onMounted(async () => {
  await newsStore.fetchSingleNews(route.params.id);
  const { singleList } = storeToRefs(newsStore);
  currentNews.value = singleList.value[0];

  await newsStore.fetchAuthorMsg(currentNews.value.author);
  const { authorMsg } = storeToRefs(newsStore);
  author.value = authorMsg.value[0];

  await newsStore.fetchRelateNews(currentNews.value.author);
  const { relateNews } = storeToRefs(newsStore);
  relateList.value = relateNews.value.map(item => ({ ...item, label: item.title }));

  await newsStore.fetchNewsList({});
  const { newsList } = storeToRefs(newsStore);
  moreList.value = newsList.value;
});

const watchUpdate = value => {
  currentNews.value = value[0];
};

const watchUpdate2 = value => {
  currentNews.value = value;
};

const formatTime = time => {
  return moment(time).format('LLL');
};

const categoryFormat = value => {
  const arr = ['最新动态', '商业电商', '业界观察'];
  return arr[value - 1];
};
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  background-color: #f5f5f5;
  .content {
    background-color: #f5f5f5;
    margin: 0 auto;
    padding-top: 50px;
    width: 1300px;
    display: flex;
    justify-content: space-between;
    .main {
      box-sizing: border-box;
      padding: 20px 15px;
      background-color: #fff;
      width: 950px;
      // flex: 3;
    }

    .sidebar {
      box-sizing: border-box;
      background-color: #fff;
      // flex: 1;
      width: 320px;
      max-height: 100%;
    }
  }
}

.info {
  .author {
    color: #5e89d7;
    cursor: pointer;
  }
  margin-top: 25px;
  font-size: 13px;
  color: #948c84;
}
.text {
  font-size: 16px;
  :deep(img) {
    max-width: 100%;
  }
}
.content {
  width: 1200px;
  :deep(img) {
    max-width: 100%;
  }
}
.footer {
  margin-top: 50px;
  height: 200px;
  background-color: #2d3236;
}
</style>
