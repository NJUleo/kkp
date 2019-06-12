<template>
  <div  class="layout">
    <Layout>
      <Header style="margin-top: 0" >
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onSelect">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              电影管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              排片管理
            </MenuItem>
            <MenuItem name="3">
              <Icon type="home"></Icon>
                用户中心
            </MenuItem>  
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="onSelect">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                电影管理
              </template>
              <MenuItem name="1-1">新增电影</MenuItem>
              <MenuItem name="1-2">修改信息</MenuItem>
              <MenuItem name="1-3">删除电影</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                排片管理
              </template>
              <MenuItem name="2-1">新增排片</MenuItem>
              <MenuItem name="2-2">修改排片</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Content>
          <router-view></router-view>
        </Content>

      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>

<script>
  export default {
    name: 'MainPage',
    methods: {
      onSelect(name) {
        switch(name) {
          case '1-1':
            this.$router.push({ path: '/AdminMovieManage' });
            break;
          case '2-1':
            this.$router.push({ path: '/admin/student' });
            break;
          case '2-2':
            this.$router.push({ path: '/admin/tutor' });
            break;
        }
      }
    }
  }
</script>

<style>
</style>
