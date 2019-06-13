<template>
  <div class="el-mainPosters">
    <Card>
      <h3 style="text-align: left">正在热映</h3>
    </Card>

    <div class="posters">
      <Card style="width: 1000px">
        <img src="../assets/哥斯拉.jpg" width="144" height="166">
        <p>哥斯拉</p>
        <img src="../assets/最好的我们.jpg"  width="144" height="166">
        <p>最好的我们</p>
        <img src="../assets/追龙.jpg"  width="144" height="166">
        <p>追龙</p>
        <img src="../assets/黑凤凰.jpg"  width="144" height="166">
        <p>黑凤凰</p>
        <img src="../assets/黑衣人.jpg"  width="144" height="166">
        <p>黑衣人</p>
      </Card>
    </div>

    <Card>
      <h3 style="text-align: left">即将上架</h3>
    </Card>
  </div>
</template>

<script>
    export default {
        name: "mainPage"
    }
</script>

<style scoped>
.posters{
  display: inline;

}
</style>
