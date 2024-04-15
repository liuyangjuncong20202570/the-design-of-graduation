<template>
  <el-card>
    <PublicHeader content="新闻列表" title="新闻管理" />
    <el-table :data="newsInfo" style="width: 100%">
      <el-table-column fixed prop="title" label="标题" />
      <el-table-column label="类别">
        <template #default="scope">
          {{ categoryFormat(scope.row.category) }}
        </template>
      </el-table-column>
      <el-table-column label="作者">
        <template #default="scope">
          {{ scope.row.author ? scope.row.author : '佚名' }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ formatTime(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column label="是否发布">
        <template #default="scope">
          <el-switch
            :click="handleSwitch(scope.row)"
            v-model="scope.row.isPublish"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)" />
          <el-button circle :icon="Edit" @click="handleEdit(scope.row)" />
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="你确定想要删除该篇新闻吗？"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button circle :icon="Delete" type="danger" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <NewsPreviewDialog :content="previewParam" />
</template>

<script setup>
import { ElMessage } from 'element-plus';
import NewsPreviewDialog from './NewsPreviewDialog.vue';
import { Star, Edit, Delete } from '@element-plus/icons-vue';
import formatTime from '@/assets/js/formatTime';
import PublicHeader from '@/components/PublicCpns/PublicHeader.vue';
import useNews from '@/stores/modules/useNews';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useUser from '@/stores/modules/useUser';

const router = useRouter();
const previewParam = ref({});
const newsStore = useNews();
const userStore = useUser();
const { userInfo } = storeToRefs(userStore);

onMounted(async () => {
  await newsStore.fetchNewsInfo(userInfo.value);
});
const { newsInfo, isShow } = storeToRefs(newsStore);

const categoryFormat = value => {
  const arr = ['最新动态', '商业电商', '业界观察'];
  return arr[value - 1];
};

const handleSwitch = value => {
  newsStore.PutNewsInfo({
    _id: value._id,
    isPublish: value.isPublish
  });
};

const handlePreview = data => {
  previewParam.value = data;
  isShow.value = true;
};

const handleDelete = async data => {
  if (newsStore.DeleteNewsInfo(data._id)) {
    ElMessage({
      message: '删除成功~~~',
      type: 'success'
    });
    await newsStore.fetchNewsInfo();
  } else {
    ElMessage({
      message: '删除失败，请稍后再试',
      type: 'error'
    });
  }
};

// 编辑回调
const handleEdit = data => {
  router.push(`/news-manage/newsedit/${data._id}`);
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 50px;
}
</style>
