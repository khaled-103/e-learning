<template>
  <div>
    <div class="spinners" v-show="!resultReady">
      <span class="loader"></span>
    </div>
    <div v-show="resultReady">
      <div class="intro-image mt-1">
        <img
          src="https://www.muvi.com/wp-content/uploads/2019/04/5-building-blocks-without-which-you-cannot-develop-an-eLearning-Platform.jpg"
          alt="home-page-image"
        />
      </div>
      <div class="my-5" v-if="higthestRate">
        <h6 class="mx-5 mb-4">
          <span class="clipPath px-4 py-1">Higthest Rate</span>
        </h6>
        <slider  :courses="higthestRate" />
      </div>
      <div class="my-5" v-if="latestCourse">
        <h6 class="mx-5 mb-4">
          <span class="clipPath px-4 py-1">Recently added</span>
        </h6>
        <slider  :courses="latestCourse" />
      </div>
      <div class="my-5" v-if="recommendCourse">
        <h6 class="mx-5 mb-4">
          <span class="clipPath px-4 py-1">Recommended for you</span>
        </h6>
        <slider  :courses="recommendCourse" />
      </div>
      <div>
        <topCategories v-if="topCat" :topCat="topCat" :coursesTopCategory="coursesTopCategory"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import slider from "@/components/HomePage/slider.vue";
import topCategories from "@/components/HomePage/topCategories.vue";


export default {
  layout: "homePageLayout",
  components: {
    slider,
    topCategories
  },
  data() {
    return {
      higthestRate: [],
      latestCourse: [],
      recommendCourse: [],
      coursesTopCategory: [],
      topCat: null,
      resultReady:false
    };
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async initHomePage() {
      this.resultReady = false;
      let cookieInterest = this.$cookies.get("cookieInterest");
      console.log('cookieInterest ' + cookieInterest);
      let result = await this.sendRequest({
        url: "/getHomePageCourses",
        dataSend: {
          cookieInterest: JSON.stringify(cookieInterest ?? []),
        },
      });
      if (result.data.status) {
        this.higthestRate = result.data.homePageSections.higthestRate;
        this.latestCourse = result.data.homePageSections.latestCourse;
        this.recommendCourse = result.data.homePageSections.recommendCourse;
        this.topCat = result.data.homePageSections.topCat;
        this.coursesTopCategory =
          result.data.homePageSections.coursesTopCategory;
      }
      this.resultReady = true;
    },
  },
  mounted() {
    this.initHomePage();
  },
};
</script>

<style >
body,
html {
  background: #fefefe;
}
.clipPath {
  clip-path: polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%);
  background: linear-gradient(to right, #555, #777);
  color: white;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.intro-image {
  height: 80vh;
}
.intro-image img {
  object-fit: fill;
}

.spinners {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #1c1d1f;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: #a435f0 transparent;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>