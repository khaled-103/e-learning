<template>
  <div>
    <page-loading-spinner v-if="!resultReady" />
    <div v-else>
      <coursesGroup :courses="courses" />
    </div>
  </div>
</template>

<script>
import coursesGroup from "@/components/HomePage/coursesGroup.vue";
import {mapActions } from 'vuex';
export default {
  layout:'homePageLayout',
  components: {
    coursesGroup,
  },
  data() {
    return {
      courses: [],
      resultReady: false,
    };
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async getCoursesInCategory() {
      try {
        let result = await this.sendRequest({
          url: "/homePage/getCoursesInCategory",
          dataSend: {
            categoryId: this.$route.params.id,
          },
        });
        this.resultReady = true;
        if (result.data.status) {
          this.courses = result.data.courses;
        } else {
          this.$toast.show({
            type: "danger",
            title: "failed",
            message: "something wrong. back to home page",
          });
          this.$router.go(-1);
        }
      } catch (error) {
        this.$toast.show({
          type: "danger",
          title: "failed",
          message: "something wrong. back to home page",
        });
      }
    },
  },
  mounted() {
    this.getCoursesInCategory();
  },
};
</script>

<style scoped>
</style>