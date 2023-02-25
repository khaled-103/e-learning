<template>
  <div style="" class="border border-dark mx-3  bg-white">
    <div class="d-flex border-bottom border-dark">
      <a @click="shown = 0"  class="list-group-item item_header" style="border-right: 1px black solid;">information Course</a>
      <a @click="shown = 1" class="list-group-item item_header" style="border-right: 1px black solid;">Lecture file</a>
      <a  class="list-group-item item_header ">publish</a>
    </div>
    <!-- <information-couse /> -->
    <formCourse action1='Show' v-show="shown == 0"/>
    <add-curriculum v-show="shown == 1"/>
    <!-- <formCourse action='Update'/> -->
  </div>
</template>

<script>
export default {
  layout: "dashBoardLayout",
  data(){
    return {
      shown :0,
      filePreview: '',
      fileName: ''
    }
  }
}
</script>

<style scoped>
.item_header {
  width: 33.33%;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  background-color: rgb(211, 209, 240);
  padding: 15px;
}

.item_header:hover , .item_header:active {
  background-color:#15397c;
  color: white;
  text-decoration: none;
}
</style>