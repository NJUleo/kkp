<template>
    <MainPage>
      <router-view></router-view>
    </MainPage>
</template>

<script>
  import MainPage from "../components/MainPage"

  export default {
    name: "UserMain",
    components: {
      MainPage,
    },
    data() {
      return {}
    },
    methods: {},
    created() {
    }
  }
</script>

<style scoped>

</style>
