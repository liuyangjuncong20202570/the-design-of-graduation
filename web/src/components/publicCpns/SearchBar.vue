<template>
  <div :style="props.customeStyle" class="search">
    <el-popover :visible="visible" placement="bottom" title="检索结果" width="40%">
      <template #reference>
        <el-input
          ref="searchBox"
          type="search"
          size="large"
          v-model="searchText"
          placeholder="请输入新闻标题"
          class="input-with-select"
          @input="visible = true"
          @blur="hidePopover"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </template>

      <div v-if="searchNewslist.length">
        <div v-for="item in searchNewslist">
          <div
            :style="{ cursor: 'pointer', marginBottom: '10px' }"
            @click="handleChangePage(item._id)"
            class="item"
          >
            <el-icon><Search /></el-icon>
            {{ item.title }}
          </div>
        </div>
      </div>
      <div v-else>
        <el-empty description="空空如也" />
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const searchBox = ref();
const searchText = ref('');
const visible = ref(false);
const hidePopover = () => {
  setTimeout(() => {
    visible.value = false;
  }, 500);
};
const props = defineProps({
  customeStyle: {
    type: Object
  },
  path: {
    type: String
  },
  dataList: {
    type: Array,
    default: []
  }
});
// const loopList = ref([]);
// onMounted(() => {
//   loopList.value = props.dataList;
// });
const searchNewslist = computed(() => {
  // searchText.value ? loopList.value.filter(item => item.title.includes(searchText.value)) : [];
  if (searchText.value) {
    return props.dataList.filter(item => item.title.includes(searchText.value));
  } else {
    visible.value = false;
    return [];
  }
});
const router = useRouter();
const handleChangePage = id => {
  router.push(`${props.path}${id}`);
};
</script>

<style lang="less" scoped></style>
