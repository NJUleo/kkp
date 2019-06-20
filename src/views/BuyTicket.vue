<template>
  <div>
    <Row type="flex" style="align-items: flex-start; margin: 30px 20px 10px 20px;">
      <i-col span="16">
        <Card style="margin: 10px 30px 20px 30px;">
          <p slot="title">{{schedule.hallName}}</p>
          <Row
            type="flex"
            style="margin: 20px 5px 15px 5px;"
          >开始时间：{{schedule.startTime | dateformat('YYYY年MM月DD日 HH时mm分')}}</Row>
          <Row
            type="flex"
            style="margin: 20px 5px 15px 5px;"
          >结束时间 {{schedule.endTime | dateformat('YYYY年MM月DD日 HH时mm分')}}</Row>
        </Card>
        <table v-for="seatRow in seatRowList" style="margin: 0 auto">
          <tr>
            <th v-for="seat in seatRow" :key="seat.column">
              <img :src="seat.imgSrc" @click="chooseSeat(seat)">
            </th>
          </tr>
        </table>
      </i-col>
      <i-col span="7">
        <Card style="margin: 10px;">
          <p slot="title">目前已经选了 {{seatChosen.length}} 个座位</p>
          <div style="display: flex; flex-direction: column;">
            <p style="text-align: left; margin-bottom: 10px;">座位列表:</p>
            <p
              style="text-align: center;"
              v-for="seat in seatChosen"
              :key="seat.row * 100 + seat.column"
            >{{seat.row+1}}排 {{seat.column+1}}座</p>
            <p
              v-show="seatChosen.length!=0 && orderState=='noorder'"
              style="margin-top: 20px; color: grey;"
            >下单后自动锁座</p>
            <i-button
              style="margin-top: 10px;"
              v-bind:disabled="seatChosen.length==0"
              @click="onOrder('BankCard')"
              v-show="orderState=='noorder'"
              type="info"
            >银行卡下单</i-button>
            <i-button
              style="margin-top: 10px;"
              v-bind:disabled="seatChosen.length==0"
              @click="onOrder('VipCard')"
              v-show="orderState=='noorder' && hasVipCard==true"
              type="warning"
            >会员卡下单</i-button>
            <p
              v-show="orderState=='locked'"
              style="margin-top: 30px;"
            >您选择了 {{payType=="BankCard"?'银行卡':'会员卡'}} 支付</p>
            <p v-show="orderState=='locked'">您需要支付 {{moneyToPay}} 元</p>
            <i-button
              style="margin-top: 10px;"
              @click="onPay"
              v-show="orderState=='locked'"
              type="info"
            >支付</i-button>
            <i-button
              style="margin-top: 10px;"
              @click="onCancelOrder"
              v-show="orderState=='locked'"
              type="error"
            >取消订单</i-button>
            <i-button
              style="margin-top: 10px;"
              disabled
              v-show="orderState=='success'"
              type="success"
            >支付成功</i-button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
import seatChoose from "../../static/seatChoose.png";
import seatChosen from "../../static/seatChosen.png";
import seatLock from "../../static/seatLock.png";
export default {
  name: "BuyTicket",
  data() {
    return {
      seatChosen: [],
      schedule: {
        id: "4",
        hallId: "9",
        movieId: "1",
        startTime: "2019/1/2",
        endTime: "2019/1/3",
        price: "50"
      },
      seatRowList: [],
      hasVipCard: false,
      orderState: "noorder",
      payType: "VipCard",
      moneyToPay: 200
    };
  },
  methods: {
    seatState(seat) {
      if (seat.avaliable) {
        if (seat.chosen) {
          return seatChosen;
        } else {
          return seatChoose;
        }
      } else {
        return seatLock;
      }
    },
    chooseSeat(seat) {
      if (this.orderState != "noorder") return;
      if (seat.avaliable) {
        if (!seat.chosen) {
          this.seatChosen.push(seat);
        } else {
          this.seatChosen.splice(
            this.seatChosen.findIndex(s => {
              return s.row == seat.row && s.column == seat.column;
            }),
            1
          );
        }
        seat.chosen = !seat.chosen;
      }
      seat.imgSrc = this.seatState(seat);
    },
    onOrder(payType) {
      console.log(this.seatChosen);
      userApi
        .BuyTicket({
          scheduleId: this.schedule.id,
          userId: localStorage.getItem("userId"),
          seatList: this.seatChosen,
          payment: payType
        })
        .then(res => {
          this.$Message.success("下单成功！已锁座");
          this.orderId = res.data.id;
          this.payType = res.data.payment;
          this.moneyToPay = res.data.money;
          this.orderState = "locked";
        });
    },
    onPay() {
      userApi.PayOrder(this.orderId).then(res => {
        this.$Message.success("支付成功!");
        this.orderState = "success";
      });
    },
    onCancelOrder() {
      let _this = this;
      userApi.CancelOrder(this.orderId).then(res => {
        this.$Message.success("已取消订单!");
        _this.orderState = "noorder";
      });
    }
  },
  created() {
    this.schedule = JSON.parse(localStorage.getItem("scheduleDetail"));
    let seats = this.schedule.seatList;
    let seatRows = [];
    seats.forEach(s => {
      s.avaliable = false;
      s.imgSrc = this.seatState(s);
      s.chosen = false;
      if (seatRows[s.row] == null) seatRows[s.row] = [];
      seatRows[s.row].push(s);
    });
    seatRows.forEach(item => {
      item.sort((a, b) => {
        return a.column - b.column;
      });
    });
    userApi
      .GetSeatListByScheduleId({ scheduleId: this.schedule.id })
      .then(res => {
        // console.log(res.data);
        this.seatRowList = seatRows;
        res.data.forEach(vc => {
          let s = this.seatRowList[vc.row][vc.column];
          s.avaliable = vc.seatAvailable;
          s.imgSrc = this.seatState(s);
        });
      });
    userApi.GetUserVipCard(localStorage.getItem("userId")).then(res => {
      // 确认是否有会员卡
      console.log(res);
      if (res.data.data != null) this.hasVipCard = true;
    });
  }
};
</script>

