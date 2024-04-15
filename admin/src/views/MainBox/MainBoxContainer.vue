<template>
  <div class="common-layout">
    <el-container>
      <SideMenu />
      <el-container direction="vertical">
        <TopHeader />
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideMenu from '../../components/MainBox/SideMenu.vue';
import TopHeader from '../../components/MainBox/TopHeader.vue';
</script>

<style lang="less" scoped>
.common-layout {
  .el-main {
    overflow: auto;
    height: calc(100vh - 60px);
  }
}
</style>
