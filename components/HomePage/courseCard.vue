<template>
  <div>
    <div class="course-card" @click="goToCourseDetails">
      <div class="imageHolder">
        <img
          :src="
            'http://127.0.0.1:8000/uploads/images/org/courses/' + course.image
          "
          alt=""
        />
      </div>
      <div class="bg-white course-info">
        <h6 class="courseName mt-1">{{ course.courseName }}</h6>
        <span class="course-auth">{{ course.orgName }}</span>
        <div class="mb-1">
          <stars
            :rateValue="course.range_rate"
            :numberOfRate="course.numOfRate"
          />
        </div>
        <h6 v-if="course.price > 0">${{ course.price }}</h6>
        <h6 v-else>Free</h6>
        <!-- <div>Bestseller</div> -->
        <!-- "{name:'course-detail_course-slug',params:{slug:course.slug}} -->
      </div>
    </div>
  </div>
</template>
<script>
import stars from "~/components/HomePage/stars1.vue";
export default {
  props: {
    course: Object,
  },
  components: {
    stars,
  },
  methods: {
    goToCourseDetails() {
      let interest = this.$cookies.get("cookieInterest");
      if (!interest) interest = [];

      if (interest.indexOf(this.course.category_id) == -1)
        interest.push(this.course.category_id);

      this.$cookies.set("cookieInterest", interest, {
        path: "/",
        maxAge: 60 * 60 * 24 * 200,
      });
      this.$router.push({
        name: "course-detail_course-slug",
        params: { slug: this.course.slug },
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.course-card {
  border-radius: 15px;
  box-shadow: 1px 1px 6px #888a88;
  /* transition: all  5s ease-in-out; */
  height: 100%;
}

.imageHolder {
  height: 150px;
}

.imageHolder img {
  height: 100%;
  width: 100%;
  border-radius: 15px 15px 0 0;
  object-fit: cover;
}

.course-info {
  border-radius: 0 0 15px 15px;
  padding: 10px;
}

.courseName {
  font-size: 16px;
  font-weight: 600;
  color: black;
  display: -webkit-box !important;
  line-height: 1.2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  margin-bottom: 3px;
}

.course-auth {
  font-size: 13px;
  color: #888a88;
}

.rate-value,
i.star {
  color: #e59819;
}

.rate-value {
  font-weight: 500;
  font-size: 15px;
}
.num-rate {
  color: #656565;
  font-size: 12px;
  margin-top: 3px;
}

i.star {
  font-size: 12px;
}
</style>