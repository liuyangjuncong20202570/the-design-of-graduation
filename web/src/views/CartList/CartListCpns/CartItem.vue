<template>
  <td>
    <div class="goods">
      <RouterLink to="/"><img :src="MAINPORT + cartItem.product.cover" alt="" /></RouterLink>
      <div>
        <div class="name">
          {{ cartItem.product.title }}
        </div>
        <div class="subInfo">
          <template v-for="item in cartItem.size">
            <div class="type">
              {{ item.elName }}: {{ item.elValue.elName }} - 库存：{{ item.elValue.elCount }}
            </div>
          </template>
          <div class="brand">品牌: {{ cartItem.productinfo.productBrand }}</div>
        </div>
      </div>
    </div>
  </td>
  <td class="tc">
    <p>&yen;{{ cartItem.price }}</p>
  </td>
  <td class="tc">
    <el-input-number v-model="cartItem.count" @change="handelChange" :min="1" />
  </td>
  <td class="tc">
    <p class="f16 red">&yen;{{ (cartItem.price * cartItem.count).toFixed(2) }}</p>
  </td>
  <td class="tc">
    <p>
      <el-popconfirm
        title="确认删除吗?"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="handleConfirm(cartItem._id)"
      >
        <template #reference>
          <a href="javascript:;">删除</a>
        </template>
      </el-popconfirm>
    </p>
  </td>
</template>

<script setup>
import { emitter } from '@/assets/js/EventEmitter';
import { MAINPORT } from '@/assets/js/publicData';
import useCart from '@/stores/modules/useCart';
import { ElMessage } from 'element-plus';
const props = defineProps({
  cartItem: {
    type: Object
  }
});
const { cartItem } = props;

const emits = defineEmits(['update', 'delete']);
const handelChange = value => {
  console.log(value);
  emits('update', {
    count: value,
    _id: cartItem._id
  });
};
const CartStore = useCart();
const handleConfirm = async id => {
  const res = await CartStore.fetchDeleteOne(id);
  if (res) {
    ElMessage({
      message: '移除购物车成功~',
      type: 'success'
    });
    emitter.emit('flushCart');
    emits('delete');
  } else {
    ElMessage({
      message: '移除购物车失败，请检查网络',
      type: 'error'
    });
  }
};
</script>

<style lang="less" scoped>
.name {
  margin-left: 15px;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
}

.subInfo {
  margin-left: 15px;
  color: #666;
  font-size: 14px;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
}

.title {
  width: 200px;
  font-size: 14px;
  padding-left: 30px;
}
.cart {
  width: 1240px;
  background: #fff;
  color: #666;
  margin: 0 auto;
  table {
    border-spacing: 0;
    border-collapse: collapse;
    line-height: 24px;

    th,
    td {
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        text-align: left;
        padding-left: 30px;
        color: #999;
      }
    }

    th {
      font-size: 16px;
      font-weight: normal;
      line-height: 50px;
    }
  }
}

.cart-none {
  text-align: center;
  padding: 120px 0;
  background: #fff;

  p {
    color: #999;
    padding: 20px 0;
  }
}

.tc {
  text-align: center;
  font-size: 14px;

  a {
    font-size: 14px;
    color: #27ba9b;
  }

  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}

.red {
  color: #cf4444;
}

.green {
  color: #27ba9b;
}

.f16 {
  font-size: 16px !important;
}

.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  > div {
    width: 280px;
    font-size: 16px !important;
    padding-left: 10px;

    .attr {
      font-size: 14px !important;
      color: #999;
    }
  }
}
</style>
