<template>
  <div class="container">
    <div class="news-header"></div>
    <SearchBar :custome-style="customeStyle" :data-list="loopList" :path="path" />
    <div class="wrapper">
      <div class="newest">
        <div class="title">
          <div class="maintitle">最新资讯</div>
          <div class="subTitle">优秀文章带您一探究竟</div>
        </div>
        <div v-if="isLoading" class="loading">
          <img src="@/assets/avatars/loading.gif" alt="" />
          <div class="cover"></div>
        </div>
        <el-row v-if="topNewsList.length" :gutter="20">
          <template v-for="item in topNewsList" :key="item._id">
            <el-col :span="6">
              <NewsItem @click="handleChangePage(item._id)" :content="item" />
            </el-col>
          </template>
        </el-row>
        <div class="morewrapper">
          <div @click="handleClick" class="more">加载更多</div>
        </div>
        <NewsTab class="tab" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '@/components/publicCpns/SearchBar.vue';
import NewsTab from './NewsTab.vue';
import { SWIPERPAGE } from '@/assets/js/publicData';
import NewsItem from './NewsItem.vue';
import useNews from '@/stores/modules/useNews';
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const searchBox = ref();
const searchText = ref('');
const visible = ref(false);
const newsStore = useNews();
const loopList = ref([]);
onMounted(async () => {
  await newsStore.fetchNewsList({});
  const { newsList } = storeToRefs(newsStore);
  loopList.value = newsList.value;
});
const { isLoading, offset } = storeToRefs(newsStore);

const topNewsList = computed(() => loopList.value.slice(0, SWIPERPAGE));

const handleClick = async () => {
  offset.value += SWIPERPAGE;
  const { newsList } = storeToRefs(newsStore);
  if (newsList.value.length <= 4) {
    offset.value = 0;
  }
  await newsStore.fetchNewsList({ offset: offset.value, limit: 10, pagination: true });
  loopList.value = newsList.value;
};
const path = '/news/';
const router = useRouter();
const handleChangePage = async id => {
  router.push(`/news/${id}`);
};

const customeStyle = {
  width: '700px',
  position: 'absolute',
  left: '50%',
  top: '410px',
  transform: 'translate(-50%, -50%)'
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  .news-header {
    width: 100%;
    height: 500px;
    background-image: url(../../../assets/avatars/newsbg3.png);
    background-size: cover;
  }

  .wrapper {
    width: 1080px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 48px 0px;
    .title {
      margin-bottom: 20px;
      .maintitle {
        font-size: 22px;
        font-weight: 700;
      }
      .subTitle {
        font-size: 16px;
        margin-top: 20px;
      }
    }
  }
}
.item {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: whitesmoke;
    color: black;
  }
}

.newest {
  position: relative;
  .morewrapper {
    right: -60px;
    top: 85px;
    position: absolute;
    .more {
      font-size: 18px;
      color: #685849;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px 1px rgba(0, 0, 0, 0.09);
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      writing-mode: vertical-rl;
      letter-spacing: 5px;
      border: 1px solid #eee;
      &:hover {
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18);
      }
    }
  }

  .tab {
    margin-top: 48px;
  }

  .loading {
    position: relative;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 255px;
      z-index: 1000;
    }
    .cover {
      position: absolute;
      width: 1080px;
      height: 255px;
      z-index: 999;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
