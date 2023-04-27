<template>
  <div style="padding: 0 40px 25px 32px; position: relative">
    <div class="d-flex mt-2">
      <div class="background-filtes">
        <transition name="filter">
          <div v-show="showSideFilters">
            <div class="filters" style="position: relative">
              <div class="filter mb-4">
                <div
                  @click="toggleNextElement($event)"
                  class="filter-item-header d-flex justify-content-between mb-3"
                >
                  <span>Ratings</span>
                  <i
                    class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
                    style="font-size: 13px; :end "
                  ></i>
                </div>
                <div class="filter-item">
                  <div>
                    <input
                      v-model="filters.ratingFilter"
                      type="radio"
                      value="4.5"
                      name="ratingFilter"
                      id="rating4.5$up"
                      style="color: black"
                    />
                    <label for="rating4.5$up" class="labelRating">
                      <span class="mx-1">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                      </span>
                      <span>4.5&up</span>
                      <span>({{ recomndDurationFilter["4.5up"] }})</span>
                    </label>
                  </div>
                  <div>
                    <input
                      v-model="filters.ratingFilter"
                      type="radio"
                      value="4"
                      name="ratingFilter"
                      id="rating4$up"
                    />
                    <label for="rating4$up" class="labelRating">
                      <span class="mx-1">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </span>
                      <span>4&up</span>
                      <span>({{ recomndDurationFilter["4up"] }})</span>
                    </label>
                  </div>
                  <div>
                    <input
                      v-model="filters.ratingFilter"
                      type="radio"
                      value="3.5"
                      name="ratingFilter"
                      id="rating3.5$up"
                    />
                    <label for="rating3.5$up" class="labelRating">
                      <span class="mx-1">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                      </span>
                      <span>3.5&up</span>
                      <span>({{ recomndDurationFilter["3.5up"] }})</span>
                    </label>
                  </div>
                  <div>
                    <input
                      v-model="filters.ratingFilter"
                      type="radio"
                      value="3"
                      name="ratingFilter"
                      id="rating3$up"
                    />
                    <label for="rating3$up" class="labelRating">
                      <span class="mx-1">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </span>
                      <span>3&up</span>
                      <span>({{ recomndDurationFilter["3up"] }})</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="filter1 mb-4">
                <hr style="margin-top: 0" />
                <div
                  @click="toggleNextElement($event)"
                  class="filter-item-header d-flex justify-content-between mb-3"
                >
                  <span>Language</span>
                  <i
                    class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
                    style="font-size: 13px; :end "
                  ></i>
                </div>
                <div class="filter-item">
                  <div v-for="lang in recomndLnagFilter" :key="lang[0]">
                    <input
                      v-model="filters.languegeFilter"
                      type="checkbox"
                      :value="lang[0]"
                      name="languegeFilter"
                      :id="lang[0]"
                    />
                    <label :for="lang[0]">{{ lang[0] }}</label>
                    <span>({{ lang[1] }})</span>
                  </div>
                </div>
              </div>
              <div class="filter mb-4">
                <hr style="margin-top: 0" />
                <div
                  @click="toggleNextElement($event)"
                  class="filter-item-header d-flex justify-content-between mb-3"
                >
                  <span>Level</span>
                  <i
                    class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
                    style="font-size: 13px; :end "
                  ></i>
                </div>
                <div class="filter-item">
                  <!-- <p  v-for="level in recomndLevelFilter2" :key="level.level">{{ level[1] }}</p> -->
                  <div v-for="level in recomndLevelFilter" :key="level[0]">
                    <input
                      v-model="filters.levelFilter"
                      type="checkbox"
                      :value="level[0]"
                      name="levelFilter"
                      :id="level[0]"
                    />
                    <label :for="level[0]">{{ level[0] }}</label>
                    <span>({{ level[1] }})</span>
                  </div>
                </div>
              </div>
              <div class="filter mb-4">
                <hr style="margin-top: 0" />
                <div
                  @click="toggleNextElement($event)"
                  class="filter-item-header d-flex justify-content-between mb-3"
                >
                  <span>Video Duration</span>
                  <i
                    class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
                    style="font-size: 13px; :end "
                  ></i>
                </div>
                <div class="filter-item">
                  <div>
                    <input
                      v-model="filters.durationFilter"
                      type="checkbox"
                      value="0_3"
                      name="languegeFilter"
                      id="0_3"
                    />
                    <label for="0_3"
                      >0-3 Hour ({{ countDurationFilters["0_3"] }})</label
                    >
                  </div>
                  <div>
                    <input
                      v-model="filters.durationFilter"
                      type="checkbox"
                      value="3_6"
                      name="languegeFilter"
                      id="3_6"
                    />
                    <label for="3_6"
                      >3-6 Hour ({{ countDurationFilters["3_6"] }})</label
                    >
                  </div>
                  <div>
                    <input
                      v-model="filters.durationFilter"
                      type="checkbox"
                      value="6_15"
                      name="languegeFilter"
                      id="6_15"
                    />
                    <label for="6_15"
                      >6-15 Hour ({{ countDurationFilters["6_15"] }})</label
                    >
                  </div>
                  <div>
                    <input
                      v-model="filters.durationFilter"
                      type="checkbox"
                      value="15"
                      name="languegeFilter"
                      id="15up"
                    />
                    <label for="15up"
                      >15+ Hour ({{ countDurationFilters["15"] }})</label
                    >
                  </div>
                </div>
              </div>
              <i class="fa fa-xmark pointer" @click="toggleSideFilter()"></i>
            </div>
          </div>
        </transition>
      </div>
      <div
        :class="[
          'resultSearch',
          { mobileResultSearch: mobileSearchResultClass },
        ]"
      >
        <div class="my-3 header d-flex justify-content-between">
          <div class="mt-4">
            <span @click="toggleSideFilter()">
              <i class="fa-solid fa-bars"></i> Filter
            </span>
            <span class="mx-1" @click="clearFilters()">Clear filters</span>
          </div>
          <h2 class="p-1 my-3" style="font-size: 25px; font-weight: 600">
            {{ filteredItems.length }} results for “{{
              this.$route.params.search
            }}”
          </h2>
        </div>
        <div
          class="pointer"
          v-for="course in itemsInPage"
          :key="course.id"
          @click="goToCourseDetails(course.category_id, course.slug)"
        >
          <div class="result-course d-flex">
            <div class="imageHolder">
              <img :src="course.image" alt />
            </div>
            <div class="course-info mx-3">
              <h3 class="course-name">{{ course.name }}</h3>
              <p class="course-subTitle">{{ course.subtitle }}</p>
              <p class="course-author">{{ course.teacher }}</p>
              <stars
                :numberOfRate="course.rating.numOfRate"
                :rateValue="course.rating.range_rate"
              />
              <p class="course-content">
                {{ course.duration }} , {{ course.lectures_number }} lectures ,
                {{ course.level }}
              </p>
            </div>
            <div class="price">
              <p class="course-price" v-if="course.price > 0">
                ${{ course.price }}
              </p>
              <p class="course-price" v-else>Free</p>
            </div>
          </div>
          <hr class="my-4" />
        </div>
        <b-pagination
          v-model="currentPage"
          v-if="itemsInPage.length > 0"
          :total-rows="rows"
          :per-page="perPage"
          last-number
          align="center"
        ></b-pagination>
        <div v-else class="text-center alert py-3 mt-5">
          <div class="imageEmpty">
            <img src="@/assets/home/empty.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import stars from "~/components/stars.vue";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
