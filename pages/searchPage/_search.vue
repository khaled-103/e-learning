<template>
  <div>
    <page-loading-spinner v-if="!resultReady" />
    <div v-else>
      <coursesGroup :courses="courses" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import coursesGroup from "~/components/HomePage/coursesGroup.vue";

export default {
  layout: "homePageLayout",
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
  },
  async mounted() {
    let result = await this.sendRequest({
      url: "/search",
      dataSend: {
        name: this.$route.params.search,
      },
    });
    if (result.data.status) {
      this.courses = result.data.course;
    }
    this.resultReady = true;
  },
};
</script>

<style scoped>


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
