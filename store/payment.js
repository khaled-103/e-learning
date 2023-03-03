import axios from "axios";

export const state = () => ({
  orderItems: [],
  amount: 0,
  basicPrice: 0,
  discount: 0,
});

export const getters = {
  getOrderItems(state) {
    return state.orderItems;
  },
  getTotalPrice(state) {
    return state.amount;
  },
  getBasicPrice(state) {
    return state.basicPrice;
  },
  getDiscount(state) {
    return state.discount;
  },
};

export const mutations = {
  setOrderItems(state, items) {
    state.amount = 0;
    state.basicPrice = 0;
    state.discount = 0;
    state.orderItems = items;
    items.forEach((element) => {
      state.amount += element.price - element.price * element.discount;
      state.basicPrice += element.price;
      state.discount += element.discount;
    });
    // this.$cookies.set("orderInfo", {
    //   orderItems:state.orderItems,
    //   amount:state.amount,
    //   basicPrice: state.basicPrice,
    //   discount : state.discount
    // }, {
    //   path: "/",
    // });
  },
};

export const actions = {};
