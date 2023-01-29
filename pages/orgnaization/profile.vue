<template>
  <div>
    <div class="row justify-content-between my-4">
      <div class="col-auto mt-2">
        <nuxt-link :to="{name:'orgnaization-dashboard'}">DASHBOARD</nuxt-link>
        <span class="text-white">/PROFILE</span>
      </div>
    </div>
    <h2 class="text-white text-center mb-5">
      MY Profile <i class="far fa-id-card"></i>
    </h2>
    <div class="sections-header row justify-content-start">
      <h6
        :class="[
          'section-header',
          'col-lg-auto col-4',
          'pb-2',
          'px-3',
          'pointer',
          { active: hasActiveClass[0] },
        ]"
        @click="changeSectionShow(0)"
      >
        Basic Info
      </h6>
      <h6
        :class="[
          'section-header',
          'col-lg-auto col-3',
          'pb-2',
          'px-3',
          'pointer',
          { active: hasActiveClass[1] },
        ]"
        @click="changeSectionShow(1)"
      >
        Password
      </h6>
      <h6
        :class="[
          'section-header',
          'col-lg-auto col-5',
          'pb-2',
          'px-3',
          'pointer',
          { active: hasActiveClass[2] },
        ]"
        @click="changeSectionShow(2)"
      >
        Additional Info
      </h6>
      <hr />
    </div>
    <div class="section-content mt-4">
      <div class="text-center" v-show="spinnerLoadShow">
        <h6>
          Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
        </h6>
      </div>
      <profile-basic-info
        v-if="basicInfo.orgProfileInfo"
        :countries="basicInfo.countries"
        :orgProfileInfo="basicInfo.orgProfileInfo"
        v-show="sectionShowed == 0"
      />
      <profile-change-password v-show="sectionShowed == 1" />
      <profile-additional-info
        v-if="basicInfo.orgProfileInfo"
        :orgProfileInfo="basicInfo.orgProfileInfo"
        v-show="sectionShowed == 2"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashBoardLayout",
  data() {
    return {
      sectionShowed: 0,
      hasActiveClass: [true, false, false],
      basicInfo: {
        countries: [],
        orgProfileInfo: null,
      },
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
    changeSectionShow(sectionNumber) {
      this.sectionShowed = sectionNumber;
      this.alertActiveClasse(sectionNumber);
    },
    alertActiveClasse(sectionNumber) {
      this.hasActiveClass = [false, false, false];
      this.hasActiveClass[sectionNumber] = true;
    },
    async getCountries() {
      let result = await this.sendRequest({
        url: "/getCountries",
        dataSend: {},
      });
      console.log(result.data);
      if (result.data.status) {
        this.basicInfo.countries = result.data.countries;
      }
    },
    async getOrgProfileInfo() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/getProfileInfo",
        dataSend: {
          token: this.getToken(),
        },
      });
      console.log(result.data);
      if (result.data.status) {
        this.basicInfo.orgProfileInfo = result.data.orgProfileInfo;
      } else {
        this.$router.push("/errorPage");
      }
      this.spinnerLoadShow = false;
    },
  },
  async mounted() {
    await this.getOrgProfileInfo();
    await this.getCountries();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.sections-header {
  position: relative;
}
a {
  color: #a4a4b2;
  text-decoration: none;
}
hr {
  position: absolute;
  bottom: -8px;
  color: white;
}
.section-header {
  /* color: #687484; */
  color: white;
  text-align: center;
}
.section-header:hover {
  border-bottom: 2.5px solid #0258e3;
}
.active {
  /* color: #42bbff; */
  border-bottom: 2.5px solid #0258e3;
}
</style>