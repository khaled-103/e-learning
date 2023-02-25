<template>
  <div class="mb-5">
    <div class="holder">
      <h3>A broad selection of courses</h3>
      <div class="top-headers">
        <span
          @click="changeActiveCat(cat.id, cat.name)"
          :class="['category pointer', { 'cat-active': activeCat == cat.id }]"
          :key="cat.id"
          v-for="cat in topCat"
        >
          {{ cat.name }}
        </span>
      </div>
      <div class="my-1">
        <div class="border">
          <p class="p-3">
            Welcome to this section where you will have the opportunity to
            expand your knowledge on our most popular topics. Throughout this
            section, you will be introduced to a wide range of information
            designed to provide you with a thorough understanding of the topic
            at hand. Whether you are looking to improve your skills, gain new
            insights, or simply broaden your horizons, this section will present
            you with a wealth of useful and engaging information.
          </p>
          <slider :courses="sliderCourses" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider from "@/components/HomePage/slider.vue";
export default {
  components: {
    slider,
  },
  data() {
    return {
      activeCat: 0,
      sliderCourses: [],
    };
  },
  props: {
    topCat: Array,
    coursesTopCategory: Object,
  },
  mounted() {
    this.activeCat = this.topCat[0].id;
    this.sliderCourses = this.coursesTopCategory[this.topCat[0].name];
  },
  methods: {
    changeActiveCat(id, name) {
      this.activeCat = id;
      this.sliderCourses = this.coursesTopCategory[name];
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  height: 0px;
}
.pointer {
  cursor: pointer;
}
.holder {
  width: 97%;
  margin: auto;
}
.top-headers {
  overflow-x: auto;
  white-space: nowrap;
}
.category {
  padding-right: 15px;
  font-weight: 600;
  color: #555;
}
.cat-active {
  color: #1c1d1f;
}
.category:hover {
  color: #1c1d1f;
}
p {
  width: 80%;
  color: #555;
}
</style>