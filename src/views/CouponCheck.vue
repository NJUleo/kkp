<template>
  <div style="margin: 50px 200px 50px 200px;">
    <Card
      style="margin: 10px auto 30px auto; width: 500px; text-align: left;"
      v-for="coupon in couponList"
      :key="coupon.id"
    >
      <div slot="title">
        <div style="display: flex; flex-direction: row; align-items: center;">
          <strong>{{coupon.activityName}}</strong>
          <Tag color="primary" style="margin-left: auto;">有效</Tag>
        </div>
      </div>
      <div style="font-size: 20px;">{{coupon.activityDescription}}</div>
      <div style="font-size: 20px;">满 {{coupon.moneyMustHave}} 元，减 {{coupon.moneyGet}} 元</div>
      <Row style="margin-top: 30px; align-items: flex-end;" type="flex">
        <i-col span="18">
          <div>{{coupon.startDate + ' 到 ' + coupon.endDate}}</div>
        </i-col>
        <i-col span="6">
          <div v-show="coupon.isUniverse" style="text-align: right; color: grey;">通用券</div>
          <div v-show="!coupon.isUniverse" style="color: grey;">
            <div>适用电影：</div>
            <div v-for="movie in coupon.joinMovieList" :key="movie.movieId">{{movie.movieName}}</div>
          </div>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
export default {
  name: "CouponCheck",
  data: () => {
    return {
      couponList: []
    };
  },
  created() {
    userApi.GetCouponByUserId(localStorage.getItem("userId")).then(res => {
      console.log("优惠券信息", res.data);
      res.data.forEach(c => {
        c.joinMovieList.forEach(m => {
          m.movieName = "";
        });
      });
      this.couponList = res.data;
      userApi.GetMovieList().then(res => {
        res.data.forEach(m => {
          this.couponList.forEach(c => {
            let cm = c.joinMovieList.find(tm => {
              return tm.movieId == m.id;
            });
            if (cm) cm.movieName = m.name;
          });
        });
      });
    });
  }
};
</script>

<style scoped>
</style>
