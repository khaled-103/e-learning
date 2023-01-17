<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center text-center">
      <div class="col-lg-5 col-md-7 col-10">
        <general-error
          :showGeneralError="showGeneralError"
          :generalError="generalError"
        />
        <div class="content mt-2 mx-2 py-5 px-5">
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
              <p
                class="text-danger"
                v-show="this.errorsMessages.username.length > 0"
              >
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
              <p
                class="text-danger"
                v-show="this.errorsMessages.password.length > 0"
              >
                {{ errorsMessages.password[0] ?? "" }}
              </p>
            </div>

            <login-button
              url="/user/login"
              :dataSend="{
                username: username,
                password: password,
              }"
              :errorsMessages="errorsMessages"
              routeName="index"
              source="user"
              @showGeneralError="
                (value) => {
                  showGeneralError = value;
                }
              "
              @generalError="
                (value) => {
                  generalError = value;
                }
              "
            />

            <div class="mt-3">
              <nuxt-link class="text-dark" :to="{ name: 'user-register' }">Create Account</nuxt-link>
              <span>|</span>
              <nuxt-link class="text-dark" :to="{ name: 'user-forgetPassword' }">Forget Password</nuxt-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "guest",
  data() {
    return {
      showGeneralError: false,
      generalError: false,
      username: "",
      password: "",
      errorsMessages: {
        username: [],
        password: [],
      },
    };
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
  box-shadow: 1px -1px 6px black;
  border-radius: 10px;
}
</style>
