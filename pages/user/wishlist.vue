<template>
  <div>
    <!-- <ul>
      <li>My learning</li>
      <li class="wishlist">Wishlist</li>
    </ul> -->
    <div class="spinners" v-show="!resultReady">
      <span class="loader"></span>
    </div>
    <div class="parent" v-show="resultReady">
      <div v-show="courses.length != 0">
        <div v-for="course in courses" :key="course.id" class="wishlist-item">
          <div class="holder">
            <div class="image-holder">
              <img :src="course.image" alt="course image" />
            </div>
            <i class="fa-solid fa-heart heart" @click="removeFromWishList(course)"></i>
            <div @click="redirectToDetails(course.slug)">
              <h4>{{ course.name }}</h4>
              <div class="teacher">{{course.teacher}}</div>
              <Stars :numberOfRate="course.rating.numOfRate" :rateValue="course.rating.range_rate" />
              <span>{{ course.duration }} ,</span>
              <span>{{ course.lectures_number }} lectures</span>
              <p>${{course.price}}</p>
            </div>
            <div class="test" @click="redirectToDetails(course.slug)"></div>
          </div>
        </div>
      </div>
      <div v-show="courses.length == 0" class="empty">
        <button class="empty-btn" @click="redirectToIndex()">Browse courses now</button>
        <div class="image-empty-holder">
          <img src="~/assets/home/empty.png" class="img-empty" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SpinnerLoad from "~/components/spinnerLoad.vue";
export default {
  middleware: 'AuthUser',
  layout: "homePageLayout",
  components: {
    SpinnerLoad
  },
  data() {
    return {
      courses: [],
      resultReady: false,
      
    };
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest"
    }),
    ...mapGetters({
      getToken: "auth/getToken"
    }),
    async removeFromWishList(course) {
      let result = await this.sendRequest({
        url: "/wishlist/delete",
        dataSend: {
          user_id: this.getToken().tokenable_id,
          course_id: course.id
        }
      });
      if (result.data.status) {
        this.courses.splice(this.courses.indexOf(course), 1);
      }
    },
    async getWishlistItems() {
      this.resultReady = false;
      let result = await this.sendRequest({
        url: "/wishlist/wishlistItems",
        dataSend: {
          user_id: this.getToken().tokenable_id
        }
      });
      if (result.data.status) {
        this.courses = result.data.courses;
      }
      this.resultReady = true;
    },
    redirectToDetails(slug) {
      this.$router.push({
        name: "course-detail_course-slug",
        params: { slug: slug }
      });
    },
    redirectToIndex() {
      this.$router.push({
        name: "index"
      });
    }
  },
  async mounted() {
    let interval = setInterval(() => {
      if (this.getToken()) {
        this.getWishlistItems();
        clearInterval(interval);
      }
    }, 100);
  }
};
</script>

<style scoped>
.parent {
  margin: auto;
  width: 88%;
}
ul {
  padding-top: 30px;
  background-color: #1c1d1f;
}
li {
  display: inline-block;
  color: white;
  margin: 10px;
  font-size: 18px;
}
.test {
  position: absolute;
  top: 0;
  right: 0;
  height: 180px;
  width: 100%;
  background-color: #1c1d1f;
  z-index: 10;
  opacity: 0;
}
.wishlist {
  border-bottom: 2px solid white;
}
.wishlist-item {
  width: 20%;
  float: left;
  padding: 15px;
}

.holder {
  position: relative;
}
.wishlist-item:hover {
  cursor: pointer;
}
.wishlist-item:hover .test {
  opacity: 0.5;
}
.wishlist-item .image-holder {
  width: 100%;
  height: 180px;
}
.wishlist-item img {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
  border: 1px solid #d1d7dc;
  object-fit: cover;
}

.wishlist-item .heart {
  position: absolute;
  right: 0;
  top: 190px;
  color: #1c1d1f;
  font-size: 22px;
}

.heart:hover {
  font-weight: lighter;
}

.wishlist-item h4 {
  font-size: 16px;
  font-weight: bold;
  color: #1c1d1f;
  margin: 10px 0;
  width: 80%;
}

.wishlist-item .teacher,
.wishlist-item span {
  font-size: 14px;
  color: #6a6f73;
}

.wishlist-item p {
  margin: 5px 0;
  font-weight: bold;
  color: #1c1d1f;
}

.empty {
  width: 30%;
  margin: 150px auto;
}
.empty-btn {
  width: 80%;
  height: 40px;
  background-color: #1c1d1f;
  color: white;
  font-weight: 500;
  /* margin-left: 20px; */
}

.image-empty-holder {
  width: 100%;
  position: relative;
}

.image-empty-holder .img-empty {
  position: absolute;
  height: 300px;
}
@media (max-width: 1140px) {
  .wishlist-item {
    width: 25%;
  }
}
@media (max-width: 960px) {
  .wishlist-item {
    width: 33.33%;
  }

  .empty {
    width: 80%;
    margin: 50px auto;
  }
  .empty-btn {
    width: 88%;
    height: 40px;
    background-color: #1c1d1f;
    color: white;
    font-weight: 500;
    margin-left: 12px;
  }

  .image-empty-holder {
    width: 100%;
    position: relative;
  }

  .image-empty-holder .img-empty {
    position: absolute;
  }
}
@media (max-width: 720px) {
  .wishlist-item {
    width: 50%;
  }
  .empty {
    width: 80%;
    margin: 50px auto;
  }
  .empty-btn {
    width: 88%;
    height: 40px;
    background-color: #1c1d1f;
    color: white;
    font-weight: 500;
    margin-left: 12px;
  }

  .image-empty-holder {
    width: 100%;
    position: relative;
  }

  .image-empty-holder .img-empty {
    position: absolute;
  }
}
@media (max-width: 540px) {
  .wishlist-item {
    width: 100%;
    border-bottom: 1px solid #1c1d1f;
  }
  .empty {
    width: 80%;
    margin: 50px auto;
  }
  .empty-btn {
    width: 88%;
    height: 40px;
    background-color: #1c1d1f;
    color: white;
    font-weight: 500;
    margin-left: 12px;
  }

  .image-empty-holder {
    width: 100%;
    position: relative;
  }

  .image-empty-holder .img-empty {
    position: absolute;
  }
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