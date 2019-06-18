<template>
  <div>
    <Card>
      <p slot="title">影厅：{{schedule.hallId}}</p>
      <table v-for="seatRow in seatRowList" :key="seatRow.rowNum" style="margin: 0 auto">
        <tr>
          <th v-for="seat in seatRow.seatRow" :key="seat.col">
            <img :src="seatState(seat)" @click="chooseSeat(seat)">
          </th>
        </tr>
      </table>
    </Card>
    <Card>
      <p>目前已经选了{{seatChosen.length}}</p>
      <p v-for="seat in seatChosen" :key="seat.row * 100 + seat.col">{{seat.row}}排 {{seat.col}}列</p>
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
    this.schedule = JSON.parse(localStorage.getItem("scheduleDetail"));
    let seats = this.schedule.seatList;
    console.log(seats);
    let seatRows = [];
    seats.forEach(s => {
      if (seatRows[s.row] == null) seatRows[s.row] = [];
      seatRows[s.row].append(s);
    });
  }
};
</script>

