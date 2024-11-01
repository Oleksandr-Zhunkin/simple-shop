import { getProducts } from "./api";

const createProduct = (product) => {
  return `
    <li class="product-item">
    <img src="${product.image}" alt="${product.title}" style="height:200px; margin: 0 auto;" >
    <p>${product.title}</p>
    <p>Price - ${product.price}$</p>
    </li>
  `;
};

export const renderProducts = (products) => {
  const productList = document.querySelector("#product-list");

  productList.innerHTML = products.map(createProduct).join("");
};

getProducts().then((data) => {
  renderProducts(data);
});
