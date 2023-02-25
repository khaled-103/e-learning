<template>
  <div class="searchBar">
    <div class="searchBarContent">
      <div class="serachHolder">
        <input type="text" placeholder="Search for anything" class="form-control" v-model="inputSearch"
          @input="suggestions()" @keyup.enter="search()" />
        <i class="fa-solid fa-magnifying-glass"></i>
        <i @click="$emit('hide-search-bar')" class="fa fa-xmark pointer"></i>
        <hint-search :hintShown="suggestionsData" v-show="suggestionsData.length > 0" />
      </div>
    </div>
  </div>
</template>

<script>
import hintSearch from '@/components/HomePage/hintSearch.vue';
import { mapActions } from 'vuex';
export default {
  emits: ["hide-side-bar"],
  props: {
    coursesInfoForHint: Array
  },
  data() {
    return {
      inputSearch: '',
      suggestionsData:[]
    }
  },
  components: {
    hintSearch
  },
  methods: {
    ...mapActions({
      sendRequest: 'auth/sendRequest'
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
            if (name.toLowerCase().includes(this.inputSearch.toLowerCase())) {
              this.suggestionsData.push({
                name: name
              });
              if (this.suggestionsData.length >= 10)
                break;
            }
          }
        }
      }, .4 * 1000);
    },
    async search() {
      this.suggestionsData = [];
      this.$router.push({ name: 'homePagee-searchPage-search', params: { search: this.inputSearch } });
      this.$emit('hide-search-bar');
    }
  }
};
</script>

<style scoped>
.serachHolder {
  position: relative;
}

.serachHolder input {
  padding: 10px 0;
  padding-left: 40px;
  border: 1px solid black;
  border-radius: 0px;
  background: #f7f9fa;
  box-shadow: 1px 1px 6px #888a8b;
}

.serachHolder i.fa-magnifying-glass {
  position: absolute;
  top: 0px;
  left: 0;
  font-size: 15px;
  color: #888a8b;
}

.searchBar {
  background: rgba(0, 0, 0, 0.7);
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.searchBarContent {
  background: white;
  padding: 15px 10px;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.pointer {
  cursor: pointer;
}

i.fa-xmark {
  position: absolute;
  top: 12px;
  right: 10px;
  font-size: 20px;
  color: #1d1e1f;
  color: #1d1e1f;
}
</style>