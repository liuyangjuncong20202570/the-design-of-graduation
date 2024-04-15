<template>
  <el-dialog v-model="isShow" title="用户搜索">
    <el-card>
      <el-table :data="searchList" style="width: 100%">
        <el-table-column fixed prop="username" label="用户名" />
        <el-table-column label="性别">
          <template #default="scope">
            <div v-if="scope.row.gender === 1" class="ml-2" type="success">男</div>
            <div v-else-if="scope.row.gender === 2" class="ml-2" type="danger">女</div>
            <div v-else class="ml-2" type="danger">保密</div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" class="ml-2" type="success">管理员</el-tag>
            <el-tag v-else class="ml-2" type="danger">编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="你确定想要删除该用户吗？"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button
                  :disabled="scope.row._id === SUPERID ? true : false"
                  size="small"
                  type="danger"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import useUser from '@/stores/modules/useUser';
import { storeToRefs } from 'pinia';
import { SUPERID } from '@/assets/js/publicData';

const userStore = useUser();
const { isShow, searchList, visible, userMsgsingle } = storeToRefs(userStore);
const handleDelete = data => {
  // console.log(data._id);
  if (userStore.delUserlist(data._id)) {
    ElMessage({
      message: '删除成功~~~',
      type: 'success'
    });
    userStore.fethchUserlist();
  } else {
    ElMessage({
      message: '删除失败~~~',
      type: 'error'
    });
  }
};

const handleEdit = data => {
  visible.value = !visible.value;
  userMsgsingle.value = data;
};
</script>

<style lang="less" scoped></style>
