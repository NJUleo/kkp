<template>
  <div>
    <Card style="margin-bottom: 20px">
      <p slot="title" style="text-align: left">电影详情</p>
      <div>
        <Row type="flex" style="align-items: center; margin-bottom: 10px">
          <i-col style="margin-left: 20px; margin-right: 10px;">
            <Icon type="ios-film-outline" size="30"></Icon>
          </i-col>
          <i-col>
            <div style="font-size: 20px;">{{movieDetail.name}}</div>
          </i-col>
          <i-col>
            <Tag
              :color="statusColor(movieDetail.status)"
              style="margin-left: 15px;"
            >{{statusParser(movieDetail.status)}}</Tag>
          </i-col>
          <i-col style="margin-left: auto; margin-right: 20px;">
            <i-button type="success" @click="onMovieLike">{{movieDetail.isLike?"已":""}}想看</i-button>
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            <div style="text-align:center; float: center; margin-right: 5px; margin-top: 5px">
              <img style="width: 150px;height: 200px; " :src="movieDetail.posterUrl">
            </div>
          </i-col>
          <i-col span="20">
            <div style=" text-align: justify;margin-top: 5px">
              <p>
                <strong>简介：</strong>
                {{movieDetail.description}}
              </p>
              <p>
                <strong>时长：</strong>
                {{movieDetail.duration}}
              </p>
              <p>
                <strong>上映时间：</strong>
                {{movieDetail.startDate}}
              </p>
              <p>
                <strong>国家/地区：</strong>
                {{movieDetail.country}}
              </p>
              <p>
                <strong>语言：</strong>
                {{movieDetail.language}}
              </p>
              <p>
                <strong>类型：</strong>
                {{movieDetail.movieTypeList.toString().replace(/,/g,'/')}}
              </p>
              <p>
                <strong>导演：</strong>
                {{movieDetail.director}}
              </p>
              <p>
                <strong>主演：</strong>
                {{movieDetail.starringList.toString().replace(/,/g,'/')}}
              </p>
            </div>
          </i-col>
        </Row>
      </div>
    </Card>
    <p style="text-align: left; margin-left: 30px;">场次：</p>
    <Card
      v-for="schedule in scheduleList"
      :key="schedule.id"
      style="margin: 25px; padding-left: 20px;"
    >
      <Row type="flex" style="align-items: center;">
        <i-col>
          <Icon type="md-bookmarks" size="30"/>
        </i-col>
        <i-col style="margin-left: 20px;">{{schedule.hallName}}</i-col>
        <i-col style="margin-left: auto;">
          <i-button
            v-bind:disabled="movieDetail.status==0"
            type="success"
            @click="buyMovieTicket(schedule.id)"
          >购票</i-button>
        </i-col>
      </Row>
      <Row
        type="flex"
        style="margin: 20px 5px 15px 5px;"
      >开始时间：{{schedule.startTime | dateformat('YYYY年MM月DD日 HH时mm分')}}</Row>
      <Row
        type="flex"
        style="margin: 20px 5px 15px 5px;"
      >结束时间 {{schedule.endTime | dateformat('YYYY年MM月DD日 HH时mm分')}}</Row>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi.js";
import axios from "axios";

export default {
  name: "MovieDetail",
  data() {
    return {
      movieDetail: {},
      scheduleList: []
    };
  },
  methods: {
    statusParser(status) {
      if (status === 1) {
        return "热映中";
      } else {
        return "已下架";
      }
    },
    statusColor: function(status) {
      return status === 1 ? "success" : "error";
    },
    buyMovieTicket: function(scheduleId) {
      localStorage.setItem(
        "scheduleDetail",
        JSON.stringify(
          this.scheduleList.find(s => {
            return s.id == scheduleId;
          })
        )
      );
      this.$router.push({ path: "BuyTicket" });
    },
    onMovieLike: function() {
      let _this = this;
      let likeData = {
        userId: localStorage.getItem("userId"),
        movieId: this.movieDetail.id
      };

      if (this.movieDetail.isLike)
        userApi.DeleteLikeMarkByUserIdAndMovieId(likeData).then(res => {
          _this.movieDetail.isLike = false;
        });
      else
        userApi.InsertLikeMark(likeData).then(res => {
          _this.movieDetail.isLike = true;
        });
    }
  },
  created() {
    let temp = JSON.parse(localStorage.getItem("movieDetail"));
    this.movieDetail = temp;
    userApi.GetScheduleListByMovieId({ movieId: temp.id }).then(res => {
      res.data.forEach(s => {
        s.hallName = "";
      });
      this.scheduleList = res.data;
      userApi.GetHallList().then(res => {
        res.data.forEach(hall => {
          let s = this.scheduleList.find(s => {
            return s.hallId == hall.id;
          });
          if (s) {
            s.hallName = hall.name;
            s.seatList = hall.seatList;
          }
        });
      });
    });
  }
};
</script>

<style scoped>
</style>
