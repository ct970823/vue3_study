<template>
  <pull-refresh
    class="van-pull-refresh"
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div class="orderBox">
      <div
        class="orderList"
        v-for="(item, index) in state.orderList"
        :key="index"
      >
        <div class="orderListTop">
          <Image width="80" height="80" radius="6" :src="item.picPath" />
          <!-- <img
            :src="item.picPath ? item.picPath : placeholderImg"
            @error="(e) => imgError(e, index)"
          /> -->
          <div class="orderDetail">
            <!-- 1->待付款；2->待发货；3->已发货；4->已完成；5->已关闭 -->
            <div class="orderStatus">
              <div>
                {{
                  item.status == 1
                    ? item.timestamp <= 0
                      ? "已取消"
                      : "待支付"
                    : item.status == 2
                    ? "商家备货中"
                    : item.status == 3
                    ? "配送中"
                    : item.status == 4
                    ? "已完成"
                    : item.status == 5
                    ? "已取消"
                    : "-"
                }}
              </div>
            </div>
            <count-down
              :timestamp="item.timestamp"
              boxStyle="margin-bottom: 8px;"
              v-if="item.status == 1 && item.timestamp > 0"
              @end="end"
            ></count-down>
            <div class="orderInfo">
              <div class="orderInfoTitle">订单号：</div>
              <div class="orderNUm">
                {{ item.orderSn ? item.orderSn : "-" }}
              </div>
            </div>
            <div
              class="orderInfo"
              v-if="!(item.status == 1 || item.status == 2 || item.status == 5)"
            >
              <div class="orderInfoTitle">运单号：</div>
              <div class="orderLogistics">
                {{
                  item.status == 3
                    ? item.expressSn
                      ? item.expressSn
                      : "待揽件"
                    : item.expressSn
                    ? item.expressSn
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="orderBottom">
          <a
            :href="'tel:' + item.sellerLinkPhone"
            v-if="item.status != 1"
            :data-phone="item.sellerLinkPhone"
            ><img src="../../../assets/img/shop/phone.png" />商家
          </a>
          <a
            :href="'tel:' + item.driverPhone"
            v-if="item.status != 1 && item.driverPhone"
            ><img src="../../../assets/img/shop/phone.png" />小哥
          </a>
          <div
            class="addressBtn"
            v-if="item.status != 1"
            @click="seeAddress(item.id)"
          >
            可视化配送
          </div>
          <div
            class="payBtn"
            v-if="item.status == 1 && item.timestamp > 0"
            @click="pay(item.businessSn, item.timestamp, item.id)"
          >
            立即支付
          </div>
        </div>
      </div>
    </div>
  </pull-refresh>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { PullRefresh, Loading, Image, Icon, Skeleton } from "vant";
import axios from "axios";
export default defineComponent({
  components: {
    PullRefresh,
    Loading,
    Image,
    Icon,
    Skeleton,
  },
  mounted() {
    console.log(333333333);
  },
  setup() {
    const isLoading = ref(false);
    const state = reactive({
      orderList: [],
    });
    const pageNum = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const loadingMoreStatus = ref(false);
    const appId = "wxad17f400ed2b7292";
    const appSecret = "2bbecc9eedc9952f0ea1b7f54dcaa380";
    const onRefresh = () => {
      console.log(11111111);
      // isLoading.value = true;
      pageNum.value = 1;
      getOrderList();
      isLoading.value = false;
    };
    const getOrderList = (flag = false) => {
      console.log(11111111111);

      const openId = "oYUz-joZfdhx78pkixS8KGYwdVrY";
      axios
        .post("/api/order/mallBuyerOrder/list", {
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          buyerOpenId: openId,
        })
        .then((res) => {
          console.log(res);
          // if (res.content.pageInfo.total == 0) {
          //   this.$toast('期待您下单','center')
          // }
          res.data.content.data.forEach((item, index) => {
            console.log(1);

            item.isShow = !flag && index == 0;
            // if (item.status == 1) {
            const createTime = item.createTime;
            const nowTime = new Date().getTime() / 1000;
            item.timestamp = createTime + 900 - nowTime;
            // }
          });

          let orderListItem = [];
          orderListItem = flag
            ? [...state.orderList, ...res.data.content.data]
            : res.data.content.data;

          state.orderList = orderListItem;
          console.log(state.orderList);
          total.value = res.data.content.pageInfo.total;
          if (state.orderList.length >= total) {
            loadingMoreStatus.value = false;
          }
        })
        .catch((err) => {
          // if(this.isRefresh){
          //   this.$nextTick(()=>{
          //     this.$refs.pullRefresh.moveState = 0
          //   })
          // }
        })
        .finally(() => {});
    };
    const debounce = (fn, delay = 500) => {
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // console.log(this, arguments);
          fn.apply(this, arguments);
          timer = null;
        }, delay);
      };
    };
    onMounted(() => {
      console.log("321321");
      getOrderList();

      // 上拉触底加载更多 使用防抖，防止多次加载
      window.onscroll = debounce(() => {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        const windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        const scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        // console.log(scrollTop,windowHeight,scrollHeight)
        if (scrollTop + windowHeight >= scrollHeight - 30) {
          //到了这个就可以进行业务逻辑加载后台数据了
          // _this.footerText = '我是有底线的';
          if (total.value > state.orderList.length) {
            pageNum.value += 1;
            getOrderList(true);
          }
        }
      }, 200);
    });
    return {
      isLoading,
      onRefresh,
      pageNum,
      pageSize,
      total,
      getOrderList,
      loadingMoreStatus,
      state,
    };
  },
});
</script>

