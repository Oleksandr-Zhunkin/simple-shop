import "../style.css";

import { getProductById, createCart } from "./api";

export let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

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
  document.querySelector("#product").innerHTML = productPage;

  document.querySelector("#back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.querySelector(".add-btn").addEventListener("click", () => {
    createCart({ id: product._id, quantity: 1 }).then(() => {
      const existingProduct = cartList.find((item) => item._id === product._id);

      if (existingProduct) {
        existingProduct.productCount += 1;
      } else {
        cartList.push({ ...product, productCount: 1 });
      }

      localStorage.setItem("cartList", JSON.stringify(cartList));
      window.location.href = "cart.html";
    });
  });
};
