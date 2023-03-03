<template>
  <div>
    <div class="spinners" v-show="loadingSpinnerShow">
      <span class="loader"></span>
    </div>
    <div class="container" v-show="!loadingSpinnerShow">
      <div class="d-flex justify-content-between mt-4">
        <div class="col-lg-8 col-12" style="margin-right: 30px">
          <div class="video mb-4">
            <video ref="videoSource" width="100%" height="100%" controls>
              <source :src="video" type="video/mp4" />
            </video>
          </div>
          <div class="information">
            <h3>{{ title }}</h3>
            <p>{{ subtitle }}</p>
            <div class="details">
              <span
                >By <a href="#" style="margin-right: 12px">{{ org }}</a
                >|</span
              >
              <span
                >Last update
                <span
                  style="margin-right: 4px; color: #790ec0; overflow: visible"
                  >{{ lastUpdate }}</span
                >|</span
              >
              <span style="color: #790ec0"
                ><i
                  class="fa-solid fa-globe"
                  style="color: #212a39; margin-right: 5px"
                ></i
                >{{ language }}</span
              >
              <div
                class="ratings mt-3"
                style="height: 32; display: flex; height: 32px"
              >
                <span
                  style="
                    padding: 0;
                    color: #f98f05;
                    margin-top: 3px;
                    font-size: 16px;
                    font-weight: 400;
                  "
                  >{{ avargRating }}</span
                >
                <!-- <div> -->

                <div
                  class="mx-2 rating-star"
                  style="position: relative; line-height: normal"
                >
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <div
                    class="rating-star-rating"
                    :style="{
                      width:
                        (avargRating / 5.0) * 100 +
                        (avargRating == 4.5 ? 0.2 : 0) -
                        (avargRating < 2.9 ? 0.6 : 0) -
                        (avargRating < 1.9 ? 0.9 : 0) +
                        '%',
                    }"
                  >
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
                <!-- </div> -->

                <span class="mt-1"
                  >({{ numberRating }} ratings) 25,201 student</span
                >
              </div>
              <div class="d-lg-none">
                <h3 class="mt-3" v-if="price > 0">${{ price }}</h3>
                <h3 class="mt-3" v-else>Free</h3>
                <div class="actions d-flex">
                  <button class="buy mx-2">Buy now</button>
                  <button class="wishList">
                    <i class="fa-regular fa-heart" style="color: black"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="curriculum-overview mt-4 border">
            <div class="tabs">
              <div class="d-flex">
                <a
                  @click="changeActive(0)"
                  :class="[' col-4', { selectActive: active == 0 }]"
                  >Overview</a
                >
                <a
                  @click="changeActive(1)"
                  :class="[
                    'border-start col-4 ',
                    { selectActive: active == 1 },
                  ]"
                  >curriculum</a
                >
                <a
                  @click="changeActive(2)"
                  :class="[
                    'border-start  col-4',
                    { selectActive: active == 2 },
                  ]"
                  >Objective</a
                >
              </div>
            </div>
            <div v-show="active == 0" class="overview">
              <div class="includes2 d-lg-none">
                <h4
                  style="
                    color: #0c2e60;
                    font-weight: 600;
                    font-family: 'Poppins', sans-serif;
                  "
                >
                  This course includes:
                </h4>
                <p>
                  <i class="fa-solid fa-video"></i>
                  <span>{{ totalDurationForCourse }} on-demand video</span>
                </p>
                <p>
                  <i class="fa-solid fa-tablet-screen-button"></i>
                  <span>Access on mobile and TV</span>
                </p>
                <p>
                  <i class="fa-solid fa-clock"></i>
                  <span>Full lifetime access </span>
                </p>
                <p>
                  <i class="fa-solid fa-arrow-down"></i>
                  <span>{{ numberFile }} downloadable resources</span>
                </p>
                <p>
                  <i class="fa-solid fa-medal"></i>
                  <span>Certificate of Completion</span>
                </p>
              </div>
              <div class="description">
                <h4>Description</h4>
                <p v-html="description"></p>
              </div>
              <div class="requirement">
                <h4>Requirements for this course</h4>
                <div v-for="requirement in requirements" :key="requirement">
                  <p>
                    <i class="fa-regular fa-hand-point-right"></i>
                    <span>{{ requirement }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              v-show="active == 1"
              v-for="section in sections"
              :key="section.id"
              class="curriculum"
            >
              <div
                v-show="section.id != null"
                class="my-3 border"
                style="width: 90%; margin: auto"
              >
                <div
                  @click="showLectures(section)"
                  class="section p-3 d-flex justify-content-between"
                  style="background: #f7f7f7"
                >
                  <div>
                    <i
                      v-show="!section.showLectures"
                      class="fa-solid fa-chevron-down mx-1"
                      style="font-size: 13px"
                    ></i>
                    <i
                      v-show="section.showLectures"
                      class="fa-solid fa-chevron-up mx-1"
                      style="font-size: 13px"
                    ></i>
                    <span style="font-weight: 500; font-size: 17px">{{
                      section.title
                    }}</span>
                  </div>
                  <div>
                    <span style="font-size: 14.5px; color: rgb(36, 38, 40)"
                      >{{ section.lectures.length }} lectuers
                    </span>
                    <span style="font-size: 14.5px; color: rgb(36, 38, 40)"
                      >, {{ calculateDuration(section) }}</span
                    >
                  </div>
                </div>

                <div v-show="section.showLectures">
                  <div
                    v-for="lecture in section.lectures"
                    :key="lecture.id"
                    class="lectures mx-4 my-3 d-flex justify-content-between"
                  >
                    <div class="">
                      <i
                        v-show="lecture.type == 'video'"
                        class="fa-solid fa-circle-play"
                      ></i>
                      <i
                        v-show="lecture.type == 'attachment'"
                        class="fa-solid fa-file"
                      ></i>
                      <span
                        class="mx-2"
                        style="font-size: 14.5px; color: rgb(90, 92, 96)"
                        >{{ lecture.title }}</span
                      >
                    </div>
                    <span
                      v-show="lecture.type == 'video'"
                      style="font-size: 14.5px; color: rgb(90, 92, 96)"
                      >{{ lecture.lecture_duration }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-show="active == 2" class="Objective">
              <div class="requirement">
                <h4>You will learn form this course</h4>
                <div v-for="objective in objectives" :key="objective">
                  <p>
                    <i class="fa-regular fa-hand-point-right"></i>
                    <span>{{ objective }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Ratings :avargRating="avargRating" :numberRating="numberRating" />

          <!-- <button data-bs-toggle="modal" data-bs-target="#rate">Add rate</button> -->
          <!-- The Modal Add Rate -->
          <!-- <div class="modal fade" id="rate">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Rate and Comment</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body" style="text-align: center;">
                  <i @click="setRatinng(1)"
                    :class="['fa-2x fa-star', { 'fa-solid': setRate >= 1 }, { 'fa-regular': setRate < 1 }]"></i>
                  <i @click="setRatinng(2)"
                    :class="['fa-2x fa-star', { 'fa-solid': setRate >= 2 }, { 'fa-regular': setRate < 2 }]"></i>
                  <i @click="setRatinng(3)"
                    :class="['fa-2x fa-star', { 'fa-solid': setRate >= 3 }, { 'fa-regular': setRate < 3 }]"></i>
                  <i @click="setRatinng(4)"
                    :class="['fa-2x fa-star', { 'fa-solid': setRate >= 4 }, { 'fa-regular': setRate < 4 }]"></i>
                  <i @click="setRatinng(5)"
                    :class="['fa-2x fa-star', { 'fa-solid': setRate == 5 }, { 'fa-regular': setRate < 5 }]"></i>

                  <textarea v-show="setRate > 0" class="border border-dark p-2 mt-4" v-model="comment"
                    style="width: 90%;margin:auto ;outline: 0" rows="3"></textarea>

                </div>

                <div class="modal-footer">
                  <button class="btn btn-success" data-bs-dismiss="modal" @click="addRating">
                    Save
                  </button>
                  <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="col-4 d-lg-block d-none border" style="text-align: center">
          <img :src="image" style="min-width: 100%; height: 270px" alt="" />
          <h3 class="mt-3" v-if="price > 0">${{ price }}</h3>
          <h3 class="mt-3" v-else>Free</h3>
          <div class="actions">
            <button
              class="buy"
              v-if="status == 'not_pay'"
              @click="goToPayments()"
            >
              Buy now
            </button>
            <button class="buy" v-if="status == 'free'" @click="enrollFree()">Enroll now</button>
            <button
              class="buy"
              v-if="status == 'register'"
              @click="goToCourseLearn()"
            >
              Go to course
            </button>

            <button class="wishList">
              <i class="fa-regular fa-heart" style=""></i>
            </button>
          </div>
          <div class="includes">
            <h6>This course includes:</h6>
            <p>
              <i class="fa-solid fa-video"></i>
              <span>{{ this.totalDurationForCourse }} on-demand video</span>
            </p>
            <p>
              <i class="fa-solid fa-tablet-screen-button"></i>
              <span>Access on mobile and TV</span>
            </p>
            <p>
              <i class="fa-solid fa-clock"></i>
              <span>Full lifetime access </span>
            </p>
            <p>
              <i class="fa-solid fa-arrow-down"></i>
              <span>{{ numberFile }} downloadable resources</span>
            </p>
            <p>
              <i class="fa-solid fa-medal"></i>
              <span>Certificate of Completion</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Ratings from "~/components/ratings.vue";
export default {
  layout: "homePageLayout",
  data() {
    return {
      loadingSpinnerShow: false,
      status: "not_pay",
      active: 0,
      avargRating: 0,
      numberRating: 0,
      setRate: 0,
      comment: "",
      title: "",
      subtitle: "",
      org: "",
      lastUpdate: "",
      price: "",
      image: "",
      video: "",
      language: "",
      level: "",
      description: "",
      teacher: "",
      requirements: null,
      objectives: null,
      id: null,
      discount: null,
      // Ratings: [],
      sections: [
        {
          id: null,
          title: null,
          showLectures: false,
          lectures: [],
        },
      ],
      totalDurationForCourse: null,
      numberFile: 0,
    };
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
      getOrderTotalPrice: "payment/getTotalPrice",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapMutations({
      setOrderItems: "payment/setOrderItems",
    }),
    changeActive(value) {
      this.active = value;
    },
    setRatinng(value) {
      this.setRate = value;
    },
    // async addRating() {
    //   let result = await this.sendRequest({
    //     url: "/addRatings",
    //     dataSend: {
    //       token: this.getToken(),
    //       course_id: this.courseId,
    //       rate: this.setRate,
    //       comment: this.comment
    //     }
    //   });
    //   if (result.data.status) {
    //     this.setRate = 0;
    //     this.comment = "";
    //   }
    // },
    showLectures(section) {
      section.showLectures = !section.showLectures;
    },
    calculateDuration(section) {
      let minutes = 0;
      let seconds = 0;
      section.lectures.forEach((lecture) => {
        let lectuerDuration = lecture.lecture_duration.split(":");
        minutes += parseInt(lectuerDuration[0]);
        seconds += parseInt(lectuerDuration[1]);
      });
      minutes += parseInt(seconds / 60);
      seconds = seconds % 60;
      if (minutes > 59) {
        let hours = parseInt(minutes / 60);
        minutes = minutes % 60;
        return hours + "." + Math.round(minutes / 6) + " hours";
      } else if (minutes > 0) {
        return minutes + " minutes";
      }
      return seconds + " seconds";
    },
    async detailsCousrse() {
      let result = await this.sendRequest({
        url: "/detailsCourse",
        dataSend: {
          token: this.getToken(),
          course_slug: this.$route.params.slug,
        },
      });
      console.log(result.data);
      if (result.data.status) {
        let details = result.data.detail;
        this.title = details.course.name;
        this.subtitle = details.course.subtitle;
        this.org = details.organization;
        this.lastUpdate = details.lastUpdate;
        this.price = details.course.price;
        this.image = details.course.image;
        this.video = details.course.video;
        this.language = details.language.language;
        this.level = details.course.level;
        this.description = details.course.description;
        this.teacher = details.course.teacher;
        this.id = details.course.id;
        this.discount = details.course.discount;
        this.avargRating = parseFloat(
          details.course.rating.range_rate.toFixed(1)
        );
        this.numberRating = details.course.rating.numOfRate;
        this.requirements = details.course.requirements.split(",");
        this.objectives = details.course.objectives.split(",");

        details.course.sections.forEach((item) => {
          this.sections.push({
            id: item.id,
            title: item.name,
            showLectures: false,
            lectures: [],
          });
          console.log(item);
        });
        details.lectures.forEach((lecture) => {
          if (lecture.type == "attachment") {
            this.numberFile++;
          }
          this.sections.forEach((section) => {
            if (section.id == lecture.section_id) {
              section.lectures.push(lecture);
            }
          });
        });
        this.totalDurationForCourse = this.calculateDuration(details);
      }
    },
    async checkUserPayStatus() {
      let token = this.getToken();
      let calculateStatus = "free";

      if (token != null) {
        console.log("hygv");
        let result = await this.sendRequest({
          url: "/checkUserPayStatus",
          dataSend: {
            course_slug: this.$route.params.slug,
            user_id: token.tokenable_id,
          },
        });
        if (result.data.status) {
          if (result.data.userStatus == "register") {
            calculateStatus = "register";
          } else if (this.price > 0) {
            calculateStatus = "not_pay";
          }
        }
      } else if (this.price > 0) {
        calculateStatus = "not_pay";
      }
      this.status = calculateStatus;
    },
    goToPayments() {
      this.setOrderItems([
        {
          id: this.id,
          price: this.price,
          name: this.title,
          image: this.image,
          discount: this.discount,
        },
      ]);
      this.$router.push({
        name: "payments-course-courseId",
        params: {
          courseId: this.$route.params.slug,
        },
      });
    },
    goToCourseLearn() {
      this.$router.push({
        name: "course-learn-slug",
        params: {
          slug: this.$route.params.slug,
        },
      });
    },
    async enrollFree() {
      let result = await this.sendRequest({
        url: "/enrollCourseFree",
        dataSend: {
          user_id: this.getToken().tokenable_id,
          course_id: this.id,
        },
      });
      if (result.data.status) {
        this.$router.push({
          name: "course-learn-slug",
          params: { slug: this.$route.params.slug },
        });
      }
    },
  },
  async mounted() {
    this.loadingSpinnerShow = true;
    await this.detailsCousrse();
    let video = this.$refs.videoSource;
    video.load();
    this.loadingSpinnerShow = false;
    await this.checkUserPayStatus();
  },
  components: { Ratings },
};
</script>

<style scoped>
.modal-body i {
  color: gold;
  margin: 3px;
  padding: 3px;
  cursor: pointer;
}

.rating-star-rating {
  position: absolute;
  top: 0;
  left: 0px;
  /* width: 80%; */
  /* overflow: hidden; */
  white-space: nowrap;
  /* unicode-bidi: bidi-override; */
}

.rate span,
.rate i {
  font-size: 24px;
  margin-left: 5px;
  color: #2f2f35;
}

.avatar {
  border-radius: 50%;
}

h5 {
  margin-top: 10px;
  font-weight: bold;
  color: #2f2f35;
}

.user-rate {
  margin-bottom: 10px;
  margin-top: 10px;
}

.user-rate i {
  font-size: 14px;
  width: 12px;
  height: 12px;
}

.comment-time {
  margin: 15px;
  color: #6a6f73;
}

.users-comments {
  border: 1px solid #e0e4e6;
  /* padding: 25px 15px; */
}

.comment-lable {
  color: #0c2e60;
  font-size: 24px;
}

.submit-comment:hover {
  color: #2f2f35;
}

.reviews {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #212a39;
}

.reviews:hover {
  background: #eff5f7;
}

.container {
  font-family: "Roboto", sans-serif;
  margin-bottom: 30px;
  /* max-width: 85% !important; */
}

.video {
  /* height: 150px; */
  width: 100%;
}

.information h3 {
  font-size: 36px;
  line-height: 30px;
  color: #0c2e60;
  font-weight: 600;
  margin-bottom: 20px;
}

.information {
  border: 1px solid #e0e4e6;
  border-radius: 3px;
  padding: 25px;
}

.information p {
  color: #16182d;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  margin-bottom: 20px;
}

.details span {
  display: inline-block;
  position: relative;
  color: #212a39;
  /* margin-right: 7px; */
  padding-right: 10px;
  line-height: 1;
  font-size: 14.5px;
}

.details span a {
  display: inline-block;
  position: relative;
  color: #790ec0;
  line-height: 1;
}

.details div i {
  color: #f98f05;
}

.buy {
  border: 1px solid #e0e4e6;
  color: white;
  font-size: 18px;
  padding: 10px 25%;
  background: linear-gradient(90deg, #790ec0, #bd95d8);
}

.buy:hover {
  opacity: 0.8;
}

.wishList:hover {
  background: #eff5f7;
}

.wishList {
  font-size: 23px;
  border: 1px solid black;
  padding: 4px 15px 7.8px;
}

.includes {
  text-align: left;
  margin: 25px 30px;
}

.includes h6 {
  margin-bottom: 15px;
  font-weight: 600;
}

.includes p {
  margin-top: 10px;
}

.includes p i {
  margin-right: 17px;
  color: #383939;
}

.includes p span {
  color: #5d5e5f;
  font-size: 15px;
}

.includes2 p {
  color: #16182d;
  font-family: "Roboto", sans-serif;
  margin-left: 5px;
}

.curriculum-overview a {
  margin: 0;
  width: 33.333%;
  text-align: center;
  padding: 15px;
  color: black;
  border-bottom: 1px solid #d3d3d4;
  background: #f7f7f7;
  cursor: pointer;
  text-decoration: none;
}

.selectActive {
  background: linear-gradient(90deg, #790ec0, #bd95d8) !important;
  color: white !important;
}

.description,
.requirement,
.includes2 {
  padding: 20px 25px 0px;
}

.description h4,
.requirement h4 {
  margin-bottom: 12px;
  color: #0c2e60;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

.requirement div p i,
.includes2 p i {
  margin-right: 15px;
}

.description p,
.requirement p,
.includes2 p {
  color: #16182d;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
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
  border-color: orange transparent;
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