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
      <Row type="flex" style="margin: 20px 15% 20px 15%; text-align: left; align-items: center;">
        <i-col span="20">
          <div style="margin-bottom: 20px;">余额: {{balance}} 元</div>
          <div style="margin-bottom: 20px;">会员卡等级: {{levelDetail}}</div>
          <div style="margin-bottom: 20px;">会员卡折扣: {{discount * 10}} 折</div>
        </i-col>
        <i-col span="4">
          <RadioGroup v-model="chargeMoney" style="padding-bottom: 20px;" vertical>
            <Radio label="20">20元</Radio>
            <Radio label="50">50元</Radio>
            <Radio label="100">100元</Radio>
            <Radio label="200">200元</Radio>
          </RadioGroup>
          <Button type="info" @click="onCharge">充值</Button>
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
      discount: 0.9,
      chargeMoney: 0
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
    },
    onCharge() {
      let money = this.chargeMoney;
      userApi.ChargeVipCard(localStorage.getItem("userId"), money).then(res => {
        this.$Message.success("充值成功, 金额 " + money + " 元");
      });
    }
  },
  created() {
    userApi.GetUserVipCard(localStorage.getItem("userId")).then(res => {
      this.hasVipCard = res.data.data != null;
      this.balance = res.data.data.balance;
      this.discount = res.data.data.discount;
      this.levelDetail = res.data.data.levelDetails;
    });
  }
};
</script>

<style scoped>
</style>
