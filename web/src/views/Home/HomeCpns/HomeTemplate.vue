<template>
  <div class="container">
    <el-carousel height="400px">
      <el-carousel-item key="1">
        <div class="bg1"></div>
      </el-carousel-item>
      <el-carousel-item key="2">
        <div class="bg2"></div>
      </el-carousel-item>
      <el-carousel-item key="3">
        <div class="bg3"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">互联网＋时代</div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.bg1,
.bg2,
.bg3 {
  height: 400px;
  width: 100%;
  background-image: url('../../../assets/avatars/home1.png');
  background-size: cover;
  background-repeat: no-repeat;
}
.bg2 {
  background-image: url('../../../assets/avatars/home2.png');
}
.bg3 {
  background-image: url('../../../assets/avatars/home3.png');
}

.container {
  position: relative;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  line-height: 400px;
  font-size: 60px;
  color: white;
  text-align: center;
}
</style>
