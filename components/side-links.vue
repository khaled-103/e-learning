<template>
  <ul class="side-links">
    <li class="side-link ">
      <nuxt-link :to="{name:'orgnaization-dashboard'}" class="d-flex align-items-center text-decoration-none">
        <i class="fa-solid fa-house"></i>
        <span class="links_name text-white">Dashborad</span>
      </nuxt-link>
    </li>

    <li class="side-link">
      <nuxt-link :to="{name:'orgnaization-profile'}" class="d-flex align-items-center text-decoration-none">
        <i class="far fa-id-card"></i>
        <span class="links_name text-white">My Profile</span>
      </nuxt-link>
    </li>
    <li @click="showDropDownMenue($event)" class="side-link">
      <a class="d-flex align-items-center text-decoration-none">
        <i class="fa-solid fa-graduation-cap"></i>
        <span class="links_name text-white">Courses</span>
        <i class="fa fa-caret-down"></i>
      </a>
    </li>
    <div class="dropdown-container">
      <!-- <span class="" style="color:gray;font-size:13px: marin-left:30px">details : </span> -->
      <nuxt-link style="font-size:16px;" :to="{name:'orgnaization-coursesList'}">CoursesList</nuxt-link>
      <nuxt-link style="font-size:16px;" :to="{name:'orgnaization-addCourse'}">AddCourse</nuxt-link>
    </div>
    <li class="side-link">
      <a class="d-flex align-items-center text-decoration-none">
        <i class="fa-regular fa-font-awesome"></i>
        <span class="links_name text-white">Statistics</span>
      </a>
    </li>
    <logout-button />

  </ul>
</template>

<script>
export default {
  methods: {
    showDropDownMenue($evnet) {
      let target = $evnet.currentTarget;

      let dropMenue = target.nextElementSibling;
      target.classList.toggle("active");

      if (dropMenue.style.opacity == "1") {
        dropMenue.style.opacity = 0;
        dropMenue.style.height = 0;
      } else {
        dropMenue.style.opacity = 1;
        dropMenue.style.height = "100%";
      }
    },
  },
};
</script>

<style scoped>
.side-links {
  margin-top: 10px;
  padding-left: 0;
}
.active {
  background: #0258e3;
  margin-bottom: 0 !important;
}

/* Dropdown container (hidden by default). Optional: add a lighter background color and some left padding to change the design of the dropdown content */
.dropdown-container {
  margin: 0 15px 0 15px;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.2s ease-in;
  background: #0258e3;
  border-radius: 0 0 10px 10px;
  /* box-shadow: 1px 1px 6px white; */
  border-top: 1px solid #333;
}
.dropdown-container a {
  padding: 6px 0 6px 40px;
  text-decoration: none;
  font-size: 20px;
  color: #fff;
  display: block;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: all .2s;
}
.dropdown-container a:hover{
  padding-left: 50px;
}
/* Optional: Style the caret down icon */
.fa-caret-down {
  position: absolute;
  top: 15px;
  right: 0;
  cursor: pointer;
}
.side-link {
  position: relative;
  list-style: none;
  height: 50px;
  margin: 0 15px 0 15px;
  border-radius: 10px 10px 0 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

.side-link a {
  height: 100%;
  width: 100%;
  transition: all 0.4s ease;
  cursor: pointer;
}
.side-link a:hover,
.side-link a:active {
  background: #0258e3;
  border-radius: 10px;
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
