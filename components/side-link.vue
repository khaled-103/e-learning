<template>
  <li class="side-link">
    <a href="#" class="d-flex align-items-center text-decoration-none">
      <i :class="icon"></i>
      <span class="links_name text-white">{{ data }}</span>
    </a>
    <i class="fa fa-caret-down"></i>
  </li>
</template>

<script>
export default {
  props: {
    data: String,
    icon:String
  },
};
</script>

<style scoped>
.fa-caret-down{
  position: absolute;
  top: 15px;
  right: 0;
  cursor: pointer;
}
.side-link {
  position: relative;
  list-style: none;
  height: 50px;
}

.side-link a {
  height: 100%;
  width: 100%;
  transition: all 0.4s ease;
}
.side-link a:hover,
.side-link a:active {
  background-color: #19428f;
}
.side-link i {
  min-width: 60px;
  text-align: center;
  font-size: 18px;
  color: white;
}

.side-link a .links_name {
  font-size: 15px;
  font-weight: 400;
}
</style>
