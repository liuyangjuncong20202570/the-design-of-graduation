<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    status-icon
    :rules="loginRules"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { validateData } from '@/assets/js/publicData.js';
import { useRouter } from 'vue-router';
import useUser from '@/stores/modules/useUser';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';

// 登录主体

// 表单DOM
const loginFormRef = ref();
// 双向绑定元素
const loginForm = reactive({
  username: '',
  password: ''
});
// 验证规则
const loginRules = reactive(validateData);
const router = useRouter();
const UserStore = useUser();
const { userInfo } = storeToRefs(UserStore);

const submitForm = async () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      UserStore.LoginStatus(loginForm).then(res => {
        console.log(userInfo.value);
        if (res === 200) {
          router.push('/index');
          ElMessage({
            message: '欢迎回来~~~',
            type: 'success'
          });
        } else {
          ElMessage({
            message: '用户名或密码错误，请稍后再试',
            type: 'error'
          });
        }
      });
    }
  });
};

const resetForm = () => {
  (loginForm.username = ''), (loginForm.password = '');
};
</script>

<style lang="less" scoped>
:deep(.el-form-item__label) {
  color: #ffffff;
  font-size: 18px;
}
</style>
