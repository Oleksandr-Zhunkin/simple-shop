import { getProducts } from "./api";
import { renderProducts } from "./products";

let allProducts = [];
let filteredProducts = [];

const loadProducts = () => {
  getProducts().then((products) => {
    allProducts = products;
    filteredProducts = products;
    renderProducts(filteredProducts);
  });
};

export const filterProductsByCategory = (categoryName) => {
  if (categoryName) {
    filteredProducts = allProducts.filter(
      (product) => product.category === categoryName
    );
  } else {
    filteredProducts = allProducts;
  }
  renderProducts(filteredProducts);
};

const filterProductsBySearch = (e) => {
  const searchValue = e.target.value.toLowerCase();
  console.log(searchValue);

  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );

  renderProducts(searchFilteredProducts);
};

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", filterProductsBySearch);
});
