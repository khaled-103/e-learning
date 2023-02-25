<template>
  <div>
    <div class="row justify-content-between my-4">
      <div class="col-auto mt-2">
        <nuxt-link   to="/orgnaization/dashboard">DASHBOARD</nuxt-link>
        <span  class="text-white">/ COURSES LIST</span>
      </div>
      <button
        @click="$router.push({ name: 'orgnaization-addCourse' })"
        class="btn btn-sm btn-light col-auto"
      >
        New Course
      </button>
    </div>
    <div class="">
      <h2 class="text-center mb-5 text-white">
        Courses List <i class="fa-solid fa-graduation-cap"></i>
      </h2>
      <div class="row justify-content-center">
        <div class="mb-2 col-6 col-lg-3">
          <div class="select">
            <select
              title="rating filter"
              @change="filterCourses()"
              v-model="rating"
              name="format"
              id=""
            >
              <option value="">Rating</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars or above</option>
              <option value="3">3 stars or above</option>
              <option value="2">2 stars or above</option>
              <option value="1">1 star</option>
            </select>
          </div>
        </div>
        <div class="mb-2 col-6 col-lg-3">
          <div class="select">
            <select @change="filterCourses()" v-model="status" name="" id="">
              <option value="">Status</option>
              <option value="Publish">Published</option>
              <option value="not Publish">Not Published</option>
            </select>
          </div>
        </div>
        <div class="mb-2 col-6 col-lg-3">
          <div class="select">
            <select @change="sortCourses()" v-model="sort" name="" id="">
              <option disabled value="">Sort by</option>
              <option value="latest">Latest</option>
              <option value="rating">Rating</option>
              <option value="subscribers">Subscribers</option>
              <option value="price">price</option>
            </select>
          </div>
        </div>
        <div class="mb-2 col-6 col-lg-3">
          <div class="select">
            <select @change="orderCourses()" v-model="ordered" name="" id="">
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-between mt-4"
        style="position:relative;border"
      >
        <input
          type="text"
          v-model="searchInput"
          id="myInput"
          @keyup="search()"
          placeholder="Search here.."
          title="Type in a name"
          style="flex-basis: 75%"
        />
        <i
          class="fa fa-search text-white"
          style="position: absolute; left: 10px; top: 15px; font-size: 17px"
        ></i>
        <button
          @click="reset()"
          class="btn btn-danger btn-sm mt-1"
          style="width: auto; height: 35px"
        >
          Reset <i class="fa fa-refresh"></i>
        </button>
      </div>
      <div class="my-2 row justify-content-center">
        <div class="text-center" v-show="spinnerLoadShow">
          <h6 class="text-white" >
            Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
          </h6>
        </div>
        <table v-show="!spinnerLoadShow">
          <thead>
            <tr style="color: white; border-bottom: 1px solid white;">
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Subscribe</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody class="">
            <tr :key="course.id" v-for="(course, index) in showingList">
              <td>{{ index + 1 }}</td>
              <td>
                <nuxt-link
                  class="mt-1 courseName"
                  :to="{
                    name: 'orgnaization-courses-id',
                    params: { id: course.id },
                  }"
                  >{{ course.name }}</nuxt-link
                >
              </td>
              <td>{{ course.status.status }}</td>
              <td>{{ course.price }}$</td>
              <td>{{ course.subscribe.numOfSubscribe }}</td>
              <td>
                <i
                  :key="n"
                  v-for="n in parseInt(course.rating.range_rate)"
                  class="fa fa-star text-warning"
                ></i>
                <i v-show="parseInt(course.rating.range_rate) == 0">--</i>
              </td>
            </tr>
            <tr>
              <td colspan="6" v-show="showingList.length == 0">
                No Course found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "dashBoardLayout",
  data() {
    return {
      searchInput: "",
      rating: "",
      status: "",
      sort: "",
      ordered: "asc",
      coursesList: [],
      filteredList: [],
      showingList: [],
      spinnerLoadShow: false,
    };
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    orderCourses() {
      console.log('order exec');
      this.showingList = Array.from(this.filteredList);
      if (this.ordered == "des") this.showingList.reverse();
    },
    sortCourses() {
      console.log('sort exec');
      this.filteredList.sort((a, b) => {
        if (this.sort == "price") {
          return parseFloat(a.price) >= parseFloat(b.price) ? 1 : -1;
        }
        if (this.sort == "rating") {
          return a.rating.rate >= b.rating.rate ? 1 : -1;
        }
        if (this.sort == "subscribers") {
          return parseInt(a.subscribe.numOfSubscribe) >=
            parseInt(b.subscribe.numOfSubscribe)
            ? 1
            : -1;
        }
        return a.created_at >= b.created_at ? -1 : 1;
      });
      this.orderCourses();
    },
    search() {
      console.log('serach exec');
      this.showingList = this.filteredList.filter((value) => {
        return value.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },
    filterCourses() {
      console.log('filter exec');
      if (this.status.length == 0 && this.rating.length == 0) {
        this.filteredList = Array.from(this.coursesList);
        this.showingList = Array.from(this.filteredList);
        if (this.sort.length > 0) this.sortCourses();
        return;
      }
      this.filteredList = this.coursesList.filter((value) => {
        let check = true;
        if (this.status.length > 0)
          check =
            value.status.status.toLowerCase() == this.status.toLowerCase();
        if (this.rating.length > 0)
          check =
            check &&
            (this.rating == 1
              ? value.rating.rate == this.rating
              : value.rating.rate >= this.rating);
        if (check) return value;
      });
      this.sortCourses();
    },
    reset() {
      this.searchInput = "";
      this.status = "";
      this.rating = "";
      this.sort = "latest";
      this.filteredList = Array.from(this.coursesList);
      this.showingList = Array.from(this.coursesList);
      this.ordered = "asc";
    },
  },
  async mounted() {
    this.spinnerLoadShow = true;
    let result = await this.sendRequest({
      url: "/orgnaization/allCourses",
      dataSend: {
        token: this.getToken(),
      },
    });
    if (result.data.status) {
      console.log(result.data.courses);
      this.coursesList = result.data.courses;
      this.spinnerLoadShow = false;
    } else {
      return this.$router.push("/error");
    }
    this.filteredList = Array.from(this.coursesList);
    this.showingList = Array.from(this.coursesList);
  },
};
</script>

<style scoped>
table {
  border: none !important;
  color: #a4a4b2;
  margin: 15px 0 15px 22px;
}
td {
  padding: 6px 0;
}

select {
  width: 100%;
  background: transparent;
  border: 1px solid #73719a;
  color: white;
  padding: 4px 10px;
}

select option {
  color: white;
  padding: 4px;
  background: #1d1d41;
}

/* Other styles*/
tr{
  font-size: 14px;
}
a {
  color: #a4a4b2;
  text-decoration: none;
}
a.courseName{
  font-weight: 700;
}

#myInput {
  background-color: transparent;
  border:1px solid #73719a ;
  border-radius: 15px;
  background-position: 10px 12px;
  font-size: 14px;
  padding: 8px 20px 8px 40px;
  margin-bottom: 12px;
  color: white;
}

@media (max-width: 769px) {
  table {
    padding: 4px;
  }
  table th {
    font-weight: 400;
  }
  table tr ,a {
    font-size: 12px !important;
  }

}
</style>