import { getCategories } from "./api";
import { filterProductsByCategory } from "./filter";

const createCategory = (category) => {
  return `
    <li>
      <button class="category-btn" data-category="${category.name}">${category.name}</button>
    </li>          
  `;
};

const renderCategories = (categories) => {
  const categoryList = document.querySelector("#category-list");

  categoryList.innerHTML = categories.map(createCategory).join("");

  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      event.target.classList.add("active");

      const categoryName = event.target.dataset.category;

      filterProductsByCategory(categoryName);
    });
  });
};

getCategories()
  .then((data) => {
    renderCategories(data);
  })
  .catch((error) => {
    console.log(error);
  });
