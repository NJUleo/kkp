<template>
  <div>
    <div v-for="schedule in scheduleList" :key="schedule.id">
      <i-col span="12">
        <Card
          :bordered="false"
          style="height: 75px; text-align: center"
          @click="buyTicketById(schedule.id)"
        >
          <i-button style="width: 100%; height: 100%" @click="buyTicketById(schedule.id)">
            <i-col span="18">
              <p>{{schedule.startTime}}</p>
              <p>影厅：{{schedule.hallId}}</p>
            </i-col>
            <i-col span="6">
              <p>￥{{schedule.price}}</p>
            </i-col>
          </i-button>
        </Card>
      </i-col>
    </div>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
export default {
  name: "CheckSchedule",
  data() {
    return {
      scheduleList: [
        {
          id: "1",
          hallId: "2",
          movieId: "3",
          startTime: "2019/1/1",
          endTime: "2019/1/2",
          price: "100"
        }
      ]
    };
  },
  methods: {
    buyTicketById(scheduleId) {
      console.log(scheduleId);
      for (var schedule in this.scheduleList) {
        if (schedule.id == scheduleId) {
          console.log(this.scheduleListp[i]);
          localStorage.setItem("scheduleChosen", JSON.stringify(schedule));
        }
      }
    }
  },
  created() {}
};
</script>

