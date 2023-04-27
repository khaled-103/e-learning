import axios from "axios";

export const state = () => ({
  cartItems: [],
  price: 0,
});

export const getters = {
  getCartItems(state) {
    return state.cartItems;
  },
  getPriceCart(state) {
    return state.price;
    console.log(state.price);
  },
};
export const mutations = {
  setCartItem(state, items) {
    state.cartItems = items;
    this.commit("cart/calculatePrice");
  },
  addItem(state, { image, courseName, price, orgName, discount, id }) {
    state.cartItems.push({
      id: id,
      courseName: courseName,
      image: image,
      price: price,
      orgName: orgName,
      discount: discount,
    });
  },
  removeItem(state, item_id) {
    console.log("enter remve");
    state.cartItems = state.cartItems.filter((item) => {
      return item.id != item_id;
    });
  },
  removeAllItem(state) {
    state.cartItems = [];
  },
  calculatePrice(state) {
    state.price = 0;
    state.cartItems.forEach((item) => {
      state.price += item.price - item.price * item.discount;
    });
  },
};

export const actions = {
  addItemCart(state, { image, courseName, price, orgName, discount, id }) {
    this.commit("cart/addItem", {
      image,
      courseName,
      price,
      orgName,
      discount,
      id,
    });
  },
  removeItemCart(state, item) {
    this.commit("cart/removeItem", item);
  },
  removeAllItemCart(state) {
    this.commit("cart/removeAllItem");
  },
  calculatePriceCart(state) {
    this.commit("cart/calculatePrice");
  },
};
