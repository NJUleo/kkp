<template>
  <div class="lay-out">
    <Row>
      <p style="height: 200px">
      <Carousel autoplay height="200px">
        <div v-for="movie in movieList" :key="movie">
          <Carousel-item>
              <div class="demo-carousel">
                <img style="width: 150px;height: 200px;" :src=movie.posterUrl>
              </div>
          </Carousel-item>
        </div>
      </Carousel>
      </p>
    </Row>
    <Row>
      <i-col span="24">
        <Layout :style="{padding: '0 20px'}">
          <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
            <div v-for="movie in movieList" :key="movie">
              <Card style="height: 220px; margin-bottom: 10px">
                <p slot="title" style="text-align: left; height: 25px">
                  <Icon type="ios-film-outline"></Icon>
                  {{movie.name}}
                  <Tag :color=statusColor(movie.status)>{{statusParser(movie.status)}}</Tag>
                </p>
                <Button type="primary" @click="renderMovieDetail(movie.id)" slot="extra">
                  详情
                </Button>
                <div style="text-align:left;float: left; width: 100px;height: 130px; margin-right: 5px">
                  <img style="width: 100px;height: 130px;" :src=movie.posterUrl>
                </div>
                <div style="width: 750px; text-align: justify;">
                  <p>{{descriptionCutter(movie.description)}}</p>
                  <p><strong>类型：</strong>{{movie.type.toString().replace(/,/g,'/')}}</p>
                  <p><strong>导演：</strong>{{movie.director}}</p>
                  <p><strong>主演：</strong>{{movie.starring.toString().replace(/,/g,'/')}}</p>
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
  import userApi from '../api/UserApi'

  export default {
    name: "UserMovieList",
    data() {
      return {
        movieList: [
          {
            id: '1',
            name: '夏目友人帐',
            description: '在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
            posterUrl: '../../static/haha.jpg',
            director: '大森贵弘 /伊藤秀樹',
            starring: ['神谷浩史', '井上和彦', '高良健吾', '小林沙苗'],
            type: ['动画', 'cnm'],
            country: '日本',
            language: '日语',
            startDate: '2019/4/4',
            duration: '90',
            status: 1
          },  {
            id: '2',
            name: '夏目友人帐',
            description: '在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
            posterUrl: '../../static/haha.jpg',
            director: '大森贵弘 /伊藤秀樹',
            starring: ['神谷浩史', '井上和彦', '高良健吾', '小林沙苗'],
            type: ['动画'],
            country: '日本',
            language: '日语',
            startDate: '2019/4/4',
            duration: '90',
            status: 1
          },
        ]
      }
    },
    methods: {
      statusParser(status) {
        if (status === 1) {
          return "热映中";
        } else {
          return "已下架"
        }
      },
      statusColor: function (status) {
        return status === 1 ? 'success' : 'primary';
      },
      descriptionCutter:function (des) {
        return des.length>160?des.slice(0,160)+'......':des;
      },
      renderMovieDetail:function (movieId) {
        localStorage.setItem("movieDetail",JSON.stringify(this.movieList[movieId]));
        this.$router.push({path:'UserMovieDetail'})
      }
    },


    created() {
      var _this = this;
      userApi.GetMovieList()
        .then(res =>{
          _this.movieList = res;
        })
        .catch(err =>{
          console.log(error);
        });
    }
  }
</script>

<style scoped>

</style>
