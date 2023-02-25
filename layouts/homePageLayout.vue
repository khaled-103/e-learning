<template>
  <div>
    <navbarHome v-if="coursesInfoForHint" :coursesInfoForHint="coursesInfoForHint" @show-side-bar="sideBarShow = true"
      @show-search-bar="searchBarShow = true" />
    <div v-show="sideBarShow" class="d-lg-none">
      <side-bar-home @hide-side-bar="sideBarShow = false" />
    </div>
    <div v-show="searchBarShow" class="d-sm-none">
      <search-bar v-if="coursesInfoForHint" :coursesInfoForHint="coursesInfoForHint" @hide-search-bar="searchBarShow = false" />
    </div>
    <Nuxt />
  </div>
</template>

<script>
import navbarHome from "@/components/HomePage/navbar.vue";
import sideBarHome from '@/components/HomePage/sideBar.vue';
import searchBar from '@/components/HomePage/searchBar.vue';
import {mapActions} from 'vuex';
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
      },

    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
      },
    ],
  },
  components: {
    navbarHome,
    sideBarHome,
    searchBar
  },
  data() {
    return {
      sideBarShow: false,
      searchBarShow: false,
      coursesInfoForHint: [],
    }
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest"
    }),
  },
  async created() {
    if (this.$store.state.auth.token == null)
      this.$store.dispatch("auth/initToken");

    let result = await this.sendRequest({
      url: "/search/get-course-names",
      dataSend: null
    });
    console.log(result.data);
    this.coursesInfoForHint = result.data;
  },
};
</script>

<style >
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
@import "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css";
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");

* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

</style>