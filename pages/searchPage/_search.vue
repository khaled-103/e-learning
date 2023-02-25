<template>
  <div style="padding: 0 40px 30px 32px">
    <div class="mt-4 header">
      <h2 class="p-3 pb-5" style="font-size: 25px; font-weight: 600">
        {{ filteredItems.length }} results for “{{ this.$route.params.search }}”
      </h2>
      <div>
        <span @click="showSideFilters = !showSideFilters"
          ><i class="fa-solid fa-bars"></i> Filter</span
        >
        <span class="mx-2" @click="clearFilters()">Clear filters</span>
      </div>
    </div>
    <div class="d-flex mt-5" style="">
      <div v-show="showSideFilters" class="filters">
        <div class="filter mb-4">
          <hr style="margin-top: 0" />
          <div
            @click="toggleNextElement($event)"
            class="filter-item-header d-flex justify-content-between mb-3"
          >
            <span style="z-index: -1">Ratings</span>
            <i
              class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
              style="font-size: 13px; :end ; z-index: -1"
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
                <span> 4.5&up</span>
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
            <span style="z-index: -1">Language</span>
            <i
              class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
              style="font-size: 13px; :end ; z-index: -1"
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
            <span style="z-index: -1">Level</span>
            <i
              class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
              style="font-size: 13px; :end ; z-index: -1"
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
            <span style="z-index: -1">Video Duration</span>
            <i
              class="fa-solid fa-chevron-down mx-3 d-flex align-self-center"
              style="font-size: 13px; :end ; z-index: -1"
            ></i>
          </div>
          <div class="filter-item">
            <div>
              <input
                v-model="filters.durationFilter"
                type="checkbox"
                value="3"
                name="languegeFilter"
                id="0_3"
              />
              <label for="0_3">0-3 Hour</label>
            </div>
            <div>
              <input
                v-model="filters.durationFilter"
                type="checkbox"
                value="6"
                name="languegeFilter"
                id="3_6"
              />
              <label for="3_6">3-6 Hour</label>
            </div>
            <div>
              <input
                v-model="filters.durationFilter"
                type="checkbox"
                value="15"
                name="languegeFilter"
                id="6_15"
              />
              <label for="6_15">6-15 Hour</label>
            </div>
            <div>
              <input
                v-model="filters.durationFilter"
                type="checkbox"
                value="60"
                name="languegeFilter"
                id="15up"
              />
              <label for="15up">15+ Hour</label>
            </div>
          </div>
        </div>
      </div>
      <div class="resultSearch">
        <div class="pointer" v-for="course in itemsInPage" :key="course.id" @click="goToCourseDetails(course.category_id,course.slug)">
          <div class="result-course d-flex">
            <div class="imageHolder">
              <img :src="course.image" alt="" />
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
              <p class="course-price" v-if="course.price > 0">${{ course.price }}</p>
              <p class="course-price" v-else>Free</p>
            </div>
          </div>
          <hr class="my-4" />
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          last-number
          align="center"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import stars from "@/components/homePage/stars.vue";
import { mapActions } from "vuex";
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
  data() {
    return {
      filters: {
        ratingFilter: 0,
        durationFilter: [],
        levelFilter: [],
        languegeFilter: [],
      },
      currentPage: 1,
      perPage: 10,
      Courses: [],

      showSideFilters: true,
      recomndLevelFilter: new Map(),
      recomndLnagFilter: new Map(),
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
    goToCourseDetails(catId,slug) {
      let interest = this.$cookies.get("cookieInterest");
      if (!interest) interest = [];

      if (interest.indexOf(catId) == -1)
        interest.push(catId);

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
  },
  computed: {
    filteredItems() {
      return this.Courses.filter((course) => {
        let levelFilter =
          this.filters.levelFilter.length > 0
            ? this.filters.levelFilter.indexOf(course.level) != -1
            : this.Courses;
        let langFilter =
          this.filters.languegeFilter.length > 0
            ? this.filters.languegeFilter.indexOf(course.language.language) !=
              -1
            : this.Courses;
        let rattingFilter =
          this.filters.ratingFilter <= course.rating.range_rate;
        let coursesFiltered = langFilter && levelFilter && rattingFilter;
        return coursesFiltered;
      });
    },
    itemsInPage() {
      console.log("items");
      let indexStart = (this.currentPage - 1) * this.perPage;
      let indexEnd = this.currentPage * this.perPage;
      window.scrollTo(0, 0);
      return this.filteredItems.slice(indexStart, indexEnd);
    },
    rows() {
      return this.filteredItems.length;
    },
  },
  async mounted() {
    let result = await this.sendRequest({
      url: "/search",
      dataSend: {
        name: this.$route.params.search,
      },
    });
    if (result.data.status) {
      this.Courses = result.data.course;
      result.data.course.forEach((course) => {
        if (this.recomndLnagFilter.has(course.language.language)) {
          let langnum = this.recomndLnagFilter.get(course.language.language);
          this.recomndLnagFilter.set(course.language.language, langnum + 1);
        } else {
          this.recomndLnagFilter.set(course.language.language, 1);
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
    }
  },
};
</script>

<style scoped>
.pointer{
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

.filters {
  width: 300px;
  padding: 0px 50px 20px 0px;
  position: relative;
  z-index: 2;
  animation: filter 0.3s ease-in-out;
}

.filter-item span {
  font-size: 14px;
}

.resultSearch {
  flex-grow: 2;
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

@keyframes filter {
  0% {
    width: 0;
  }

  100% {
    width: 300px;
  }
}
</style>
