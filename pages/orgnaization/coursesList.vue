<template>
  <div>
    <div class="row justify-content-between my-4">
      <div class="col-auto mt-2">
        <nuxt-link to="/index">Dashboard</nuxt-link>
        <span>/CourseLists</span>
      </div>
      <button @click="$router.push({name:'orgnaization-addCourse'})" class="btn btn-sm btn-outline-dark col-auto p-2">Add New Course</button>
    </div>
    <div class="">
      <h2 class="text-center mb-5">
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
      <div class="d-flex justify-content-between">
        <input
          type="text"
          v-model="searchInput"
          id="myInput"
          @keyup="search()"
          placeholder="Search here.."
          title="Type in a name"
          style="flex-basis: 80%"
        />
        <button
          @click="reset()"
          class="btn btn-danger mt-2"
          style="width: 70px; height: 40px"
        >
          Reset
        </button>
      </div>
      <div class="my-2 row justify-content-center">
        <div class="text-center" v-show="spinnerLoadShow">
          <h6>Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow"/></h6>
        </div>
        <table v-show="!spinnerLoadShow" class="bg-white table table-bordered">
          <thead>
            <tr>
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
              <nuxt-link
                class="mt-1 text-dark d-block"
                style="
                  background: none;
                  font-weight: 500;
                  text-decoration: underline;
                "
                :to="{name:'orgnaization-courses-id',params: { id: course.id }}"
                ><td>{{ course.name }}</td></nuxt-link
              >
              <td>{{ course.status.status }}</td>
              <td>{{ course.price }}$</td>
              <td>{{ course.subscribe.numOfSubscribe }}</td>
              <td>
                <i
                  :key="n"
                  v-for="n in parseInt(course.rating.rate)"
                  class="fa fa-star text-warning"
                ></i>
                <i v-show="parseInt(course.rating.rate) == 0">--</i>
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
import { mapGetters,mapActions } from "vuex";
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
      spinnerLoadShow:false
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
      this.showingList = Array.from(this.filteredList);
      if (this.ordered == "des") this.showingList.reverse();
    },
    sortCourses() {

      this.filteredList.sort((a, b) => {
        if (this.sort == "price") {
          return parseFloat(a.price) >= parseFloat(b.price) ? 1 : -1;
        }
        if (this.sort == "rating") {
          return a.rating.rate >= b.rating.rate ? 1 : -1;
        }
        if (this.sort == "subscribers") {
          return parseInt(a.subscribe.numOfSubscribe) >= parseInt(b.subscribe.numOfSubscribe) ? 1 : -1;
        }
        return a.created_at >= b.created_at ? -1 : 1;
      });
      this.orderCourses();
    },
    search() {
      this.showingList = this.filteredList.filter((value) => {
        return value.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },
    filterCourses() {
      if (this.status.length == 0 && this.rating.length == 0) {
        this.filteredList = Array.from(this.coursesList);
        this.showingList = Array.from(this.filteredList);
        if (this.sort.length > 0) this.sortCourses();
        return;
      }
      this.filteredList = this.coursesList.filter((value) => {
        let check = true;
        if (this.status.length > 0)
          check = value.status.status.toLowerCase() == this.status.toLowerCase();
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
      url:'/orgnaization/allCourses',
      dataSend:{
        token:this.getToken()
      }
    });
    if(result.data.status){
      console.log(result.data.courses);
      this.coursesList = result.data.courses;
      this.spinnerLoadShow = false;
    }else{
        return this.$router.push('/error');
    }
    // this.coursesList = [
    //   {
    //     id: 1,
    //     name: "unity3d",
    //     status: "published",
    //     price: "60",
    //     rating: 5,
    //     subscribers: 120,
    //     createdAt: new Date("2022-12-30"),
    //   },
    //   {
    //     id: 2,
    //     name: "laravel",
    //     status: "Not published",
    //     price: "10",
    //     rating: 2,
    //     subscribers: 10,
    //     createdAt: new Date("2022-12-28"),
    //   },
    //   {
    //     id: 3,
    //     name: "vue js",
    //     status: "Not Published",
    //     price: "120",
    //     rating: 4,
    //     subscribers: 50,
    //     createdAt: new Date("2022-12-26"),
    //   },
    //   {
    //     id: 4,
    //     name: "nuxtjs",
    //     status: "published",
    //     price: "30",
    //     rating: 3,
    //     subscribers: 69,
    //     createdAt: new Date("2022-12-21"),
    //   },
    // ];
    this.filteredList = Array.from(this.coursesList);
    this.showingList = Array.from(this.coursesList);
  },
};
</script>

<style scoped>
table,
input,
.select {
  border: 1px solid #ddd !important;
}
select {
  /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: black;
  background-color: white;
  background-image: none;
  cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  height: 2em;
  border-radius: 0.25em;
  overflow: hidden;
  box-shadow: 0px 0px 1px #0f0c29;
  padding-left: 0;
  margin-right: 4px;
}
/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em;
  background-color: white;
  transition: 0.25s all ease;
  pointer-events: none;
  color: black;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}

/* Other styles*/

a {
  font-weight: bold;
  color: #34495e;
  text-decoration: none;
  padding: 0.25em;
  border-radius: 0.25em;
  background: white;
}

#myInput {
  background-image: url("https://www.w3schools.com/css/searchicon.png");
  background-position: 10px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

@media (max-width: 850px) {
  table {
    padding: 4px;
  }
  table th {
    font-weight: 600;
  }
  table tr {
    font-size: 14px;
  }
}
</style>