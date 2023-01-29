<template>
  <div>
    <form>
      <div class="mb-3 row">
        <label for="name" class="col-lg-2 col-12">Name:</label>
        <div class="col-lg-9 col-12">
          <input
            required
            type="text"
            id="name"
            placeholder="Orgnaization Name"
            name="name"
            v-model="inputs.name"
          />
          <p class="text-danger" v-show="this.errorsMessages.name.length > 0">
            {{ errorsMessages.name[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="username" class="col-lg-2 col-12">Username:</label>
        <div class="col-lg-9 col-12">
          <input
            required
            type="text"
            id="username"
            placeholder="Orgnaization Username"
            name="username"
            v-model="inputs.username"
          />
          <p
            class="text-danger"
            v-show="this.errorsMessages.username.length > 0"
          >
            {{ errorsMessages.username[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="phone" class="col-lg-2 col-12">Phone:</label>
        <div class="col-lg-9 col-12">
          <input
            required
            type="text"
            id="phone"
            placeholder="Orgnaization Phone"
            name="phone"
            v-model="inputs.phone"
          />
          <p class="text-danger" v-show="this.errorsMessages.phone.length > 0">
            {{ errorsMessages.phone[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="email" class="col-lg-2 col-12">Email:</label>
        <div class="col-lg-9 col-12">
          <input
            disabled
            type="email"
            id="email"
            placeholder="Orgnaization Email"
            name="email"
            v-model="inputs.email"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="" class="col-lg-2 col-12"> Country:</label>
        <div class="col-lg-9 col-12">
          <select v-model="inputs.country_id" class="p-2 form-control">
            <option disabled selected value="">Select Country</option>
            <option
              class="py-4 px-3"
              :value="country.id"
              v-for="country in countries"
              :key="country.id"
            >
              {{ country.name }}
            </option>
          </select>
          <p
            class="text-danger"
            v-show="this.errorsMessages.country_id.length > 0"
          >
            {{ this.errorsMessages.country_id[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="text-center mt-5">
        <button
          type="submit"
          class="btn btn-success"
          @click.prevent="saveChanges()"
        >
          Save Changes
          <spinner-load :spinnerLoadShow="spinnerLoadShow" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      inputs: {
        name: "",
        username: "",
        phone: "",
        email: "",
        country_id: "",
      },
      errorsMessages: {
        name: [],
        username: [],
        phone: [],
        email: [],
        country_id: [],
      },
      spinnerLoadShow: false,
    };
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    initInputs() {
      this.inputs.name = this.orgProfileInfo.name;
      this.inputs.username = this.orgProfileInfo.username;
      this.inputs.phone = this.orgProfileInfo.phone;
      this.inputs.email = this.orgProfileInfo.email;
      this.inputs.country_id = this.orgProfileInfo.country_id;
    },
    clearErrorMessages() {
      this.errorsMessages = {
        name: [],
        username: [],
        phone: [],
        email: [],
        country_id: [],
      };
    },
    async saveChanges() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/changeBasicInfo",
        dataSend: {
          token: this.getToken(),
          username: this.inputs.username,
          name: this.inputs.name,
          phone: this.inputs.phone,
          country_id: this.inputs.country_id,
        },
      });
      if (result.data.status) {
        this.clearErrorMessages();
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Change your profile done",
        });
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        this.$toast.show({
          type: "danger",
          title: "Failed",
          message: "Something error !!",
        });
      }
      this.spinnerLoadShow = false;
    },
  },
  props: {
    countries: [],
    orgProfileInfo: [],
  },
  mounted() {
    this.initInputs();
  },
};
</script>

<style scoped>
label {
  margin-top: 5px;
  font-weight: 500;
  color: white;
}
input:disabled{
  color: white;
}
input,
select {
  border: 1px solid #a4a4b2;
  padding: 5px 10px;
  width: 100%;
  border-radius: 20px;
}
p.text-danger {
  font-size: 14px;
  margin-bottom: 0;
}
</style>