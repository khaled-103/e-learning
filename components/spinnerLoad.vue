<template>
  <span
    class="spinner-border text-info spinner-border-sm"
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