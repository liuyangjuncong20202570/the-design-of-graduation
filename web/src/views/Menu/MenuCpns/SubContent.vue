<template>
  <div class="container-side">
    <div class="xtx-member-aside">
      <div class="user-manage">
        <h4>我的账户</h4>
        <div class="links">
          <RouterLink to="/gestmenu/main">个人中心</RouterLink>
        </div>
        <h4>交易管理</h4>
        <div class="links">
          <RouterLink to="/gestmenu/order">我的订单</RouterLink>
        </div>
      </div>
    </div>
    <div class="article">
      <!-- 三级路由的挂载点 -->
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import useGest from '../../../stores/modules/useGest';
import { storeToRefs } from 'pinia';
const gestStore = useGest();
const { gestData } = storeToRefs(gestStore);
</script>

<style lang="less" scoped>
.container-side {
  margin-top: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding-top: 20px;

  .xtx-member-aside {
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    background-color: #fff;

    .user-manage {
      background-color: #fff;

      h4 {
        font-size: 18px;
        font-weight: 400;
        padding: 20px 52px 5px;
        border-top: 1px solid #f6f6f6;
      }

      .links {
        padding: 0 52px 10px;
      }

      a {
        display: block;
        line-height: 1;
        padding: 15px 0;
        font-size: 14px;
        color: #666;
        position: relative;

        &:hover {
          color: #27ba9b !important;
        }

        &.active,
        &.router-link-exact-active {
          color: #27ba9b;

          &:before {
            display: block;
          }
        }

        &:before {
          content: '';
          display: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          top: 19px;
          left: -16px;
          background-color: #27ba9b;
        }
      }
    }
  }

  .article {
    width: 1000px;
    background-color: #fff;
  }
}
</style>