export default {
  layout: "homePageLayout",
  components: {
    stars,
  },
  props: {
    courses: [],
  },
  data() {
    return {
      mobileSearchResultClass: false,
      filters: {
        ratingFilter: 0,
        durationFilter: [],
        levelFilter: [],
        languegeFilter: [],
      },
      currentPage: 1,
      perPage: 10,
      showSideFilters: true,
      recomndLevelFilter: new Map(),
      recomndLnagFilter: new Map(),
      countDurationFilters: {
        "0_3": 0,
        "3_6": 0,
        "6_15": 0,
        15: 0,
      },
      recomndDurationFilter: {
        "3up": 0,
        "3.5up": 0,
        "4up": 0,
        "4.5up": 0,
      },
    };
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    toggleNextElement($event) {
      $event.stopPropagation();
      let nextElement = $event.target.nextElementSibling;
      if (nextElement.style.display != "none") {
        nextElement.style.display = "none";
        // $event.target.querySelector('i').style.display='none'
      } else {
        nextElement.style.display = "block";
      }
    },
    toggleSideFilter() {
      let resultSearchDom = document.querySelector(".resultSearch");
      this.showSideFilters = !this.showSideFilters;
      if (this.showSideFilters) {
        resultSearchDom.style.marginLeft = "270px";
      } else {
        resultSearchDom.style.marginLeft = "0";
      }
      this.checkWindowWidth();
    },
    goToCourseDetails(catId, slug) {
      let interest = this.$cookies.get("cookieInterest");
      if (!interest) interest = [];

      if (interest.indexOf(catId) == -1) interest.push(catId);

      this.$cookies.set("cookieInterest", interest, {
        path: "/",
        maxAge: 60 * 60 * 24 * 200,
      });
      this.$router.push({
        name: "course-detail_course-slug",
        params: { slug: slug },
      });
    },
    clearFilters() {
      this.filters.ratingFilter = 0;
      this.filters.durationFilter = [];
      this.filters.levelFilter = [];
      this.filters.languegeFilter = [];
    },
    checkWindowWidth() {
      this.mobileSearchResultClass = false;
      if (window.innerWidth < 846) {
        if (this.showSideFilters) {
          this.mobileSearchResultClass = true;
        }
      }
    },
    listenWindowWidth() {
      window.addEventListener("resize", () => {
        this.checkWindowWidth();
      });
    },
    checkDurationFiltter(courseDuration) {
      if (this.filters.durationFilter.length === 0) return true;
      let duration = parseFloat(courseDuration.split(" ")[0]);
      for (let item of this.filters.durationFilter) {
        if (item.indexOf("_") === -1) {
          if (duration >= parseInt(item)) return true;
        }
        const RANGE_NUMBER = item.split("_");
        if (duration >= RANGE_NUMBER[0] && duration <= RANGE_NUMBER[1])
          return true;
      }
      return false;
    },
    checkFiltersEmpty() {
      return (
        this.filters.languegeFilter.length == 0 &&
        this.filters.ratingFilter == 0 &&
        this.filters.levelFilter.length == 0 &&
        this.filters.durationFilter.length == 0
      );
    },
    calculateCountFilters(courses) {
      courses.forEach((course) => {
        if (this.recomndLnagFilter.has(course.language.language)) {
          let langnum = this.recomndLnagFilter.get(course.language.language);
          this.recomndLnagFilter.set(course.language.language, langnum + 1);
        } else {
          this.recomndLnagFilter.set(course.language.language, 1);
        }

        /* */
        let duration = course.duration.split(" ")[0];
        if (duration >= 0 && duration <= 3) {
          this.countDurationFilters["0_3"]++;
        }
        if (duration >= 3 && duration <= 6) {
          this.countDurationFilters["3_6"]++;
        }
        if (duration >= 6 && duration <= 15) {
          this.countDurationFilters["6_15"]++;
        }
        if (duration >= 15) {
          this.countDurationFilters["15"]++;
        }

        /********** */
        if (this.recomndLevelFilter.has(course.level)) {
          let le = this.recomndLevelFilter.get(course.level);
          this.recomndLevelFilter.set(course.level, le + 1);
        } else {
          this.recomndLevelFilter.set(course.level, 1);
        }
        /*********************/
        if (course.rating.range_rate >= 4.5) {
          this.recomndDurationFilter["4.5up"] += 1;
        }
        if (course.rating.range_rate >= 4) {
          this.recomndDurationFilter["4up"] += 1;
        }
        if (course.rating.range_rate >= 3.5) {
          this.recomndDurationFilter["3.5up"] += 1;
        }
        if (course.rating.range_rate >= 3) {
          this.recomndDurationFilter["3up"] += 1;
        }
      });
    },
  },
  computed: {
    filteredItems() {
      this.currentPage = 1;
      if (this.checkFiltersEmpty()) {
        return this.courses;
      }
      return this.courses.filter((course) => {
        let levelFilter =
          this.filters.levelFilter.length > 0
            ? this.filters.levelFilter.indexOf(course.level) != -1
            : true;
        let langFilter =
          this.filters.languegeFilter.length > 0
            ? this.filters.languegeFilter.indexOf(course.language.language) !=
              -1
            : true;
        let rattingFilter =
          this.filters.ratingFilter <= course.rating.range_rate;

        let coursesFiltered =
          langFilter &&
          levelFilter &&
          rattingFilter &&
          this.checkDurationFiltter(course.duration);
        return coursesFiltered;
      });
    },
    itemsInPage() {
      let indexStart = (this.currentPage - 1) * this.perPage;
      let indexEnd = this.currentPage * this.perPage;
      const el = document.querySelector("body");
      el.scrollIntoView({ behavior: "smooth" });
      return this.filteredItems.slice(indexStart, indexEnd);
    },
    rows() {
      return this.filteredItems.length;
    },
  },
  async mounted() {
    this.checkWindowWidth();
    this.listenWindowWidth();
    this.calculateCountFilters(this.courses);
  },
};
</script>

