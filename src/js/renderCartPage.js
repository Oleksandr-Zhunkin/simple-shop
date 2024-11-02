import "../css/style.css";
import { cartList, LS_KEY_CART } from "./constants";

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
});

export const renderCartPage = () => {
  cartList.totalCheck = parseFloat(
    cartList.items
      .reduce((acc, product) => acc + product.price * product.productCount, 0)
      .toFixed(2)
  );

  localStorage.setItem(LS_KEY_CART, JSON.stringify(cartList));

  const cartContainer = document.querySelector("#cart");

  if (!cartContainer) {
    console.error("Container with ID 'cart' not found.");
    return;
  }

  const cartPage = `
    <header class="header">
      <button id="back-btn">Continue shopping</button>
      <h1 class="main-title">Cart</h1>
    </header>
    <main>
      <ul id="cart-list">
        ${cartList.items
          .map(
            (product) =>
              `
          <li class="cart-item" id="${product._id}">
            <p>${product.title}</p>
            <div class="pcs-control">
              <div class="option">
                <svg class="minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"     width="24" height="24">
                <path d="M19 13H5v-2h14v2z" fill="currentColor"></path>
                </svg>
              </div>
              
              <p>${product.productCount}pcs</p>

              <div class="option">
                <svg class="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 13H5v-2h14v2zM12 5v14h-2V5h2z" fill="currentColor"/>
                </svg>
              </div>
              
            </div>
            <p>Price - ${product.price}$</p>
            <p>Total sum - ${(product.price * product.productCount).toFixed(
              2
            )}$</p>
            <button class="remove-btn">Remove</button>
          </li>
        `
          )
          .join("")}
        
      </ul>
      <div class="cart-total">
            <p>Total check: ${cartList.totalCheck}$</p>
            <button id="checkout-btn">Checkout</button>
      </div>
    </main>
  `;
  cartContainer.innerHTML = cartPage;

  document.querySelector("#back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.querySelectorAll(".plus").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const productId = event.target.closest(".cart-item").id;

      const product = cartList.items.find((item) => item._id === productId);

      if (product && product.quantity > product.productCount) {
        product.productCount += 1;
        localStorage.setItem(LS_KEY_CART, JSON.stringify(cartList));
        renderCartPage();
      }
    });
  });

  document.querySelectorAll(".minus").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const productId = event.target.closest(".cart-item").id;
      const product = cartList.items.find((item) => item._id === productId);
      if (product && product.productCount > 1) {
        product.productCount -= 1;
        localStorage.setItem(LS_KEY_CART, JSON.stringify(cartList));
        renderCartPage();
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.target.closest(".cart-item").id;
      cartList.items.splice(
        cartList.items.findIndex((item) => item._id === productId),
        1
      );
      localStorage.setItem(LS_KEY_CART, JSON.stringify(cartList));
      renderCartPage();
    });
  });

  document.querySelector("#checkout-btn").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
};
