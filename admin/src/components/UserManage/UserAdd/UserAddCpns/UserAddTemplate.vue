<template>
  <PublicHeader content="添加用户" title="用户管理" />
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户添加</span>
      </div>
    </template>
    <el-form
      ref="AddUserFormRef"
      :model="userForm"
      :rules="userRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select style="width: 100%" v-model="userForm.role" placeholder="请选择该用户的角色">
          <el-option
            v-for="item in role"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input
          :rows="5"
          placeholder="写一条对该用户的评价吧~~~"
          v-model="userForm.introduction"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="头像上传" prop="avatar">
        <PublicUpload @file-deliver="getFile" :avatar="userForm.avatar" style="width: 100%" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 添加用户 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import PublicUpload from '@/components/PublicCpns/PublicUpload.vue';
import PublicHeader from '@/components/PublicCpns/PublicHeader.vue';
import { validateData } from '@/assets/js/publicData';
import { CreateFormData } from '@/assets/js/FormDataInObj';
import useUser from '@/stores/modules/useUser';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const role = [
  {
    value: 1,
    label: '管理员'
  },
  {
    value: 2,
    label: '编辑'
  }
];
const AddUserFormRef = ref();
const userForm = reactive({
  username: '',
  password: '',
  role: 2,
  introduction: '',
  avatar: '',
  gender: 0,
  file: null
});
const userRules = reactive(validateData);
const getFile = value => {
  userForm.avatar = URL.createObjectURL(value);
  userForm.file = value;
};

const UserStore = useUser();
const router = useRouter();
const submitForm = () => {
  AddUserFormRef.value.validate(valid => {
    if (valid) {
      const params = CreateFormData(userForm);
      UserStore.addUserinfo(params).then(res => {
        if (res) {
          router.push('/user-manage/userlist');
          ElMessage({
            message: '添加成功~~~',
            type: 'success'
          });
        } else {
          ElMessage({
            message: '添加失败，可能是因为网络原因或该用户已存在',
            type: 'error'
          });
        }
      });
    }
  });
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 50px;
}
</style>
