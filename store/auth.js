import axios from "axios";

export const state = () => ({
  token: null, // from cookie or null
  user: null,
});

export const getters = {
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
};

export const mutations = {
  increment(state) {
    state.counter++;
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  },
  async sendRequest({ state }, { url, dataSend }) {
    let result = await axios.post(url, dataSend, {
      headers: { "x-laravel-version": "v9" },
    });
    return result;
  },
  async initToken(state) {
    let tokenCookie = this.$cookies.get("tokenInfo");
    if (tokenCookie != null) {
      let result = await this.dispatch("auth/sendRequest", {
        url: "http://127.0.0.1:8000/api/checkToken",
        dataSend: {
          token: tokenCookie,
        },
      });
      this.commit("auth/setToken", result.data.status ? tokenCookie : null);
    }
  },
};
