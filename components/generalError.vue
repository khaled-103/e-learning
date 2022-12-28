<template>
  <p
    v-show="showGeneralError"
    class="bg-danger my-2 p-2 text-white"
    style="border-radius: 10px"
  >
    <i class="fa-solid fa-circle-xmark text-white mx-2"></i>{{ generalError }}
  </p>
</template>

<script>
export default {
  props: {
    showGeneralError: null,
    generalError: null,
  },
};
</script>

<style>
</style>