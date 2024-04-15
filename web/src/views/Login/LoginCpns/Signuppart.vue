<template>
  <div class="login-box">
    <el-form>
      <img src="../../../assets/avatars/avatar.svg" alt="" class="avatar" />
      <h2>Sign Up</h2>
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
          <span class="error" v-if="!password.isMatch"
            >密码只能由英文和数字组成,且最少6位最多8位！</span
          >
        </div>
      </div>
      <div class="input-group">
        <div class="icon">
          <el-icon :size="25"><Iphone /></el-icon>
        </div>
        <div>
          <h5>手机号</h5>
          <input
            @blur="checkForm(phoneRegx, phone)"
            v-model="phone.name"
            type="text"
            class="input"
          />
          <span class="error" v-if="!phone.isMatch">请输入正确格式的手机号！</span>
        </div>
      </div>
      <input type="button" @click="submit" class="btn" value="注册" />
    </el-form>
  </div>
</template>

<script setup>
import useGest from '@/stores/modules/useGest';
import { ElMessage } from 'element-plus';
import { User, Grid, Iphone } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

//对网络状态进行判断
watchEffect(() => {
  if (!navigator.onLine) {
    ElMessage({
      message: '网络未连接！',
      type: 'warn'
    });
  }
});
const username = reactive({
  name: '',
  isMatch: true
});
const password = reactive({
  name: '',
  isMatch: true
});
const phone = reactive({
  name: '',
  isMatch: true
});
//用户名仅有汉字和纯英文组成，汉字2-4，英文呢=4-8
const userRgex = /^([\u4e00-\u9fa5]{2,4}|[a-zA-Z]{4,8})$/;
//密码仅有6-8位的英文和数字组成
const pwdRegx = /^[a-zA-Z0-9]{6,8}$/;
const phoneRegx = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const checkForm = (regx, text) => {
  if (regx.test(text.name)) {
    text.isMatch = true;
  } else {
    text.isMatch = false;
  }
};
const router = useRouter();
const GestStore = useGest();
const submit = async () => {
  if (
    username.isMatch &&
    username.name !== '' &&
    password.isMatch &&
    password.name !== '' &&
    phone.isMatch &&
    phone.name !== ''
  ) {
    const res = await GestStore.fetchAddGest({
      gestname: username.name,
      password: password.name,
      phonenumber: phone.name
    });
    if (res.status) {
      ElMessage({
        message: res.msg,
        type: 'success'
      });
      router.replace('/gestmenu/main');
    } else {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
    }
  } else if (username.name === '' || password.name === '' || phone.name === '') {
    ElMessage({
      message: '请先完成相应表单！',
      type: 'warning'
    });
  }
};
</script>

<style lang="less" scoped>
.error {
  font-size: 12px;
  color: #fc5531;
  position: absolute;
  left: 0;
  top: 120%;
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
  margin-top: 12px;
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
