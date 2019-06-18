<template>
  <div>
    <Card>
      <p slot="title">影厅：{{schedule.hallId}}</p>
      <table v-for="seatRow in seatRowList" :key="seatRow.rowNum" style="margin: 0 auto">
        <tr>
          <th v-for="seat in seatRow.seatRow" :key="seat.seatNum">
            <img :src="seatState(seat)" @click="chooseSeat(seat)">
          </th>
        </tr>
      </table>
    </Card>
    <Card>
      <p>目前已经选了{{seatChosen.length}}</p>
      <p v-for="seat in seatChosen" :key="seat.row">{{seat.row}}排 {{seat.col}}列</p>
      <i-button v-bind:disabled="!haveChosen()">下单</i-button>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
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
        {
          rowNum: 0,
          seatRow: [
            {
              row: 0,
              col: 0,
              avaliable: true,
              chosen: false
            },
            {
              row: 0,
              col: 1,
              avaliable: true,
              chosen: false
            },
            {
              row: 0,
              col: 2,
              avaliable: true,
              chosen: false
            },
            {
              row: 1,
              col: 4,
              seatNum: 3,
              avaliable: true,
              chosen: false
            }
          ]
        },
        {
          rowNum: 1,
          seatRow: [
            {
              row: 1,
              col: 0,
              avaliable: false,
              chosen: false
            },
            {
              row: 1,
              col: 1,
              seatNum: 1,
              avaliable: true,
              chosen: false
            },
            {
              row: 1,
              col: 2,
              seatNum: 2,
              avaliable: true,
              chosen: false
            },
            {
              row: 1,
              col: 3,
              seatNum: 3,
              avaliable: true,
              chosen: false
            }
          ]
        },
        {
          rowNum: 2,
          seatRow: [
            {
              seatNum: 0,
              avaliable: true
            },
            {
              seatNum: 1,
              avaliable: true
            },
            {
              seatNum: 2,
              avaliable: true
            },
            {
              seatNum: 3,
              avaliable: true
            }
          ]
        },
        {
          rowNum: 3,
          seatRow: [
            {
              seatNum: 0,
              avaliable: true
            },
            {
              seatNum: 1,
              avaliable: true
            },
            {
              seatNum: 2,
              avaliable: true
            },
            {
              seatNum: 3,
              avaliable: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    seatState(seat) {
      if (seat.avaliable) {
        if (seat.chosen) {
          return "../../static/seatChosen.png";
        } else {
          return "../../static/seatChoose.png";
        }
      } else {
        return "../../static/seatLock.png";
      }
    },
    chooseSeat(seat) {
      if (seat.avaliable) {
        if (!seat.chosen) {
          this.seatChosen.push(seat);
        } else {
          for (var i = 0; i < this.seatChosen.length; i++) {
            if (
              this.seatChosen[i].Row == seat.Row &&
              this.seatChosen[i].col == seat.col
            ) {
              this.seatChosen.splice(i, 1);
            }
          }
        }
        seat.chosen = !seat.chosen;
      }
      console.log("cnm");
    },
    haveChosen() {
      if (this.seatChosen.length != 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    console.log(this.schedule);
    //this.schedule = JSON.parse(localStorage.getItem('scheduleChosen'));
    console.log(this.schedule);
  }
};
</script>

