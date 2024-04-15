<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>个人中心</span>
      </div>
    </template>
    <el-form
      ref="updateFormRef"
      :model="updateForm"
      :rules="updateRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateForm.username" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select style="width: 100%" v-model="updateForm.gender" placeholder="请选择你的性别">
          <el-option
            v-for="item in genders"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input
          :rows="5"
          placeholder="写一条自我评价吧~~~"
          v-model="updateForm.introduction"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="头像上传" prop="avatar">
        <PublicUpload @file-deliver="getFile" :avatar="updateForm.avatar" style="width: 100%" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 更新 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useUser from '@/stores/modules/useUser';
import PublicUpload from '@/components/PublicCpns/PublicUpload.vue';
import { validateData } from '../../../assets/js/publicData';
import { ElMessage } from 'element-plus';
import { CreateFormData } from '@/assets/js/FormDataInObj.js';

const updateFormRef = ref();
const updateRules = reactive(validateData);
const UserStore = useUser();
const { userInfo } = storeToRefs(UserStore);
// 此处注意，应将value属性值设置为number类型，否则将无法匹配
const genders = [
  {
    value: 0,
    label: '保密'
  },
  { value: 1, label: '男性' },
  { value: 2, label: '女性' }
];
const updateForm = reactive({
  username: userInfo.value.username,
  gender: userInfo.value.gender,
  introduction: userInfo.value.introduction,
  avatar: userInfo.value.avatar,
  file: null
});

// 获取由upload组件传递的file原生对象
const getFile = value => {
  updateForm.avatar = URL.createObjectURL(value);
  updateForm.file = value;
};

// 更新按钮提交表单函数
const submitForm = () => {
  updateFormRef.value.validate(valid => {
    if (valid) {
      const params = CreateFormData(updateForm);
      if (UserStore.UpdateUserinfo(params)) {
        ElMessage({
          message: '更新成功~~~',
          type: 'success'
        });
      } else {
        ElMessage({
          message: '更新失败，请稍后再试',
          type: 'error'
        });
      }
    }
  });
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 50px;
}
</style>
