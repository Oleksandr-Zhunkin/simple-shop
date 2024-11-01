import "../style.css";
import { cartList } from "./renderProductDetails";

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
});

export const renderCartPage = () => {
  const cartPage = `
    <header class="header">
      <button id="back-btn">Go home</button>
      <h1 class="main-title">Cart</h1>
    </header>
    <main>
      <ul id="cart-list">
        ${cartList.map(
          (product) =>
            `
          <li class="cart-item" id="${product._id}">
            <p>${product.title}</p>
            <div class="pcs-control">
              <div class="option">
                <svg class="minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"     width="24" height="24">
                <path d="M19 13H5v-2h14v2z"/>
                </svg>
              </div>
              
              <p>${product.productCount}pcs</p>

              <div class="option">
                <svg class="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 13H5v-2h14v2zM12 5v14h-2V5h2z"/>
                </svg>
              </div>
              
            </div>
            <p>Price - ${product.price}$</p>
            <p>Total - ${product.price * product.productCount}$</p>
          </li>
        `
        )}
        
      </ul>
      <div class="cart-total">
            <p>Total: ${cartList.reduce(
              (acc, product) => acc + product.price * product.productCount,
              0
            )}$</p>
            <button id="checkout-btn">Checkout</button>
      </div>
    </main>
  `;
  document.querySelector("#cart").innerHTML = cartPage;

  document.querySelector("#back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.querySelectorAll(".plus").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const productId = event.target.closest(".cart-item").id;
      const product = cartList.find((item) => item._id === productId);
      if (product) {
        product.productCount += 1;
        localStorage.setItem("cartList", JSON.stringify(cartList));
        renderCartPage();
      }
    });
  });

  document.querySelectorAll(".minus").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const productId = event.target.closest(".cart-item").id;
      const product = cartList.find((item) => item._id === productId);
      if (product && product.productCount > 1) {
        product.productCount -= 1;
        localStorage.setItem("cartList", JSON.stringify(cartList));
        renderCartPage();
      }
    });
  });
};
