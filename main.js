import "./style.css";
import "./js/categories.js";
import "./js/products.js";
import "./js/filter.js";

document.querySelector("#app").innerHTML = `
    <header>
        <h1>Shop by Category</h1>
        <ul id="category-list"></ul>
    </header>
    <main>
        <div id="categories">
            <h2 class="title">Products</h2>
            <input type="text" id="search" placeholder="Filter products by name...">
            <ul id="product-list"></ul>
        </div>
    </main> 
`;