<style scoped>
.imageEmpty {
  width: 50%;
  height: 280px;
  margin-left: 20%;
}

.imageEmpty img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fa-xmark {
  position: absolute;
  top: 12px;
  right: -55px;
  font-size: 18px;
  color: #1d1e1f;
  background: white;
  color: #1d1e1f;
  border-radius: 50%;
  padding: 12px 15px;
  display: none;
}
.pointer {
  cursor: pointer;
}
.imageHolder {
  height: 150px;
  min-width: 260px;
}

.imageHolder img {
  height: 100%;
  width: 100%;
}

.course-info {
  flex-grow: 2;
}

.course-info .course-name {
  font-size: 18px;
}

.course-info .course-subTitle {
  font-size: 13.5px;
  color: #1c1d1f;
  width: 85%;
  margin-bottom: 5px !important;
}

.course-info .course-author,
.course-info .course-content {
  font-size: 12.5px;
  color: #6a6f73;
  margin-bottom: 0;
}

.price p.course-price {
  color: #1c1d1f;
  font-size: 17px;
  font-weight: 600;
}

.header span {
  border: 1px solid black;
  padding: 15px 12px;
  margin-left: 35px;
  cursor: pointer;
}
.background-filtes {
  position: absolute !important;
  top: 10px;
  left: 0;
  width: 100%;
  /* height: 100vm; */
  background: none;
}
.filters {
  /* position: absolute !important;
  top: 195px;
  left: 0;*/
  width: 270px;
  padding: 0px 17px 20px 22px;
  /* position: relative; */
  /* z-index: 1; */
  animation: filterShow 0.3s ease-out;
  background: white;
}
.filter-leave-from {
  transform: translateX(0);
}
.filter-leave-active {
  transition: all 0.3s ease-in;
}
.filter-leave-to {
  transform: translateX(-100%);
}

