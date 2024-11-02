import "../style.css";

import { getProductById, createCart } from "./api";
import { cartList, LS_KEY_CART } from "./constants";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    getProductById(id).then((product) => {
      renderProductPage(product);
    });
  }
});

export const renderProductPage = (product) => {
  const productContainer = document.querySelector("#product");

  if (!productContainer) {
    console.error("Container with ID 'product' not found.");
    return;
  }

  const productPage = `
    <header class="header">
      <button id="back-btn">Go back</button>
      <h1 class="main-title">${product.title}</h1>
    </header>
    <main>
      <img src="${product.image}" alt="${product.title}" class="product-img" >
        <div class="product-wrapper">
          <p>Price - ${product.price}$</p>
          <button class="add-btn">Add to cart</button>
        </div>
    </main>
  `;
  productContainer.innerHTML = productPage;

  document.querySelector("#back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.querySelector(".add-btn").addEventListener("click", () => {
    createCart({ id: product._id, quantity: 1 }).then(() => {
      const existingProduct = cartList.items.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        existingProduct.productCount += 1;
      } else {
        cartList.items.push({ ...product, productCount: 1 });
      }

      localStorage.setItem(LS_KEY_CART, JSON.stringify(cartList));
      window.location.href = "./cart.html";
    });
  });
};
