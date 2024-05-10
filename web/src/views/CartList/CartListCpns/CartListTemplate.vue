<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <!-- 全选框 -->
                <el-checkbox v-model="checkBoxVal" @change="i => allCheck(i)" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="(i, index) in loopList" :key="i.id">
              <td>
                <span>{{ isInclude(i, index) }}</span>
                <el-checkbox
                  v-model="isChecked[index]"
                  @change="selected => singleCheck(selected, i, index)"
                />
              </td>
              <CartItem @update="handleUpdate" @delete="handleDelete" :cart-item="i" />
            </tr>
            <tr v-if="loopList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ loopList?.length }} 件商品，已选择 {{ checkedItems?.length }} 件，商品合计：
          <span class="red">¥ {{ totalPrice }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="handleCheck">下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//此页面中loopList为购物车所有商品列表，checkedItems为选中所需付款商品列表
import { useRouter } from 'vue-router';
import CartItem from './CartItem.vue';
import useCart from '../../../stores/modules/useCart';
import useGest from '../../../stores/modules/useGest';
import { storeToRefs } from 'pinia';
const CartStore = useCart();
const { cartList } = storeToRefs(CartStore);
const loopList = ref([]);
const checkedItems = ref([]);
const checkBoxVal = ref(false);
const isChecked = reactive([]);

const initData = async () => {
  const GestStore = useGest();
  const CartStore = useCart();
  const { gestData } = storeToRefs(GestStore);
  const res = await CartStore.fetchCartList(gestData.value._id);
  if (res) {
    const { cartList, allCheckVal } = storeToRefs(CartStore);
    // checkBoxVal.value = allCheckVal.value;
    cartList.value.forEach(item => {
      isChecked.push(ref(false));
    });
    loopList.value = cartList.value;
  }
};

onMounted(() => initData());

const allCheck = async selected => {
  // console.log(selected);
  checkedItems.value = selected ? [...loopList.value] : [];
};

const isInclude = (item, index) => {
  checkedItems.value.includes(item) ? (isChecked[index] = true) : (isChecked[index] = false);
};

// 单选回调
const singleCheck = (selected, i, index) => {
  // console.log(selected, i, index);
  console.log(i);
  if (!selected) {
    checkedItems.value.splice(index, 1);
    isChecked[index] = false;
    if (checkedItems.value.length !== loopList.value.length) {
      checkBoxVal.value = false;
    } else {
      if (loopList.value.every((element, index) => element === checkedItems.value[index])) {
        checkBoxVal.value = true;
      }
    }
  } else {
    checkedItems.value.push(i);
    isChecked[index] = true;
    if (checkedItems.value.length !== loopList.value.length) {
      checkBoxVal.value = false;
    } else {
      if (loopList.value.every((element, index) => element === checkedItems.value[index])) {
        checkBoxVal.value = true;
      }
    }
  }
};

const handleUpdate = value => {
  const { count, _id } = value;
  checkedItems.value.forEach(item => {
    if (item._id === _id) {
      item.count = count;
    }
  });
};

const totalPrice = computed(() => {
  let sum = 0;
  checkedItems.value.forEach(item => {
    sum += item.count * item.price;
  });
  return sum.toFixed(2);
});

const handleDelete = () => {
  initData();
  checkedItems.value = [];
  checkBoxVal.value = false;
};

const router = useRouter();
const handleCheck = () => {
  CartStore.checkoutList = checkedItems.value;
  router.push('/checkout');
};
</script>

<style lang="less" scoped>
.xtx-cart-page {
  padding-top: 20px;
  margin-top: 20px;

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

  .action {
    margin: 0 auto;
    box-sizing: border-box;
    width: 1240px;
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px !important;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px !important;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px !important;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
