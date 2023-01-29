<template>
  <div>
    <multiselect
      @input="getSelected()"
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Choose Tags"
      label="name"
      track-by="name"
      :preselect-first="true"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span
          class="multiselect__single"
          v-if="values.length &amp;&amp; !isOpen"
        >{{ values.length }} options selected</span>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.min.css';


export default {
  components: {
    Multiselect
  },
  props: {
    tags: Array,
    selected: Array,
  },
  watch: {
    tags: function(newVal) {
      this.value = []
      this.options = newVal
    }
  },
  data() {
    return {
      value: [],
      options: this.tags
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
      };
      this.options.push(tag);
      this.value.push(tag);
      console.log(this.value);
    },
    async getSelected(){
      this.$emit('getSelected', {
        'selectedData': this.value
      })
    }
  },
  mounted(){
    this.value = this.selected
  }
};
</script>

<style>
.multiselect__tag {
  background-color: rgb(123, 123, 238);
}
</style>
