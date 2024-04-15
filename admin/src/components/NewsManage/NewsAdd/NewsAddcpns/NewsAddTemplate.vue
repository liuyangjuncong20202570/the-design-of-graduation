<template>
  <PublicHeader content="创建新闻" title="新闻管理" />
  <el-form
    ref="NewsFormRef"
    :model="newsForm"
    :rules="newsRules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="newsForm.title" />
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="newsForm.author" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <PublicEditor @event="handleEvent" />
    </el-form-item>
    <el-form-item label="类别" prop="category">
      <el-select style="width: 100%" v-model="newsForm.category" placeholder="请选择新闻类别">
        <el-option
          v-for="item in category"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <PublicUpload @file-deliver="getFile" :avatar="newsForm.cover" style="width: 100%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm"> 添加新闻 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import useUser from '@/stores/modules/useUser';
import useNews from '@/stores/modules/useNews';
import PublicUpload from '@/components/PublicCpns/PublicUpload.vue';
import PublicEditor from '@/components/PublicCpns/PublicEditor.vue';
import { validateData } from '@/assets/js/publicData';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const NewsFormRef = ref();
const newsForm = reactive({
  title: '',
  content: '',
  category: 1, //1 最新动态， 2典型案例， 3通知公告
  cover: '',
  file: null,
  isPublish: 0, //0未发布， 1已发布
  author: '' //作者
});
const newsRules = reactive(validateData);
const handleEvent = data => {
  newsForm.content = data;
};

// 封面处理函数
const getFile = file => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};

// 新闻类别
const category = [
  {
    label: '最新动态',
    value: 1
  },
  {
    label: '商业电商',
    value: 2
  },
  {
    label: '业界观察',
    value: 3
  }
];

// 提交表单
const newsStore = useNews();
const userStore = useUser();
const { userInfo } = storeToRefs(userStore);
const submitForm = async () => {
  NewsFormRef.value.validate(async valid => {
    if (valid) {
      if (newsStore.PostNewsInfo(newsForm)) {
        ElMessage({
          message: '添加成功~~~',
          type: 'success'
        });
        await newsStore.fetchNewsInfo(userInfo.value);
        router.push('/news-manage/newsList');
      } else {
        ElMessage({
          message: '添加失败，请稍后再试',
          type: 'error'
        });
      }
    }
  });
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 50px;
}
</style>
