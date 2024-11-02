import { getProducts } from "./api";

const createProduct = (product) => {
  return `
    <li class="product-item" id="${product._id}">
    <img src="${product.image}" alt="${product.title}" style="height:200px; margin: 0 auto;" >
    <p>${product.title}</p>
    <p>Price - ${product.price}$</p>
    </li>
  `;
};

export const renderProducts = (products) => {
  const productList = document.querySelector("#product-list");

  productList.innerHTML = products.map(createProduct).join("");

  productList.addEventListener("click", (event) => {
    const target = event.target.closest(".product-item");
    if (target) {
      const productId = target.id;

      window.location.href = `product.html?id=${productId}`;
    }
  });
};

getProducts().then((data) => {
  renderProducts(data);
});
