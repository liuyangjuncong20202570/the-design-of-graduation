<template>
  <el-dialog v-model="visible" title="用户编辑" width="40%">
    <el-form
      ref="EditUserFormRef"
      :model="gestForm"
      :rules="editRules"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="gestname">
        <el-input v-model="gestForm.gestname" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="gestForm.password" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select style="width: 100%" v-model="gestForm.gender" placeholder="请选择您的性别">
          <el-option
            v-for="item in gender"
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
          v-model="gestForm.introduction"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="头像上传" prop="avatar">
        <PublicUpload @file-deliver="getFile" :avatar="gestForm.avatar" style="width: 100%" />
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
import { CreateFormData } from '@/assets/js/FormDataInOBJ';
import PublicUpload from '@/components/publicCpns/PublicUpload.vue';
import { ElMessage } from 'element-plus';
import { validateData } from '@/assets/js/publicData';
import { storeToRefs } from 'pinia';
import useGest from '@/stores/modules/useGest';

const gestStore = useGest();
const { gestData, visible } = storeToRefs(gestStore);
const EditUserFormRef = ref();
const editRules = reactive(validateData);

const gestForm = reactive({
  gestname: gestData.value.gestname,
  password: gestData.value.password,
  gender: gestData.value.gender,
  introduction: gestData.value.introduction,
  avatar: gestData.value.avatar,
  file: null
});

const gender = [
  {
    value: 0,
    label: '保密'
  },
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  }
];

const getFile = value => {
  gestForm.avatar = URL.createObjectURL(value);
  gestForm.file = value;
};

const handleEdit = async () => {
  EditUserFormRef.value.validate(async valid => {
    if (valid) {
      const params = CreateFormData(gestForm);
      const res = await gestStore.fetchUpdateGest(params);
      if (res) {
        visible.value = false;
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

<style lang="less" scoped></style>
