<template>
  <div>
    <nav class="py-2 d-flex bg-white">
      <div class="d-flex col-lg-8 col-12 justify-content-between">
        <div class="px-2 mt-2 d-lg-none d-block" @click="$emit('show-side-bar')">
          <i class="fa fa-bars pointer"></i>
        </div>
        <h4 @click="$router.push({name:'index'})" class="logo pointer mt-2">
          <i class="fa-solid fa-graduation-cap" style="color: #a435f0"> E</i
          >-learning
        </h4>
        <div href="" class="px-3 cat pointer d-lg-block d-none mt-2">Categories</div>
        <div class="serachHolder mx-lg-0 mx-2 flex-lg-grow-1 d-sm-block d-none">
          <input
            type="text"
            placeholder="Search for anything"
            class="form-control"
            v-model="inputSearch"
            @input="suggestions()"
            @keyup.enter="search()"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
          <hint-search @setHintInput="(value) => {inputSearch = value}" :hintShown="suggestionsData" v-show="suggestionsData.length > 0"/>
        </div>
        <div class="d-sm-none d-block pointer" @click="$emit('show-search-bar')">
          <i  style="font-size:16px;"  class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="col-4 d-lg-block d-none">
        <div class="text-end paddingRigth25 mt-2">
          <div v-show="!getToken()">
          <nuxt-link :to="{ name: 'user-login' }" class="pointer button">Log in</nuxt-link>
          <nuxt-link :to="{ name: 'user-register' }" class="btnDark pointer button">Sign up</nuxt-link>

          <!-- <button class="pointer">Log in</button>
          <button class="btnDark pointer">Sign up</button> -->
          </div>
          <div v-show="getToken()">
            <span style="color: #555; font-weight: 500; padding-right: 10px"
              >My learning</span
            >
            <i class="fa-regular fa-heart"></i>
            <i class="fa-regular fa-bell"></i>
            <span class="logout">Logout</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import hintSearch from '@/components/HomePage/hintSearch.vue';
import { mapActions, mapGetters } from "vuex";
export default {
  emits:['show-side-bar'],
  data(){
    return{
      inputSearch:'',
      searchData: "",
      suggestionsData: [],
      timeout: null,
    }
  },
  props:{
    coursesInfoForHint:Array
  },
  methods:{
    ...mapActions({
      sendRequest:'auth/sendRequest'
    }),
    ...mapGetters({
      getToken:'auth/getToken'
    }),
    suggestions() {
      if (this.inputSearch.length == 0) {
        this.suggestionsData = [];
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.suggestionsData = [];
      }
      this.timeout = setTimeout(() => {
        console.log('enter');
        this.isSearching = false;
        if (this.inputSearch.length > 1) {
          for (let index = 0; index < this.coursesInfoForHint.length; index++) {
            let name = this.coursesInfoForHint[index].name;
            if(name.toLowerCase().includes(this.inputSearch.toLowerCase())){
              this.suggestionsData.push({
                name: name
              });
              if(this.suggestionsData.length >= 10)
                break;
            }
          }
        }
      }, .7 * 1000);
    },
    async search() {
      this.suggestionsData = [];
      this.$router.push({ name: 'searchPage-search', params: { search: this.inputSearch } });
      this.inputSearch = '';
    }
  },
  components:{
    hintSearch
  },

};
</script>

<style scoped>
nav {
  box-shadow: 1px 1px 6px #888a8b;
  max-height: 63px;
}
.serachHolder {
  position: relative;
}
.serachHolder input {
  padding: 10px 0;
  padding-left: 40px;
  border: 1px solid black;
  border-radius: 30px;
  background: #f7f9fa;
  box-shadow: none !important;
}

.serachHolder i {
  position: absolute;
  top: 0px;
  left: 0;
  font-size: 15px;
  color: #888a8b;
}
.logo {
  margin-left: 6px;
}
.cat {
  padding-top: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #212529;
}
.pointer {
  cursor: pointer;
}
.button {
  border: 1px solid #1c1d1f;
  padding: 8px 15px;
  border-radius: 0;
  font-weight: 700;
  text-decoration: none;
  color: black;
}
.btnDark {
  background: #212529;
  color: white;
}
button:hover {
  background: #f7f9fa;
}
.btnDark:hover {
  background: black;
}
i.fa-bell,
i.fa-heart {
  padding: 0;
  font-size: 22px;
  font-weight: 500;
  padding: 7px 10px;
}
i.fa-bars{
  font-size: 19px;
}
.logout {
  padding-left: 10px;
  text-decoration: underline;
  font-weight: 500;
}
.paddingRigth25{
  padding-right: 25px;
}
</style>