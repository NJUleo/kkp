<template>
  <div style="margin: 50px 200px 50px 200px;">
    <Card v-show="hasVipCard == false">
      <div slot="title">尚未办卡</div>
      <div style="margin-top: 100px; margin-bottom: 100px;">
        您尚未办理会员卡，
        <a @click="onCreateVipCard">点击免费办卡</a>
      </div>
    </Card>
    <Card v-show="hasVipCard == true"></Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
export default {
  name: "VipCardCheck",
  data: () => {
    return {
      hasVipCard: null
    };
  },
  methods: {
    onCreateVipCard() {
      userApi.InsertUserVipCard(localStorage.getItem("userId")).then(res => {
        this.$Message.success("办卡成功！正在获取会员卡信息");
        userApi.GetUserVipCard(localStorage.getItem("userId")).then(res => {
          console.log(res.data.data);
          this.hasVipCard = res.data.data != null;
        });
        this.hasVipCard = true;
      });
    }
  },
  created() {
    userApi.GetUserVipCard(localStorage.getItem("userId")).then(res => {
      this.hasVipCard = res.data.data != null;
      console.log(res.data.data);
    });
  }
};
</script>

<style scoped>
</style>
