<template>
  <Header />
  <div class="xtx-pay-checkout-page">
    <div class="container-pay">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.phoneNumber }}</li>
                <li><span>收货地址：</span>{{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="handleAddress">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in paymentList" :key="i._id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="MAINPORT + i.product.cover" alt="" />
                    <div class="right">
                      <div class="title">{{ i.product.title }}</div>
                      <div class="subInfo">
                        <template v-for="item in i.size">
                          <div class="type">
                            {{ item.elName }}: {{ item.elValue.elName }} - 库存：{{
                              item.elValue.elCount
                            }}
                          </div>
                        </template>
                        <div class="brand">品牌: {{ i.productinfo.productBrand }}</div>
                      </div>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ (i.price * i.count).toFixed(2) }}</td>
                <td>&yen;{{ (i.price * i.count).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a
            @click="handleTime(0)"
            :class="{ myBtn: true, active: deliverTime === 0 }"
            href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a
            @click="handleTime(1)"
            :class="{ myBtn: true, active: deliverTime === 1 }"
            href="javascript:;"
            >工作日送货：周一至周五</a
          >
          <a
            @click="handleTime(2)"
            :class="{ myBtn: true, active: deliverTime === 2 }"
            href="javascript:;"
            >双休日、假日送货：周六至周日</a
          >
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a
            @click="handleWay(0)"
            :class="{ myBtn: true, active: payWay === 0 }"
            href="javascript:;"
            >在线支付</a
          >
          <a
            @click="handleWay(1)"
            :class="{ myBtn: true, active: payWay === 1 }"
            href="javascript:;"
            >货到付款</a
          >
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ totalCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥10.00</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ (Number(totalPrice) + 10).toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div
        class="text item"
        :class="{ active: activeAddress._id === item._id }"
        @click="switchAddress(item)"
        v-for="item in addressCollect"
        :key="item._id"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.phoneNumber }}</li>
          <li><span>收货地址：</span>{{ item.address }}</li>
        </ul>
        <el-icon @click="handleDel(item)" class="icon"><Close /></el-icon>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <el-dialog v-model="showAddDialog" title="新增收货地址" width="30%" center>
    <AddressAdd @close="handleClose" />
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import useOrder from '@/stores/modules/useOrder';
import { Close } from '@element-plus/icons-vue';
import useAddress from '@/stores/modules/useAddress';
import AddressAdd from './CheckOutCpns/AddressAdd.vue';
import Header from '../../views/Layout/Header.vue';
import { MAINPORT } from '../../assets/js/publicData.js';
// import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import useCart from '../../stores/modules/useCart.js';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import useGest from '@/stores/modules/useGest';

const router = useRouter();
const count1 = ref(0);
const price1 = ref(0);
// 获取结算信息
const checkInfo = ref({}); // 订单对象
const curAddress = ref({}); // 默认地址
const paymentList = ref([]);
const GestStore = useGest();
const addressCollect = ref([]);
const getCheckInfo = async () => {
  const CartStore = useCart();
  const AddressStore = useAddress();
  const { checkoutList } = storeToRefs(CartStore);
  const { gestData } = storeToRefs(GestStore);
  const res = await AddressStore.fetchAddress(gestData.value._id);
  if (res) {
    const { positionsData } = storeToRefs(AddressStore);
    addressCollect.value = positionsData.value;
    curAddress.value = positionsData.value[0];
  }
  paymentList.value = checkoutList.value;
};
const positionInfo = ref();

onMounted(() => getCheckInfo());
const deliverTime = ref(0);
const payWay = ref(0);
// 控制弹框打开
const showDialog = ref(false);
const showAddDialog = ref(false);

const totalCount = computed(() => {
  let count = 0;
  paymentList.value.forEach(item => {
    count += item.count;
  });
  count1.value = count;
  return count;
});

const totalPrice = computed(() => {
  let price = 0;
  paymentList.value.forEach(item => {
    price += item.count * item.price;
  });
  price1.value = price;
  return price.toFixed(2);
});

// 切换地址
const activeAddress = ref({});
const switchAddress = item => {
  activeAddress.value = item;
};

const handleAddress = () => {
  showAddDialog.value = !showAddDialog.value;
};

const handleClose = value => {
  positionInfo.value = value;
};

const confirm = () => {
  showDialog.value = false;
  curAddress.value = activeAddress.value;
};

const AddressStore = useAddress();
const confirmAdd = async () => {
  const res = await AddressStore.fetchAddAddress(positionInfo.value);
  if (res) {
    showAddDialog.value = false;
    ElMessage({ message: '新地址添加成功', type: 'success' });
    getCheckInfo();
  }
};

const handleDel = async item => {
  const res = await AddressStore.fetchDelAddress(item._id);
  const { gestData } = storeToRefs(GestStore);
  if (res) {
    const by = await AddressStore.fetchAddress(gestData.value._id);
    if (by) {
      const { positionsData } = storeToRefs(AddressStore);
      addressCollect.value = positionsData.value;
    }
    ElMessage({ message: '地址删除成功', type: 'success' });
  }
};
// 创建订单
const { gestData } = storeToRefs(GestStore);
const OrderStore = useOrder();

const handleTime = index => {
  deliverTime.value = index;
};

const handleWay = index => {
  payWay.value = index;
};

const createOrder = async () => {
  getCheckInfo();
  const { receiver, phoneNumber, address } = curAddress.value;

  const res = await OrderStore.fetchAddOrder({
    receiver,
    phoneNumber,
    address,
    products: paymentList.value,
    gestId: gestData.value._id,
    deliverTime: deliverTime.value,
    payWay: payWay.value,
    totalPrice: (price1.value + 10).toFixed(2),
    count: count1.value
  });
  if (res) {
    const { orderId } = storeToRefs(OrderStore);
    // console.log(orderId.value);
    router.push({
      path: '/pay',
      query: {
        id: orderId.value
      }
    });
  }
};
</script>

<style scoped lang="less">
.xtx-pay-checkout-page {
  background-color: #f5f5f5;
  font-size: 14px;
  margin-top: 130px;
  padding-top: 20px;
  .wrapper {
    margin: 0 auto;
    width: 1200px;
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: #27ba9b;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;

    img {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      .title {
        width: 350px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis !important;
      }
      .subInfo {
        color: #999;
        text-overflow: ellipsis !important;
      }
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.myBtn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: #27ba9b;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: #cf4444;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    position: relative;
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;
    .icon {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    &.active,
    &:hover {
      border-color: #27ba9b;
      background: lighten(#27ba9b, 50%);
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
