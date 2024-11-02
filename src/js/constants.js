export const LS_KEY_CART = "cartList";
export let cartList = JSON.parse(localStorage.getItem(LS_KEY_CART)) || {
  items: [],
  totalCheck: null,
};
