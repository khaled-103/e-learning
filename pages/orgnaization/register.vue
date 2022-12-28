<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center my-5">
      <div v-show="!showVerifyPage" class="col-lg-5 col-md-7 col-10">
        <general-error :showGeneralError="showGeneralError" :generalError="generalError"/>
        <div class="content mt-2 mx-2 py-5 px-5">
          <i class="fa-regular fa-user icon"></i>
          <h2 class="my-3">Sign up</h2>
          <form>
            <div class="mb-3 mt-3">
              <input
                type="text"
                :class="[
                  'form-control',
                  { 'is-invalid': this.errorsMessages.name.length > 0 },
                ]"
                id="name"
                placeholder="Orgnaization Name"
                name="name"
                v-model="name"
              />
              <p
                class="text-danger"
                v-show="this.errorsMessages.name.length > 0"
              >
                {{ this.errorsMessages.name[0] ?? "" }}
              </p>
            </div>

            <div class="mb-3 mt-3">
              <input
                type="text"
                :class="[
                  'form-control',
                  { 'is-invalid': this.errorsMessages.phone.length > 0 },
                ]"
                id="phone"
                placeholder="phone"
                name="phone"
                v-model="phone"
              />
              <p
                class="text-danger"
                v-show="this.errorsMessages.phone.length > 0"
              >
                {{ this.errorsMessages.phone[0] ?? "" }}
              </p>
            </div>

            <div class="mb-3 mt-3 row">
              <div class="col-md-6 col-12">
                <input
                  type="text"
                  :class="[
                    'form-control',
                    { 'is-invalid': this.errorsMessages.country.length > 0 },
                  ]"
                  id="country"
                  placeholder="Country"
                  name="country"
                  v-model="country"
                />
                <p
                  class="text-danger"
                  v-show="this.errorsMessages.country.length > 0"
                >
                  {{ this.errorsMessages.country[0] ?? "" }}
                </p>
              </div>
              <div class="col-md-6 col-12">
                <input
                  type="text"
                  :class="[
                    'form-control',
                    { 'is-invalid': this.errorsMessages.city.length > 0 },
                  ]"
                  id="city"
                  placeholder="City"
                  name="city"
                  v-model="city"
                />
                <p
                  class="text-danger"
                  v-show="this.errorsMessages.city.length > 0"
                >
                  {{ this.errorsMessages.city[0] ?? "" }}
                </p>
              </div>
            </div>
            <div class="mb-3 mt-3">
              <input
                type="text"
                :class="[
                  'form-control',
                  { 'is-invalid': this.errorsMessages.username.length > 0 },
                ]"
                id="username"
                placeholder="Username"
                name="username"
                v-model="username"
              />
              <p
                class="text-danger"
                v-show="this.errorsMessages.username.length > 0"
              >
                {{ this.errorsMessages.username[0] ?? "" }}
              </p>
            </div>
            <div class="mb-3 mt-3">
              <input
                type="email"
                :class="[
                  'form-control',
                  { 'is-invalid': this.errorsMessages.email.length > 0 },
                ]"
                id="email"
                placeholder="Email"
                name="email"
                v-model="email"
              />
              <p
                class="text-danger"
                v-show="this.errorsMessages.email.length > 0"
              >
                {{ this.errorsMessages.email[0] ?? "" }}
              </p>
            </div>
            <div class="mb-3">
              <input
                type="password"
                :class="[
                  'form-control',
                  { 'is-invalid': this.errorsMessages.password.length > 0 },
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
                {{ this.errorsMessages.password[0] ?? "" }}
              </p>
            </div>
            <div class="mb-3">
              <input
                type="password"
                :class="[
                  'form-control',
                  {
                    'is-invalid':
                      this.errorsMessages.password_confirmation.length > 0,
                  },
                ]"
                id="password_confirmation"
                placeholder="Confirm Password"
                name="password_confirmation"
                v-model="password_confirmation"
              />
              <p
                class="text-danger"
                v-show="this.errorsMessages.password_confirmation.length > 0"
              >
                {{ this.errorsMessages.password_confirmation[0] ?? "" }}
              </p>
            </div>

            <sign-up-button
              @showVerifyPage="
                (value) => {
                  showVerifyPage = value;
                }
              "
              url="http://127.0.0.1:8000/api/orgnaization/sendVerifyEmail"
              :dataSend="{
                name: name,
                phone: phone,
                country: country,
                city: city,
                username: username,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
              }"
              routeName="orgnization-dashboard"
              source="orgnaization"
              :errorsMessages="errorsMessages"
              @showGeneralError="(value)=>{showGeneralError = value;}"
              @generalError="(value)=>{generalError = value;}"
            />
            <div class="mt-3">
              <span>Already Have Acount?</span>
              <nuxt-link :to="{ name: 'orgnaization-login' }">login</nuxt-link>
            </div>
          </form>
        </div>
      </div>
      <verify-email
        v-show="showVerifyPage"
        @showVerifyPage="
          (value) => {
            showVerifyPage = value;
          }
        "
        url="http://127.0.0.1:8000/api/orgnaization/register"
        :dataSend="{
          name: name,
          phone: phone,
          country: country,
          city: city,
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        }"
        routeName="orgnaization-dashboard"
        source="orgnaization"
        :errorsMessages="errorsMessages"
      />
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
      showVerifyPage: false,
      name: "",
      phone: "",
      country: "",
      city: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errorsMessages: {
        name: [],
        phone: [],
        username: [],
        country: [],
        city: [],
        email: [],
        password: [],
        password_confirmation: [],
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
