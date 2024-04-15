<template>
  <div class="login-box">
    <div @click="clickBtn" class="signup">
      <el-icon><Right /></el-icon>
      <span>还没有账号？快去注册</span>
    </div>
    <el-form>
      <img src="../../../assets/avatars/avatar.svg" alt="" class="avatar" />
      <h2>Welcome</h2>
      <div class="input-group">
        <div class="icon">
          <el-icon :size="25"><User /></el-icon>
        </div>
        <div>
          <h5>用户名</h5>
          <input
            @blur="checkForm(userRgex, username)"
            v-model="username.name"
            type="text"
            class="input"
          />
          <span class="error" v-if="!username.isMatch">用户名只能由2-4位汉字或4-8位英文组成！</span>
        </div>
      </div>
      <div class="input-group">
        <div class="icon">
          <el-icon :size="25"><Grid /></el-icon>
        </div>
        <div>
          <h5>密码</h5>
          <input
            @blur="checkForm(pwdRegx, password)"
            v-model="password.name"
            type="password"
            class="input"
          />
          <span class="error" v-if="!password.isMatch">密码只能由英文和数字组成！</span>
        </div>
      </div>
      <a href="#">忘记密码?</a>
      <input type="button" @click="onLogin" class="btn" value="登录" />
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { User, Grid, Right } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import useGest from '@/stores/modules/useGest';
const username = reactive({
  name: '',
  isMatch: true
});
const password = reactive({
  name: '',
  isMatch: true
});
//用户名仅有汉字和纯英文组成，汉字2-4，英文呢=4-8
const userRgex = /^([\u4e00-\u9fa5]{2,4}|[a-zA-Z]{4,8})$/;
//密码仅有6-8位的英文和数字组成
const pwdRegx = /^[a-zA-Z0-9]{6,8}$/;
const checkForm = (regx, text) => {
  if (regx.test(text.name)) {
    text.isMatch = true;
  } else {
    text.isMatch = false;
  }
};
const router = useRouter();
const clickBtn = () => {
  router.push('/main/sign');
};

const gestStore = useGest();
const onLogin = async () => {
  if (username.isMatch && username.name !== '' && password.isMatch && password.name !== '') {
    const result = await gestStore.fetchLoginGest({
      gestname: username.name,
      password: password.name
    });
    if (result.status) {
      ElMessage({
        message: result.msg,
        type: 'success'
      });
      router.replace('/gestmenu/main');
    } else {
      ElMessage({
        message: result.msg,
        type: 'error'
      });
    }
  } else if (username.name === '' || password.name === '') {
    ElMessage({
      message: '请先完成相应表单！',
      type: 'warning'
    });
  }
};
</script>

<style lang="less" scoped>
.signup {
  position: absolute;
  right: 1%;
  top: 15%;
  color: #999999;
  font-size: 15px;
  cursor: pointer;
}
.error {
  font-size: 12px;
  color: #fc5531;
  position: absolute;
  left: 0;
  top: 150%;
}
.icon {
  margin-top: 5px;
}
.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}
form {
  width: 360px;
}
.avatar {
  width: 100px;
}
form h2 {
  font-size: 2.9rem;
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
}

.input-group {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-group:nth-child(1) {
  margin-bottom: 4px;
}
.input-group:before,
.input-group:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: #38d39f;
  transition: 0.5s;
}
.input-group:after {
  right: 50%;
}
.input-group:before {
  left: 50%;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon i {
  color: #d9d9d9;
  transition: 0.5s;
}

.input-group > div {
  position: relative;
  height: 45px;
}

.input-group > div > h5 {
  position: absolute;
  left: 10px;
  // top: 50%;
  transform: translateY(-50%);
  color: #d9d9d9;
  font-size: 18px;
  transition: 0.3s;
}
.input-group.focus .icon i {
  color: #38d39f;
}
.input-group.focus div h5 {
  top: -5px;
  font-size: 15px;
}
.input-group.focus:after,
.input-group.focus:before {
  width: 50%;
}
.input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: 'Roboto', sans-serif;
}
a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}
a:hover {
  color: #38d39f;
}
.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin: 1rem 0;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  background-size: 200%;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}
.copyright {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 2px;
  color: #38d39f;
  text-align: center;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
}
</style>
