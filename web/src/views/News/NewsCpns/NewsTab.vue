<template>
  <el-tabs v-model="activeName">
    <template v-for="item in tabList" :key="item.name">
      <el-tab-pane :label="item.label" :name="item.name">
        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="14">
              <div class="item">
                <template v-for="(item, index) in newsList" :key="item._id">
                  <TabItem @click="handleChangePage(item._id)" class="item" :content="item" />
                </template>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="timeline">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in newsList"
                    :key="item._id"
                    :timestamp="formatTime(item.editTime)"
                  >
                    {{ item.title }}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import TabItem from './TabItem.vue';
import useNews from '@/stores/modules/useNews';
import { storeToRefs } from 'pinia';

const activeName = ref(1);
const newsStore = useNews();
const newsList = ref([]);
moment.locales();
const formatTime = time => {
  return moment(time).format('lll');
};
onMounted(async () => {
  await newsStore.fetchCategoryList(activeName.value);
  const { categoryList } = storeToRefs(newsStore);
  newsList.value = categoryList.value;
});

onUpdated(async () => {
  await newsStore.fetchCategoryList(activeName.value);
  const { categoryList } = storeToRefs(newsStore);
  newsList.value = categoryList.value;
});
const tabList = [
  {
    label: '最新动态',
    name: 1
  },
  {
    label: '商业电商',
    name: 2
  },
  {
    label: '业界观察',
    name: 3
  }
];

const router = useRouter();
const handleChangePage = async id => {
  router.push(`/news/${id}`);
};
</script>

<style lang="less" scoped>
.box-card {
  height: 520px;
  overflow: auto;
  .timeline {
    box-sizing: border-box;
    padding-right: 30px;
  }
}
</style>
