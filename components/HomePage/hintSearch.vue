<template>
  <div class="hintSearch">
    <ul class="pt-3">
      <li :key="hint.name" v-for="hint in hintShown" @click="$emit('setHintInput',hint.name)">
        <i class="fa fa-search"></i>
        {{ hint.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    hintShown:Array
  }
}
</script>

<style scoped>
ul {
  padding-left: 0;
}

.hintSearch {
  width: 100%;
  position: absolute;
  top: 50px;
  z-index: 1;
  background: white;
  border: 1px solid #888b88;
}

li {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px 0;
  cursor: pointer;
}
li:hover{
  background: #efefef;
}

i.fa-search {
  font-size: 15px;
  margin-left: 14px;
  margin-right: 10px;
}
</style>