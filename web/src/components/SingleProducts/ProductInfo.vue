<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <ImageView :image-list="props.goodsType.slideCovers" />
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>129+</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>0+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>2+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ props.goodsInfo.productBrand }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name">{{ props.goods.title }}</p>
              <p class="g-price">
                <span v-if="price === 0"> {{ props.goods.price }} </span>
                <span v-else> {{ price }} </span>
                <span> {{ props.goods.price }} </span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <div class="size">
                <template v-for="(item, index1) in props.goodsType.size">
                  <div class="sku-container">
                    <div class="title">{{ item.elName }}</div>
                    <div class="content">
                      <template v-for="(idw, index2) in item.children">
                        <div
                          @click="handleSku(index1, index2)"
                          :class="{ item: true, active: activeArr[index1].value === index2 }"
                        >
                          {{ idw.elName }}
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
              <!-- 库存组件 -->
              <div class="store">
                <div class="title">库存</div>
                <div v-if="store === 0" class="carriage">
                  {{ props.goodsInfo.totalStore >= 500 ? '有货' : props.goodsInfo.totalStore }}
                </div>
                <div v-else class="carriage">{{ store }}</div>
              </div>
              <!-- 数据组件 -->
              <el-input-number :min="1" v-model="productMsg.count" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <div class="detail">
                    <div class="age">适用人群：{{ props.goodsInfo.productAge }}</div>
                    <div class="brand">公司品牌：{{ props.goodsInfo.productBrand }}</div>
                    <div class="mteri">商品原料：{{ props.goodsInfo.productMteri }}</div>
                    <div class="type">商品类型：{{ props.goodsInfo.productType }}</div>
                  </div>
                  <div v-html="props.goods.content"></div>
                  <!-- 属性 -->
                  <!-- <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt"> {{ item.name }} </span>
                      <span class="dd"> {{ item.value }} </span>
                    </li>
                  </ul> -->
                  <!-- 图片 -->
                  <!-- <img v-for="img in goods.details.pictures" :src="img" :key="img" alt="" /> -->
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24小时 -->
              <DetailHot @update="handleUpdate" :hot-type="1" />
              <!-- 周 -->
              <DetailHot :hot-type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DetailHot from '@/components/SingleProducts/DetailHot.vue';
import ImageView from '../../components/ImageView/ImageView.vue';
const activeArr = [];
const productMsg = reactive({
  count: 0,
  productId: 0,
  price: 0,
  size: [],
  store: 0
});
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({})
  },
  goodsInfo: {
    type: Object,
    default: () => ({})
  },
  goodsType: {
    type: Object,
    default: () => ({})
  }
});

watch(
  () => props.goodsType.size,
  (newVal, oldVal) => {
    newVal.forEach(element => {
      activeArr.push(ref(0));
    });
  }
);

watch(
  () => props.goodsType,
  newVal => {
    productMsg.productId = newVal.productId;
    productMsg.store = newVal.size[0].children[0].elCount;
    productMsg.price = newVal.size[0].children[0].elPrice;
    // productMsg.size = []
    newVal.size.forEach((item, index) => {
      productMsg.size[index] = {
        elName: newVal.size[index].elName,
        elValue: item.children[0]
      };
    });
    productMsg.count = 1;
  }
);

const price = computed(() => {
  return productMsg.price;
});

const store = computed(() => {
  return productMsg.store >= 100 ? '有货' : productMsg.store;
});

const handleSku = (index1, index2) => {
  activeArr[index1].value = index2;
  productMsg.size[index1] = {
    elName: props.goodsType.size[index1].elName,
    elValue: props.goodsType.size[index1].children[index2]
  };
  productMsg.price = props.goodsType.size[index1].children[index2].elPrice;
  productMsg.store = props.goodsType.size[index1].children[index2].elCount;
};

const emit = defineEmits(['update']);

const handleUpdate = value => {
  emit('update', value);
};

const addCart = () => {
  console.log(productMsg);
};
</script>

<style lang="less" scoped>
.xtx-goods-page {
  .active {
    border: 1px solid #27ba9b;
  }
  .store {
    height: 30px;
    display: flex;
    color: #999;

    .title {
      width: 50px;
      color: #999;
    }
  }
  .size {
    width: 520px;
    .sku-container {
      display: flex;

      .title {
        width: 50px;
        color: #999;
      }
      .content {
        flex: 1;
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          max-width: 200px;
          margin-bottom: 10px;
          margin-right: 10px;
          padding: 10px 10px;
          background-color: #f0f0f0;
          color: #333;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &:hover {
            // border-color: #27ba9b;
            border: 1px solid #27ba9b;
          }
        }
      }
    }
  }
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 510px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: '¥';
        font-size: 14px;
      }

      &:first-child {
        color: #cf4444;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: '•';
              color: #27ba9b;
              margin-right: 2px;
            }
          }

          a {
            color: #27ba9b;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: '';
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: #cf4444;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: #27ba9b;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: #27ba9b;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: #cf4444;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  .detail {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .age,
    .brand,
    .type,
    .mteri {
      width: 430px;
      padding-bottom: 30px;
    }
  }
  padding: 40px;
  :deep(img) {
    width: 860px;
    display: inline-block;
    // height: 230px;
  }
  :deep(p) {
    margin: 0;
    padding: 0;
  }

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.bread-container {
  padding: 25px 0;
}
</style>
