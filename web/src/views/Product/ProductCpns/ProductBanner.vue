<template>
  <div class="container-el">
    <div class="block text-center">
      <el-carousel height="500px">
        <el-carousel-item>
          <img src="../../../assets/avatars/banner1.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../assets/avatars/banner2.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../assets/avatars/banner3.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../assets/avatars/banner4.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../assets/avatars/banner5.jpg" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
img {
  height: 500px;
  width: 100%;
  object-fit: cover;
}
.container-el {
  background-color: #f5f5f5;
  overflow: hidden;
}
.block {
  width: 1240px;
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
