/* 
<!-- Carousel -->
    <div class="carousel-container">
        <div class="carousel">
            <div class="left-arrow">
                <span class="material-icons" title="slide left">navigate_before</span>
            </div>
            <div class="product-container">
                <div class="product">
                    <div class="title">
                        <h2>Play Station 4</h2>
                    </div>
                    <div class="image">
                        <img src="./assests/images/playstation.jpg" alt="product image">
                    </div>
                    <div class="price">
                        <p>Price: ksh 40,000</p>
                    </div>
                </div>
            </div>
            <div class="right-arrow">
                <span class="material-icons" title="slide right">navigate_next</span>
            </div>
        </div>
        <div class="dots">
            <span class="material-icons active">radio_button_checked</span>
            <span class="material-icons">radio_button_unchecked</span>
            <span class="material-icons">radio_button_unchecked</span>
        </div>
    </div>
    <!-- Products -->
    <div class="products-container">
        <div class="products-title">
            <h2>Latest Products</h2>
        </div>
        <div class="products">
            <div class="product">
                <div class="image">
                    <img src="./assests/images/playstation.jpg" alt="product image">
                </div>
                <div class="title">
                    <h3>Play Station 4</h3>
                </div>
                <div class="price">
                    <p>Price: ksh 40,000</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product">
                <div class="image">
                    <img src="./assests/images/playstation.jpg" alt="product image">
                </div>
                <div class="title">
                    <h3>Play Station 4</h3>
                </div>
                <div class="price">
                    <p>Price: ksh 40,000</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product">
                <div class="image">
                    <img src="./assests/images/playstation.jpg" alt="product image">
                </div>
                <div class="title">
                    <h3>Play Station 4</h3>
                </div>
                <div class="price">
                    <p>Price: ksh 40,000</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product active">
                <div class="image">
                    <img src="./assests/images/playstation.jpg" alt="product image">
                </div>
                <div class="title">
                    <h3>Play Station 4</h3>
                </div>
                <div class="price">
                    <p>Price: ksh 40,000</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product">
                <div class="image">
                    <img src="./assests/images/playstation.jpg" alt="product image">
                </div>
                <div class="title">
                    <h3>Play Station 4</h3>
                </div>
                <div class="price">
                    <p>Price: ksh 40,000</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product">
                <div class="image">
                    <img src="./assests/images/playstation.jpg" alt="product image">
                </div>
                <div class="title">
                    <h3>Play Station 4</h3>
                </div>
                <div class="price">
                    <p>Price: ksh 40,000</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        <!-- Pagination -->
        <div class="pagination-container">
            <div class="pagination">
                <div class="prev">
                    <span class="material-icons" title="previous">navigate_before</span>
                </div>
                <div class="pages">
                    <div class="page active">
                        <p>1</p>
                    </div>
                    <div class="page">
                        <p>2</p>
                    </div>
                    <div class="page">
                        <p>3</p>
                    </div>
                    <div class="page">
                        <p>4</p>
                    </div>
                </div>
                <div class="next">
                    <span class="material-icons" title="next">navigate_next</span>
                </div>
            </div>
        </div>
    </div>
*/

import { Product } from "./interfaces";

// grab the DOM elements and type them
const productsContainer = document.querySelector(
  ".products-container"
) as HTMLDivElement;
const productsTitle = document.querySelector(
  ".products-title"
) as HTMLDivElement;
const products = document.querySelector(".products") as HTMLDivElement;
const paginationContainer = document.querySelector(
  ".pagination-container"
) as HTMLDivElement;
const pagination = document.querySelector(".pagination") as HTMLDivElement;
const prev = document.querySelector(".prev") as HTMLDivElement;
const pages = document.querySelector(".pages") as HTMLDivElement;
const next = document.querySelector(".next") as HTMLDivElement;

// create a type for the state
type State = {
  products: Product[];
  page: number;
  perPage: number;
  totalPages: number;
  totalProducts: number;
};

// create the state
const state: State = {
  products: [],
  page: 1,
  perPage: 6,
  totalPages: 0,
  totalProducts: 0,
};

// create a function to fetch the products
const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    state.products = data;
    state.totalProducts = data.length;
    state.totalPages = Math.ceil(state.totalProducts / state.perPage);
  } catch (error) {
    console.log(error);
  }
};

// create a function to display the products
const displayProducts = () => {
  const start = (state.page - 1) * state.perPage;
  const end = state.page * state.perPage;
  const productsToShow = state.products.slice(start, end);
  productsToShow.forEach((product: Product) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.innerHTML = `
          <div class="image">
            <img src="${product.image}" alt="product image">
          </div>
          <div class="title">
            <h3>${product.name}</h3>
          </div>
          <div class="price">
            <p>Price: ksh ${product.price}</p>
          </div>
          <div class="add-to-cart">
            <button class="add-to-cart-btn" type="button">
              <span class="material-icons" title="add to cart">add_shopping_cart</span>
              Add to Cart
            </button>
          </div>
    `;
    products.appendChild(productEl);
  });
};

// create a function to display the pagination
const displayPagination = () => {
  for (let i = 1; i <= state.totalPages; i++) {
    const pageEl = document.createElement("div");
    pageEl.classList.add("page");
    pageEl.innerHTML = `<p>${i}</p>`;
    pages.appendChild(pageEl);
  }
};

// create a function to display the products title
const displayProductsTitle = () => {
  productsTitle.innerHTML = `
        <h2>Products</h2>
        <p>${state.totalProducts} Products</p>
    `;
};

// create a function to display the products container
const displayProductsContainer = () => {
  productsContainer.innerHTML = `
        <div class="products-title"></div>
        <div class="products"></div>
    `;
};

// create a function to display the pagination container
const displayPaginationContainer = () => {
  paginationContainer.innerHTML = `
        <div class="pagination">
            <div class="prev">
                <span class="material-icons" title="previous">navigate_before</span>
            </div>
            <div class="pages"></div>
            <div class="next">
                <span class="material-icons" title="next">navigate_next</span>
            </div>
        </div>
    `;
};

// create a function to display the app
const displayApp = () => {
  displayProductsContainer();
  displayProductsTitle();
  displayProducts();
  displayPaginationContainer();
  displayPagination();
};

// create a function to initialize the app
const init = async () => {
  await fetchProducts();
  displayApp();
};

init();
