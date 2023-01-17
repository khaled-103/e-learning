<template>
  <span
    class="spinner-border text-warning spinner-border-sm"
    style="font-size:18px;"
    v-show="spinnerLoadShow"
  ></span>
</template>

<script>
export default {
  props:{
    spinnerLoadShow:null
  }
};
</script>

<style>
</style>