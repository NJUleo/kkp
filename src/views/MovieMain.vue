<template>
  <div>
    <Carousel autoplay height="auto">
      <div v-for="movie in movieTopList" :key="movie.id">
        <Carousel-item>
          <div class="demo-carousel">
            <img style="width: 800px;height: 600px;" :src="movie.posterUrl">
          </div>
        </Carousel-item>
      </div>
    </Carousel>
    <div style="padding: 24px; minHeight: 280px; background: #fff;">
      <div v-for="movie in movieList" :key="movie.id">
        <Card style="margin-bottom: 10px">
          <div
            slot="title"
            style="display: flex; flex-direction:row; align-items: center; text-align: left; height: 40px"
          >
            <Icon type="ios-film-outline"></Icon>
            <div style="margin-left: 10px; margin-right: 10px;">{{movie.name}}</div>
            <Tag :color="statusColor(movie.status)">{{statusParser(movie.status)}}</Tag>
            <Button
              type="primary"
              @click="onMovieLike(movie.id)"
              slot="extra"
              style="margin-right: 20px; margin-left:auto;"
            >{{movie.isLike?"已":""}}想看</Button>
            <Button type="primary" @click="renderMovieDetail(movie.id)" slot="extra">详情</Button>
          </div>

          <Row type="flex">
            <i-col span="5">
              <div style="text-align:left; height: 130px; margin-right: 5px">
                <img style="width: 120px;height: 130px;" :src="movie.posterUrl">
              </div>
            </i-col>
            <i-col span="19">
              <div style="text-align: justify;">
                <p>{{descriptionCutter(movie.description)}}</p>
                <p>
                  <strong>类型：</strong>
                  {{movie.movieTypeList.toString().replace(/,/g,'/')}}
                </p>
                <p>
                  <strong>导演：</strong>
                  {{movie.director}}
                </p>
                <p>
                  <strong>主演：</strong>
                  {{movie.starringList.toString().replace(/,/g,'/')}}
                </p>
              </div>
            </i-col>
          </Row>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "../api/UserApi";

export default {
  name: "MovieMain",
  data() {
    return {
      movieTopList: [],
      movieList: []
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
      return status === 1 ? "success" : "primary";
    },
    descriptionCutter: function(des) {
      if (des != null)
        return des.length > 160 ? des.slice(0, 160) + "......" : des;
      return "";
    },
    onMovieLike: function(movieId) {
      let movie = this.movieList.find(m => {
        return m.id == movieId;
      });
      let likeData = {
        userId: localStorage.getItem("userId"),
        movieId: movie.id
      };
      if (movie.isLike)
        userApi.DeleteLikeMarkByUserIdAndMovieId(likeData).then(res => {
          movie.isLike = false;
        });
      else
        userApi.InsertLikeMark(likeData).then(res => {
          movie.isLike = true;
        });
    },
    renderMovieDetail: function(movieId) {
      // console.log(movieId);
      let m = this.movieList.find(m => {
        return m.id == movieId;
      });
      localStorage.setItem("movieDetail", JSON.stringify(m));
      this.$router.push({ path: "MovieDetail" });
    }
  },

  created() {
    var _this = this;
    userApi
      .GetMovieList()
      .then(res => {
        // console.log(res.data);
        res.data.forEach(movie => {
          if (movie.posterUrl == "") movie.posterUrl = "../../static/haha.jpg";
          movie.isLike = false;
        });
        _this.movieList = res.data;
        _this.movieTopList = res.data.slice(0, 5);
        userApi
          .GetLikeMarkListByUserId({
            userId: localStorage.getItem("userId")
          })
          .then(res => {
            res.data.forEach(like => {
              let m = _this.movieList.find(m => {
                return m.id == like.movieId;
              });
              if (m) m.isLike = true;
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
