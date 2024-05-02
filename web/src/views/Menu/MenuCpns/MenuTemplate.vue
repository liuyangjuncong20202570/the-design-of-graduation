<template>
  <MsgEdit />
  <div class="wrapper">
    <Header />
    <SubContent />
  </div>
  <LayoutFooter />
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter/LayoutFooter.vue';
import MsgEdit from './MsgEdit.vue';
import Header from '@/views/Layout/Header.vue';
import SubContent from './SubContent.vue';
import useGest from '../../../stores/modules/useGest';
import { storeToRefs } from 'pinia';
const gestStore = useGest();
const { gestData } = storeToRefs(gestStore);
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
}
</style>
