export const state = () => ({
  token : null, // from cookie or null
  user : null,
})

export const getters = {

  getToken(state){
    return state.token;
  },
  getUser(state){
    return state.user;
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  },
  setToken(state,token){
    state.token = token;
  },
  setUser(state,user){
    state.user = user;
  }
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}
