import "../css/style.css";
import { createOrder } from "./api";

import { cartList, LS_KEY_CART } from "./constants";

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutPage();
});

export const renderCheckoutPage = () => {
  const checkoutContainer = document.querySelector("#checkout");

  const checkoutPage = `
    <header class="header">
      <button id="back-btn">Back to cart</button>
      <h1 class="main-title">Checkout</h1>
    </header>
    <main>
    <p class="total-info">Total amount payable - ${cartList.totalCheck}</p>
    <form id="checkout-form">
    <input type="text" id="name" placeholder="Enter your name..." required>
    <input type="text" id="address" placeholder="Enter your address..." required>
    <button id="submit-btn">Submit</button>
    </form>
    </main>`;

  checkoutContainer.innerHTML = checkoutPage;

  document.querySelector("#back-btn").addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  document
    .querySelector("#checkout-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#name").value;
      const address = document.querySelector("#address").value;
      const order = {
        userName: name,
        userAddress: address,
        products: cartList.items.map((item) => ({
          productId: item._id,
          quantity: item.productCount,
        })),
        totalSum: cartList.totalCheck,
      };
      createOrder(order)
        .then(() => {
          localStorage.removeItem(LS_KEY_CART);
          event.target.reset();
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Error occured");
        });
    });
};
