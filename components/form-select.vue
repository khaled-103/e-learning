<template>
  <div class="form-group my-4">
    <!-- <p>{{ data }}</p> -->
    <label for=""> Select {{ label }}:</label>
    <select
      aria-label="Default select example"
      :name=name
      :id=id
      class="form-control"
      style="border: 1px black solid;border-radius: 0;box-shadow: none;height: 43px;"
      v-model="data1"
      v-on:change="dataChange"
      value=value
      :disabled="action === 'Show'"
    >
      <option disabled selected value="">Select from menue</option>
      <option class="py-4 px-3" v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data(){
  return{
    data1:this.action === 'Show' ? this.value:"",
  }
 },
  props:{
    name:String,
    id:String,
    label:String,
    // data:String,
    value:String,
    action:String,
    options:[]
  },
  methods:{
    dataChange(){
      this.$emit('change_data',this.data1, this.name)
    }
  }
};
</script>

<style>

</style>
