import axios from "axios";

export const state = () => ({
  token: null,
  user: null,
  domain:'http://127.0.0.1:8000/api'
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
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async sendRequest({ state }, { url, dataSend }) {
    let result = await axios.post(state.domain+url, dataSend, {
      headers: { "x-laravel-version": "v9" },
    });
    return result;
  },
  async initToken(state) {
    let tokenCookie = this.$cookies.get("tokenInfo");
    if (tokenCookie != null) {
      let result = await this.dispatch("auth/sendRequest", {
        url: "/checkToken",
        dataSend: {
          token: tokenCookie,
        },
      });
      this.commit("auth/setToken", result.data.status ? tokenCookie : null);
    }
  },
};
