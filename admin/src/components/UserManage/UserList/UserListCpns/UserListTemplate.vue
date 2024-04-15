<template>
  <UserSearchDialog />
  <UserListEdit />
  <el-card>
    <PublicHeader content="用户列表" title="用户管理" />
    <UserListSearch class="search" />
    <el-table :data="userList" style="width: 100%">
      <el-table-column fixed prop="username" label="用户名" />
      <el-table-column label="头像">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar :fit="cover" :size="50" :src="MAINPORT + scope.row.avatar" />
          </div>
          <div v-else>
            <el-avatar :fit="cover" :size="50" :src="DEFAULTURL" />
          </div>
        </template>
      </el-table-column>

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
</template>

<script setup>
import UserSearchDialog from './UserSearchDialog.vue';
import UserListSearch from './UserListSearch.vue';
import { SUPERID } from '@/assets/js/publicData';
import { ElMessage } from 'element-plus';
import { DEFAULTURL, MAINPORT } from '@/assets/js/publicData';
import UserListEdit from './UserListEdit.vue';
import PublicHeader from '@/components/PublicCpns/PublicHeader.vue';
import useUser from '@/stores/modules/useUser';
import { storeToRefs } from 'pinia';
const UserStore = useUser();
const { userList, visible, userMsgsingle } = storeToRefs(UserStore);
onMounted(() => {
  UserStore.fethchUserlist();
});

const handleEdit = data => {
  visible.value = !visible.value;
  userMsgsingle.value = data;
};

const handleDelete = data => {
  // console.log(data._id);
  if (UserStore.delUserlist(data._id)) {
    ElMessage({
      message: '删除成功~~~',
      type: 'success'
    });
    UserStore.fethchUserlist();
  } else {
    ElMessage({
      message: '删除失败~~~',
      type: 'error'
    });
  }
};

// for instance
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}

.search {
  margin-top: 20px;
}
</style>
