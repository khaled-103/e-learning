<template>
  <div class="mb-2" style="position: relative">
    <div class="d-flex pb-3 slider" ref="slider">
      <div
        :key="course.id"
        v-for="course in courses"
        class="holder col-md-4 col-sm-6 col-12"
      >
        <div class="slider-item">
          <courseCard :course="course" />
        </div>
      </div>
    </div>
    <i
      class="fa-solid fa-chevron-right arrow pointer"
      @click="translateSlider('r')"
      v-show="!controlShowingArrowRight"
    ></i>
    <i
      class="fa-solid fa-chevron-left arrow pointer"
      @click="translateSlider('l')"
      v-show="scrollValue != 0"
    ></i>
  </div>
</template>

<script>
// import courseCard from '@/components/homePage/courseCard.vue';
import courseCard from "@/components/HomePage/courseCard.vue";
export default {
  layout: "homePageLayout",
  components: {
    courseCard,
  },
  props: {
    courses: Array,
  },
  data() {
    return {
      scrollValue: 0,
      scrollWidth: 10,
      clientWidth: 20,
      timeInterval: null,
    };
  },
  methods: {
    translateSlider(dir) {
      dir == "r" ? this.scrollLeft(1) : this.scrollLeft(-1);
    },
    scrollLeft(dir) {
      this.$refs.slider.scrollBy({
        left: dir * this.$refs.slider.clientWidth,
        behavior: "smooth",
      });

      setTimeout(() => {
        this.scrollValue = this.$refs.slider.scrollLeft;
        this.scrollWidth = this.$refs.slider.scrollWidth;
        this.clientWidth = this.$refs.slider.clientWidth;
      }, 700);
    },
  },
  computed: {
    controlShowingArrowRight() {
      console.log("enter");
      return this.scrollValue == this.scrollWidth - this.clientWidth;
    },
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.clientWidth = 0;
      if(this.$refs.slider)
        this.clientWidth = this.$refs.slider.clientWidth;
      if (this.clientWidth > 0) {
        this.scrollValue = this.$refs.slider.scrollLeft;
        this.scrollWidth = this.$refs.slider.scrollWidth;
        clearInterval(this.timeInterval);
      }
    }, 500);
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.holder {
  height: inherit;
}

::-webkit-scrollbar {
  height: 0px;
}

.slider {
  overflow-x: auto;
  flex-wrap: nowrap;
  width: 97%;
  margin: auto;
  position: relative;
}

.slider-item {
  width: 94%;
  margin: auto;
  cursor: pointer;
  height: 100%;

  /* transition: all  5s ease-in-out; */
}

.fa-chevron-right {
  position: absolute;
  top: 45%;
  right: 1%;
  z-index: 2;
}

.fa-chevron-left {
  position: absolute;
  top: 45%;
  left: 1%;
  z-index: 0;
}

.arrow {
  background: black;
  color: white;
  font-size: 17px;
  border-radius: 50%;
  padding: 9px 11px;
}
@media (min-width: 800px) and (max-width: 1200px) {
  .holder {
    width: 25% !important;
  }
}
@media (min-width: 1200px) {
  .holder {
    width: 20% !important;
  }
}
</style>