<template>
  <div>
    <nav class="container-fluid" style="">
      <ul
        class="d-flex justify-content-between"
        style="list-style: none; padding-left: 0"
      >
        <li class="mt-2 d-flex">
          <div class="" style="position:relative;border">
            <input
              type="text"
              id="myInput"
              placeholder="Search here.."
              title="Type in a name"
            />
            <i
              class="fa fa-search text-white"
              style="position: absolute; left: 12px; top: 19px; font-size: 18px"
            ></i>
          </div>
        </li>
        <li>
          <ul class="d-flex" style="list-style: none">
            <li class="mt-3">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-white dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style="background-color: white; color: black"
                >
                  English <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" style="">
                  <li><a class="dropdown-item" href="#">English</a></li>
                  <li><a class="dropdown-item" href="#">Arabic</a></li>
                </ul>
              </div>
            </li>
            <li class="mt-2">
              <a href="#"><i class="text-white fa-regular fa-bell"></i></a>
            </li>
            <li class="mt-2">
              <img
                @click="goToProfile"
                class="pointer d-md-block d-none"
                :src="profileImage"
                alt=""
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      domain: this.getDomain(),
      profileImage: null,
    };
  },
  methods: {
    ...mapGetters({
      getDomain: "auth/getDomain",
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    goToProfile() {
      this.$router.push("/orgnaization/profile");
    },
  },

  async mounted() {
    let result = await this.sendRequest({
      url: "/orgnaization/getProfileImage",
      dataSend: {
        id: this.getToken().tokenable_id,
      },
    });
    if (result.data.status) {
      this.profileImage = result.data.orgProfileInfo.image;
    }
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.fa-magnifying-glass,
.fa-bell {
  padding: 16px;
  font-size: 23px;
}

nav img {
  vertical-align: middle;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

#myInput {
  background-color: transparent;
  border: 1px solid #73719a;
  border-radius: 15px;
  background-position: 10px 12px;
  font-size: 16px;
  padding: 10px 20px 10px 40px;
  color: white;
  margin-top: 5px;
}
</style>