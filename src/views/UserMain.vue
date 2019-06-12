<template>
    <MainPage>
    </MainPage>
</template>

<script>
  import MainPage from "../components/MainPage"
  import MoviePreview from "../components/Movie.vue"

  export default {
    name: "UserMain",
    components: {
      MainPage,
      MoviePreview
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
