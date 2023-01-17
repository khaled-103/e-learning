<template>
  <div>
    <nav class="container-fluid" style="box-shadow:1px 1px 6px black;">
      <ul
        class="d-flex justify-content-between"
        style="list-style: none; padding-left: 0"
      >
        <li class="mt-2 d-flex" >
          <button class="d-md-none d-block m-2 btn close-btn open-side">
            <i class="fa-solid fa-bars" style="font-size: 25px"></i>
          </button>
          <a href="#search" data-toggle="collapse" class="" style="position:relative;" >
            <div class="search-box " style="position:absolute;top:0;left:0;z-index:2;">
              <button class="btn-search"><i class="fas fa-search"></i></button>
              <input
                type="text"
                class="input-search"
                placeholder="Type to Search..."
              />
            </div>
          </a>
        </li>
        <li>
          <ul class="d-flex" style="list-style: none">
            <li class="mt-3">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-white dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style="background-color: black; color: white"
                >
                  English <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" style="">
                  <li><a class="dropdown-item" href="#">English</a></li>
                  <li><a class="dropdown-item" href="#">Arabic</a></li>
                </ul>
              </div>
            </li>
            <li class="mt-2">
              <a href="#"><i class="text-dark fa-regular fa-bell"></i></a>
            </li>
            <li class="mt-1 ">
              <a  href="#"
                ><img
                class="border border-dark"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbVrOTLM4QqS0o214EJZcsmt4Jd_OjdqY8JA&usqp=CAU"
                  alt=""
              /></a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.fa-magnifying-glass,
.fa-bell {
  padding: 16px;
  font-size: 23px;
}

nav img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 8px;
}
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
  border-radius: 20px;
  border: 1px solid black;
}
.input-search {
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 5px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  padding-right: 45px;
}
.input-search::placeholder {
  color: black;
  font-size: 12px;
  letter-spacing: 2px;
}
.btn-search {
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: black;
  background-color: transparent;
  pointer-events: painted;
}
.btn-search:focus ~ .input-search {
  width: 350px;
  border-radius: 0px;
  background-color: transparent;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
.input-search:focus {
  width: 350px;
  border-radius: 0px;
  background-color: transparent;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
</style>