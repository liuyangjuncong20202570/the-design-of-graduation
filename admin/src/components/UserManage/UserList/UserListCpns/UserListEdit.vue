<template>
  <el-dialog v-model="visible" title="用户编辑" width="40%">
    <el-form
      ref="EditUserFormRef"
      :model="userMsgsingle"
      :rules="editRules"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userMsgsingle.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userMsgsingle.password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
          style="width: 100%"
          v-model="userMsgsingle.role"
          placeholder="请选择该用户的角色"
        >
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
          v-model="userMsgsingle.introduction"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { validateData } from '@/assets/js/publicData';
import useUser from '@/stores/modules/useUser';
import { storeToRefs } from 'pinia';
const UserStore = useUser();
const { visible, userMsgsingle } = storeToRefs(UserStore);
const EditUserFormRef = ref();
const editRules = reactive(validateData);

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

const handleEdit = () => {
  EditUserFormRef.value.validate(valid => {
    if (valid) {
      // 更新后端
      UserStore.updUsersingle(userMsgsingle.value._id, userMsgsingle.value);
      // 隐藏dialog
      visible.value = false;
      ElMessage({
        message: '修改成功~~~',
        type: 'success'
      });
    }
  });
};
</script>

<style lang="less" scoped></style>
