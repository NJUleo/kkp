<template>
  <div style="margin: 40px 40px 30px 40px;">
    <Card v-for="order in orderList" :key="order.id" style="text-align: left; margin-bottom: 30px;">
      <div slot="title">
        <Row type="flex" style="align-items: center;">
          <i-col>
            <div>
              <strong>{{order.title}}</strong>
            </div>
          </i-col>
          <i-col style="margin-left: auto">
            <Button v-show="order.status=='unpaid'" type="info" @click="onPayOrder(order.id)">支付订单</Button>
            <Button v-show="order.status=='paid'" type="warning" @click="onRefundOrder(order.id)">申请退款</Button>
            <Button v-show="order.status=='unpaid'" type="error" @click="onCancelOrder(order.id)">取消订单</Button>
          </i-col>
        </Row>
      </div>
      <div style="margin: 15px;">
        <div v-for="item in order.data">{{item}}</div>
      </div>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi"
export default {
  name: "MyOrder",
  data() {
    return {
      orderList: [
        {
          id: 1,
          title: "buy ticket",
          status: "unpaid",
          data: [
            "hall: 5th hall",
            "begin time: 2019.6.10 15:00",
            "end time: 2019.6.10 16:00"
          ]
        },
        {
          id: 2,
          title: "会员卡",
          status: "paid",
          data: [
            "充值金额: 100元"
          ]
        }
      ]
    };
  },
  methods: {
    onPayOrder(orderId) {},
    onCancelOrder(orderId) {},
    onRefundOrder(orderId) {}
  },
  created() {
    // userApi.GetOrderByUserId;
  }
};
</script>

<style scoped>
</style>
