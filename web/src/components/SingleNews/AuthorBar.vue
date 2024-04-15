<template>
  <div class="bg-container">
    <div class="bg-avatar">
      <img src="@/assets/avatars/authorbg.jpg" alt="" />
      <div class="avatar">
        <el-avatar :size="100" :src="MAINPORT + props.author?.avatar" />
      </div>
    </div>

    <div class="msg">
      {{ props.author?.username }}
    </div>
    <div class="introduction">{{ props.author?.introduction }}</div>
    <div class="bottom">
      <div class="article">
        <!-- TODO -->
        <div class="number">--K</div>
        <div class="subtitle">文章</div>
      </div>
      <div class="fan">
        <div class="number">5</div>
        <div class="subtitle">粉丝</div>
      </div>
    </div>
    <div class="operate">
      <el-button size="small" type="primary" :icon="Plus">关注</el-button>
      <el-button size="small" type="primary" :icon="Message">私信</el-button>
    </div>
    <el-divider />
  </div>
</template>

<script setup>
import { Plus, Message } from '@element-plus/icons-vue';
import { MAINPORT } from '@/assets/js/publicData';

const props = defineProps({
  author: {
    type: Object,
    required: true
  }
});
// const { author } = ref(props);
// console.log(author.value);
</script>

<style lang="less" scoped>
.bg-container {
  position: relative;
  background-color: #fff;
  .avatar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    .el-avatar {
      border: 2px solid #fff;
    }
  }

  .msg {
    text-align: center;
    width: 50px;
    margin: 0 auto;
    padding-top: 70px;
  }
  .bottom {
    padding-top: 30px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    .article {
      flex: 1;
    }
    .fan {
      flex: 1;
    }
    .subtitle {
      font-size: 13px;
      color: #948c84;
    }
  }

  .operate {
    padding-top: 30px;
    text-align: center;
  }
}
.bg-avatar {
  position: relative;
  height: 150px;
  img {
    height: 150px;
  }
}

.introduction {
  box-sizing: border-box;
  padding-top: 15px;
  text-align: center;
  width: 250px;
  margin: 0 auto;
}
</style>
