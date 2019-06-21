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
            <Button
              v-show="order.status=='Refund'"
              disabled
              type="error"
              @click="onCancelOrder(order.id)"
            >已退款</Button>
          </i-col>
        </Row>
      </div>
      <div style="margin: 15px;">
        <div>支付方式： {{order.payment=='BankCard'?'银行卡':'会员卡'}}</div>
        <div
          style="margin-bottom: 20px;"
        >订单时间： {{order.orderTime | dateformat('YYYY年MM月DD日 HH时mm分')}}</div>
        <div v-for="item in order.data">{{item}}</div>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from "moment";
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
        this.$Message.success("支付成功!");
        let order = this.orderList.find(o => {
          return o.id == orderId;
        });
        if (order) order.status = "Complete";
      });
    },
    onCancelOrder(orderId) {
      userApi.CancelOrder(orderId).then(res => {
        this.$Message.success("订单取消成功!");
        let order = this.orderList.find(o => {
          return o.id == orderId;
        });
        if (order) order.status = "Fail";
      });
    },
    onRefundOrder(orderId) {
      userApi.QuitOrder(orderId).then(res => {
        this.$Message.success("退款成功!");
        let order = this.orderList.find(o => {
          return o.id == orderId;
        });
        if (order) order.status = "Refund";
      });
    }
  },
  created() {
    let _this = this;
    // 获取订单信息
    userApi.GetOrderByUserId(localStorage.getItem("userId")).then(orderRes => {
      console.log("所有订单信息", orderRes.data);
      orderRes.data.sort((a, b) => {
        return a.orderTime < b.orderTime ? 1 : -1;
      });
      orderRes.data.forEach(o => {
        switch (o.type) {
          case "Ticket":
            o.title = "电影票购买";
            let ticketIdList = o.data.split(" ");
            o.data = ticketIdList;
            break;
          case "Charge":
            o.title = "会员卡充值";
            let info = o.data.split(" ");
            info[0] = "当前会员卡等级： " + info[0];
            info[1] = "充值金额： " + info[1];
            o.data = [info[1]];
            break;
        }
      });
      // 获取影票
      userApi.GetTicketList(localStorage.getItem("userId")).then(ticketRes => {
        console.log("所有观影票信息", ticketRes.data);
        userApi.GetSuperScheduleList().then(scheduleRes => {
          console.log("排片信息", scheduleRes.data);
          orderRes.data.forEach(o => {
            if (o.type != "Ticket") return;
            let tIdList = o.data;
            let sId = [];
            let sch = null;
            for (let i = 0; i < tIdList.length; i++) {
              let tId = tIdList[i];
              let ticket = ticketRes.data.find(t => {
                return t.ticketId == tId;
              });
              if (ticket) {
                sch = scheduleRes.data.find(s => {
                  return s.schedule.id == ticket.scheduleId;
                });
                if (sch)
                  tIdList[i] =
                    "第" + ticket.row + "行，第" + ticket.column + "列";
              }
            }
            if (sch)
              tIdList.unshift(
                "影厅：" + sch.hallName,
                "开始时间： " +
                  moment(sch.schedule.startTime).format(
                    "YYYY年MM月DD日 HH时mm分"
                  ),
                "结束时间： " +
                  moment(sch.schedule.endTime).format(
                    "YYYY年MM月DD日 HH时mm分"
                  ),
                "-",
                "座位列表： "
              );
          });
          _this.orderList = orderRes.data;
        });
      });
    });
  }
};
</script>

<style scoped>
</style>
