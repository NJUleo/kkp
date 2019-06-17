<template>
  <div>
    <MainPage></MainPage>
    <router-view></router-view>
  </div>
</template>

<script>
import MainPage from "@/components/MainPage";

export default {
  name: "Main",
  components: {
    MainPage
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
</style>
