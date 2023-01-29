<template>
  <div class="sidbar">
    <logo-details />
    <side-links />
  </div>
</template>

<script>
export default {};
</script>

<style>
.sidbar {
  position: fixed;
  height: 100%;
  width: 230px;
  background: #1d1d41;
  /* background: linear-gradient(to bottom,#19428f,#010816)linear-gradient(to bottom,#010816,#19428f,#010816); */
  transition: all 0.5s ease;
}

@media (max-width: 767px) {
  .sidbar {
    margin-left: -240px;
    min-height: 100vm;
    z-index: 2;
    padding: 0;
  }
}
</style>
