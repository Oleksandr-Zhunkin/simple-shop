import "../style.css";

import { getProductById } from "./api";

export const renderProductPage = (product) => {
  const productPage = `
    <header>
      <button id="back-btn">Back</button>
      <h1>${product.title}</h1>
    </header>
    <main>
      <img src="${product.image}" alt="${product.title}" style="height:400px; margin: 0 auto;" >
      <p>Price - ${product.price}$</p>
    </main>
  `;
  document.querySelector("#product").innerHTML = productPage;

  document.querySelector("#back-btn").addEventListener("click", () => {
    console.log("clicked");
    window.location.href = "index.html";
  });
};

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
  };
};

const { id } = getQueryParams();

if (id) {
  getProductById(id).then((product) => {
    renderProductPage(product);
  });
}
