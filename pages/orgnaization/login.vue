<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center my-5">
      <div class="col-lg-8 col-md-10 col-11">
        <general-error
          :showGeneralError="showGeneralError"
          :generalError="generalError"
        />
        <div
          class="row"
          style="box-shadow: 1px 1px 5px #333; border-radius: 10px 0 10px 10px"
        >
          <div
            class="col-md-6 col-11"
            style="margin: auto; padding: 0 !important"
          >
            <div class="content mt-2 mx-2 py-5 px-4">
              <h2 class="my-3">Login</h2>
              <form action="/action_page.php">
                <div class="mb-3" style="position: relative">
                  <i class="fa fa-user icons"></i>
                  <input
                    type="text"
                    style="padding-left: 42px"
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
                <div class="mb-3" style="position: relative">
                  <i class="fa fa-lock icons"></i>
                  <input
                    type="password"
                    :class="[
                      'form-control',
                      {
                        'is-invalid': errorsMessages.password.length > 0,
                      },
                    ]"
                    style="padding-left: 42px"
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
                  url="/orgnaization/login"
                  :dataSend="{ username: username, password: password }"
                  :errorsMessages="errorsMessages"
                  routeName="orgnaization-dashboard"
                  source="orgnaization"
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
                  <nuxt-link
                  class="btn btn-sm btn-outline-dark options-login"
                  :to="{ name: 'orgnaization-register' }"
                  >Create Account</nuxt-link
                >
                <nuxt-link
                  class="btn btn-sm btn-outline-dark options-login"
                  :to="{ name: 'orgnaization-forgetPassword' }"
                  >Forget Password</nuxt-link
                >
                </div>
              </form>
            </div>
          </div>
          <div
            class="col-md-6 col-11 d-md-block d-none"
            style="padding: 0 !important; border-left: 1px solid #999"
          >
            <img src="~/assets/auth/cryptocurrency.png" width="100%" alt="" />
          </div>
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

.icons {
  font-size: 20px;
  color: #3c3d42;
  position: absolute;
  top: 7px;
  left: 10px;
}

.content {
  background: white;
  border-radius: 10px;
}

img {
  height: 100%;
  object-fit: contain;
}
.options-login {
  padding: 5px 10px;
  border-radius: 15px;
  text-decoration: none;
}
</style>
