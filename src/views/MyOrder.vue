<template>
  <div style="margin: 50px auto; width: 650px;">
    <Card v-for="order in orderList" :key="order.id" style="text-align: left; margin-bottom: 30px;">
      <div slot="title">
        <Row type="flex" style="align-items: center;">
          <i-col>
            <div>
              <strong>{{order.title}}</strong>
            </div>
          </i-col>
          <i-col style="margin-left: auto">
            <Button v-show="order.status=='Unpaid'" type="info" @click="onPayOrder(order.id)">支付订单</Button>
            <Button
              v-show="order.status=='Complete'"
              type="warning"
              @click="onRefundOrder(order.id)"
            >点击退款</Button>
            <Button
              v-show="order.status=='Unpaid'"
              type="error"
              @click="onCancelOrder(order.id)"
            >取消订单</Button>
            <Button
              v-show="order.status=='Fail'"
              disabled
              type="error"
              @click="onCancelOrder(order.id)"
            >订单已取消</Button>
          </i-col>
        </Row>
      </div>
      <div style="margin: 15px;">
        <div style="margin-bottom: 20px;">订单时间： {{order.orderTime | dateformat('YYYY年MM月DD日 HH时mm分')}}</div>
        <div v-for="item in order.data">{{item}}</div>
      </div>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
export default {
  name: "MyOrder",
  data() {
    return {
      orderList: [
        {
          id: 1,
          title: "buy ticket",
          status: "Unpaid",
          data: [
            "hall: 5th hall",
            "begin time: 2019.6.10 15:00",
            "end time: 2019.6.10 16:00"
          ]
        },
        {
          id: 2,
          title: "会员卡",
          status: "Complete",
          data: ["充值金额: 100元"]
        }
      ]
    };
  },
  methods: {
    onPayOrder(orderId) {
      userApi.PayOrder(orderId).then(res => {
        let order = this.orderList.find(o => {
          return o.id == orderId;
        });
        if (order) order.status = "Complete";
      });
    },
    onCancelOrder(orderId) {
      userApi.CancelOrder(orderId).then(res => {
        let order = this.orderList.find(o => {
          return o.id == orderId;
        });
        if (order) order.status = "Fail";
      });
    },
    onRefundOrder(orderId) {
      // TODO: 
    }
  },
  created() {
    userApi.GetOrderByUserId(localStorage.getItem("userId")).then(res => {
      console.log(res.data);
      res.data.sort((a, b) => {
        return a.orderTime < b.orderTime ? 1 : -1;
      });
      res.data.forEach(o => {
        switch (o.type) {
          case "Ticket":
            o.title = "电影票购买";
            let ticketIdList = o.data.split(" ");
            o.data = ticketIdList;
            break;
          case "Charge":
            o.title = "会员卡充值";
            o.data = [o.data];
            break;
        }
      });
      this.orderList = res.data;
    });
  }
};
</script>

<style scoped>
</style>
