<template>
  <div class="sideBar">
    <div class="sideBarContent">
      <div class="not-login-status d-none">
        <div class="pointer">
          <nuxt-link :to="{ name: 'user-login' }">Log in</nuxt-link>
        </div>
        <div class="pointer my-2">
          <nuxt-link :to="{ name: 'user-register' }">Sign up</nuxt-link>
        </div>
      </div>
      <div class="login-status">
        <div class="pointer my-2">
          <nuxt-link :to="{ name: 'user-login' }">My Learning</nuxt-link>
        </div>
        <div class="pointer mb-2">
          <nuxt-link :to="{ name: 'user-register' }">Wish list</nuxt-link>
        </div>
        <div class="pointer mb-2">
          <nuxt-link :to="{ name: 'user-login' }">Messages</nuxt-link>
        </div>
        <div class="pointer my-2">
          <nuxt-link :to="{ name: 'user-login' }">Logout</nuxt-link>
        </div>
      </div>
      <i class="fa fa-xmark pointer" @click="$emit('hide-side-bar')"></i>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["hide-side-bar"],
  
};
</script>

<style scoped>
.sideBar {
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.sideBarContent {
  background: white;
  width: 250px;
  padding: 15px 10px;
  height: 100vh;
  position: relative;
  animation: sideBar 0.4s ease-in-out;
}

.pointer {
  cursor: pointer;
}

.fa-xmark {
  position: absolute;
  top: 12px;
  right: -55px;
  font-size: 18px;
  color: #1d1e1f;
  background: white;
  color: #1d1e1f;
  border-radius: 50%;
  padding: 12px 15px;
}

a {
  text-decoration: none;
}

.not-login-status a {
  color: #a435f0;
}

.login-status a {
  color: #1d1e1f;
}

@keyframes sideBar {
  0% {
    width: 0;
  }

  100% {
    width: 250px;
  }

}
</style>