<style scoped>
/* .van-pull-refresh {
  position: relative;
  height: 100vh;
  overflow: auto;
} */
/* 订单列表 */
.orderBox {
  padding: 15px;
}
.orderTitle {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  border-radius: 6px;
  color: #ffffff;
}

.orderList {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 15px;
}

.openList {
  height: 150px;
}

.cancelOpenList {
  height: 110px;
}

.closeList {
  height: 52px;
}

.orderBox > .orderList:last-child {
  margin-bottom: 0;
}

.orderList > .orderListTop {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.orderList > .orderListTop > img {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  flex: none;
  transition: all 0.3s ease-in;
}

.closeList > .orderListTop > img {
  width: 30px !important;
  height: 30px !important;
}

.orderList > .orderListTop > .orderDetail {
  margin-left: 16px;
  overflow: hidden;
}

.orderList > .orderListTop > .orderDetail > .orderStatus {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 14px;
  transition: all 0.3s ease-in;
  text-align: left;
}

.closeList > .orderListTop > .orderDetail > .orderStatus {
  margin-top: 5px;
}

.orderList > .orderListTop > .orderDetail > .orderInfoTitle > .orderNum {
  font-size: 11px;
  margin-top: 14px;
}

.orderList > .orderListTop > .orderDetail > .orderInfo {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  color: #757575;
  margin-bottom: 4px;
}

.orderList > .orderListTop > .orderDetail > .orderInfo > .orderInfoTitle {
  flex: none;
}

.orderList > .orderListTop > .orderDetail > .orderInfo > .orderNUm {
  word-break: break-all;
}

.orderList > .orderListTop > .orderDetail > .orderInfo > .orderLogistics {
  word-break: break-all;
}

.orderList > .orderBottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.orderList > .orderBottom > a,
.orderList > .orderBottom > div {
  width: 80px;
  height: 24px;
  border: 1px solid rgba(220, 232, 255, 1);
  color: rgba(69, 129, 255, 100);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 15px;
}

.orderList > .orderBottom > a > img {
  width: 11px;
  height: 14px;
  margin-right: 4px;
}

.orderList > .orderBottom > .addressBtn {
  width: 90px;
  background-color: rgba(69, 129, 255, 1);
  color: #ffffff;
}
</style>