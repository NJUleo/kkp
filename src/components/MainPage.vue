<template>
  <Layout>
    <Row type="flex" style="padding-top:20px; padding-bottom: 10px; align-items: flex-end;">
      <i-col span="14">
        <h1 style="text-align: left; font-size: 50px; padding-left:10%; padding-top: 20px; padding-bottom: 10px;">破产影院</h1>
      </i-col>
      <i-col span="10" style="padding-right: 20px;">
        <Input search placeholder="搜你感兴趣的电影"/>
      </i-col>
    </Row>

    <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="onSelect">
      <MenuItem name="0">
        <Icon type="ios-paper"/>首页
      </MenuItem>
      <MenuItem name="1">
        <Icon type="ios-people"/>电影
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"/>票房
      </MenuItem>
      <Submenu name="3" style="float: right;">
        <template slot="title">
          <Icon type="ios-people"/>用户中心
        </template>
        <MenuGroup title="订单">
          <MenuItem name="3-1">我的订单</MenuItem>
        </MenuGroup>
        <MenuGroup title="卡包">
          <MenuItem name="3-2">会员卡</MenuItem>
          <MenuItem name="3-3">优惠券</MenuItem>
        </MenuGroup>
      </Submenu>
    </Menu>
  </Layout>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      theme: "primary"
    };
  },
  methods: {
    onSelect(name) {
      switch (name) {
        case "0":
          this.$router.push({ path: "/Main/" });
          break;
        case "1":
          this.$router.push({ path: "/Main/MovieList" });
          break;
        case "2":
          // this.$router.push({ path: "/Main/nmsl" });
          break;
        case "3-1":
          this.$router.push({ path: "/Main/MyOrder" });
          break;
        case "3-2":
          this.$router.push({ path: "/Main/VipCardCheck" });
          break;
        case "3-3":
          this.$router.push({ path: "/Main/CouponCheck" });
          break;
      }
    }
  }
};
</script>
<style>
</style>


