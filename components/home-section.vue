<template>
    <div class="home-section">
        <navbar/>
        <div class="mainContent p-3">
          <logout-button source="orgnaization"/>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style>
.home-section {
  position: relative;
  background: #f5f5f5;
  min-height: 100vh;
  width: calc(100% - 240px);
  left: 240px;
  transition: all 0.5s ease;
}

@media (max-width: 767px){
   .home-section{
    width: 100%;
    left:0
   }
}
</style>
