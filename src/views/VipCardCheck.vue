<template>
  <div style="margin: 200px 200px 50px 200px;">
    <Card v-show="hasVipCard == false" style="margin: auto;">
      <div slot="title">尚未办卡</div>
      <div style="margin-top: 100px; margin-bottom: 100px;">
        您尚未办理会员卡，
        <a @click="onCreateVipCard">点击免费办卡</a>
      </div>
    </Card>
    <Card v-show="hasVipCard == true" style="width: 800px; margin: auto;">
      <div slot="title">您的会员卡</div>
      <Row type="flex" style="margin: 20px 15% 20px 15%; text-align: left; align-items: flex-end;">
        <i-col span="20">
          <div>余额: {{balance}} 元</div>
          <div>会员卡等级: {{levelDetail}}</div>
          <div>会员卡折扣: {{discount * 10}} 折</div>
        </i-col>
        <i-col span="4">
          <Button type="info">充值</Button>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
export default {
  name: "VipCardCheck",
  data: () => {
    return {
      hasVipCard: null,
      balance: 0,
      levelDetail: "铁卡",
      discount: 0.9
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
