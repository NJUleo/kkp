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
            <th v-for="seat in seatRow" :key="seat.col">
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
              :key="seat.row * 100 + seat.col"
            >{{seat.row}}排 {{seat.col}}列</p>
            <i-button
              style="margin-top: 10px;"
              v-bind:disabled="seatChosen.length==0"
              @click="onOrder"
            >锁座并下单</i-button>
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
      colNum: 2,
      seatRowList: [
        [
          {
            row: 0,
            col: 0,
            avaliable: true,
            chosen: false
          }
        ],
        [
          {
            row: 1,
            col: 0,
            avaliable: false,
            chosen: false
          }
        ]
      ]
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
      if (seat.avaliable) {
        console.log(this.seatChosen);
        if (!seat.chosen) {
          this.seatChosen.push(seat);
        } else {
          this.seatChosen.splice(
            this.seatChosen.findIndex(s => {
              return s.row == seat.row && s.col == seat.col;
            }),
            1
          );
        }
        seat.chosen = !seat.chosen;
      }
      seat.imgSrc = this.seatState(seat);
    },
    onOrder() {}
  },
  created() {
    this.schedule = JSON.parse(localStorage.getItem("scheduleDetail"));
    let seats = this.schedule.seatList;
    let seatRows = [];
    seats.forEach(s => {
      s.avaliable = false;
      s.imgSrc = this.seatState(s);
      s.chosen = false;
      s.col = s.column;
      if (seatRows[s.row] == null) seatRows[s.row] = [];
      seatRows[s.row].push(s);
    });
    userApi
      .GetSeatListByScheduleId({ scheduleId: this.schedule.id })
      .then(res => {
        this.seatRowList = seatRows;
        res.data.forEach(vc => {
          let s = this.seatRowList[vc.row][vc.column];
          s.avaliable = vc.seatAvailable;
          s.imgSrc = this.seatState(s);
        });
      });
  }
};
</script>