.filter-item span {
  font-size: 14px;
}

.resultSearch {
  flex-grow: 2;
  margin-left: 270px;
  position: relative;
  transition: all 0.2s ease-in;
}

.mobileResultSearch {
  max-height: 100vh;
  overflow: hidden;
}

.filter-item-header {
  cursor: pointer;
}

.filter-item-header span {
  font-size: 20px;
  font-weight: 600;
}

.filter-item label {
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 5px;
}

.filter-item label.labelRating {
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 5px;
}

.filter-item input {
  accent-color: black;
  width: 16px;
  cursor: pointer;
  height: 16px;
}

.filter-item label i {
  color: gold;
  margin-bottom: 10px;
}

@media screen and (max-width: 846px) {
  .resultSearch {
    margin-left: 0 !important;
  }
  .background-filtes {
    top: -7px;
    background: rgb(0, 0, 0, 0.5);

    z-index: 10;
  }
  .filters {
    padding-top: 10px;
    background: white;
    min-height: 100vh;
    opacity: 1;
  }
  .fa-xmark {
    display: block;
  }
}

@media (max-width: 576px) {
  .imageHolder {
    height: 80px;
    min-width: 110px;
    max-width: 110px;
  }

  .header span {
    margin-left: 0;
  }

  .header h2 {
    font-size: 19px !important;
  }
}

@keyframes filterShow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>