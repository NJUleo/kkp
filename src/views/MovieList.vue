<template>
  <div class="lay-out">
    <Row>
      <Carousel autoplay height="auto">
        <div v-for="movie in movieTopList" :key="movie.id">
          <Carousel-item>
            <div class="demo-carousel">
              <img style="width: 300px;height: 400px;" :src="movie.posterUrl">
            </div>
          </Carousel-item>
        </div>
      </Carousel>
    </Row>
    <Row>
      <i-col span="24">
        <Layout :style="{padding: '0 20px'}">
          <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
            <div v-for="movie in movieList" :key="movie.id">
              <Card style="height: 220px; margin-bottom: 10px">
                <p slot="title" style="text-align: left; height: 25px">
                  <Icon type="ios-film-outline"></Icon>
                  {{movie.name}}
                  <Tag :color="statusColor(movie.status)">{{statusParser(movie.status)}}</Tag>
                </p>
                <Button
                  type="primary"
                  @click="onMovieLike(movie.id)"
                  slot="extra"
                  style="margin-right: 20px;"
                >{{movie.isLike?"已":""}}想看</Button>
                <Button type="primary" @click="renderMovieDetail(movie.id)" slot="extra">详情</Button>
                <div
                  style="text-align:left;float: left; width: 100px;height: 130px; margin-right: 5px"
                >
                  <img style="width: 100px;height: 130px;" :src="movie.posterUrl">
                </div>
                <div style="width: 750px; text-align: justify;">
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
              </Card>
            </div>
          </Content>
        </Layout>
      </i-col>
    </Row>
  </div>
</template>

<script>
import userApi from "../api/UserApi";

export default {
  name: "MovieList",
  data() {
    return {
      movieTopList: [
        {
          id: "1",
          name: "夏目友人帐",
          description:
            "在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个",
          posterUrl: "../../static/haha.jpg",
          director: "大森贵弘 /伊藤秀樹",
          starringList: ["神谷浩史", "井上和彦", "高良健吾", "小林沙苗"],
          movieTypeList: ["动画", "cnm"],
          country: "日本",
          language: "日语",
          startDate: "2019/4/4",
          duration: "90",
          status: 1
        }
      ],
      movieList: [
        {
          id: "1",
          name: "夏目友人帐",
          description:
            "在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个",
          posterUrl: "../../static/haha.jpg",
          director: "大森贵弘 /伊藤秀樹",
          starringList: ["神谷浩史", "井上和彦", "高良健吾", "小林沙苗"],
          movieTypeList: ["动画", "cnm"],
          country: "日本",
          language: "日语",
          startDate: "2019/4/4",
          duration: "90",
          status: 1
        }
      ]
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
