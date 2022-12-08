<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <div class="col-lg-5 col-md-7 col-10">
        <div class="content my-5 mx-2 py-5 px-5">
          <i class="fa-regular fa-user icon"></i>
          <h2 class="my-3">Sign In</h2>
          <form action="/action_page.php">
            <div class="mb-3">
              <input
                type="text"
                :class="[
                  'form-control',
                  {
                    'is-invalid': errorsMessages.username.length > 0,
                  },
                ]"
                id="username"
                placeholder="Email / Username"
                name="username"
                v-model="username"
              />
              <p class="text-danger" v-show="this.errorsMessages.username.length > 0">
                {{ errorsMessages.username[0] ?? "" }}
              </p>
            </div>
            <div class="mb-3">
              <input
                type="password"
                :class="[
                  'form-control',
                  {
                    'is-invalid': errorsMessages.password.length > 0,
                  },
                ]"
                id="password"
                placeholder="Password"
                name="password"
                v-model="password"
              />
              <p class="text-danger" v-show="this.errorsMessages.password.length > 0">
                {{ errorsMessages.password[0] ?? "" }}
              </p>
            </div>

            <button
              @click.prevent="login()"
              type="submit"
              class="btn btn-primary x-button"
            >
              Sign In
            </button>
            <div class="mt-3">
              <span>Don't Have Acount?</span>
              <nuxt-link :to="{ name: 'register' }">Sign Up</nuxt-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorsMessages: {
        username: [],
        password: [],
      },
    };
  },
  methods: {
    ...mapMutations({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
    }),
    async login() {
      let result = await axios.post("http://127.0.0.1:8000/api/orgnaization/login", {
        username: this.username,
        password: this.password,
      });
      console.log(result.data);
      if (result.data.code == 200) {
        this.setToken(result.data.token);
        this.setUser(result.data.orgnaization);
        return this.$router.push({ name: "index" });
      } else {
        let messages = result.data.message;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = messages[item] ?? [];
        }
      }
    }
  },
};
</script>

<style scoped>
.icon {
  border-radius: 50%;
  padding: 20px;
  background: #1089ff;
  color: white;
  font-size: 24px;
}
.x-button {
  width: 100%;
}

.content {
  background: white;
  box-shadow: 0 10px 34px -15px black;
  border-radius: 10px;
}
</style>
