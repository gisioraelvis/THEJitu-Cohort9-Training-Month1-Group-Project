var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "http://localhost:5500/api";
/*
To access the cart page the user should be logged in i.e jwt token should be present in the local storage
When user clicks on sign in button, the user should be redirected to the login page if not logged in
else redirect to profile page
 */
const nav = document.querySelector(".nav");
const cartBtn = document.querySelector(".cart-btn");
const signBtn = document.querySelector(".sign-btn");
const jwt = localStorage.getItem("jwt");
if (jwt) {
    signBtn.innerHTML = `
        <span class="material-icons" title="profile">person</span>
        Profile
    `;
}
cartBtn.addEventListener("click", () => {
    if (jwt) {
        window.location.href = "cart.html";
    }
    else {
        window.location.href = "SignIn.html";
    }
});
signBtn.addEventListener("click", () => {
    if (jwt) {
        window.location.href = "onePersonOrder.html";
    }
    else {
        window.location.href = "SignIn.html";
    }
});
const productsContainer = document.querySelector(".products-container");
const productsTitle = document.querySelector(".products-title");
const products = document.querySelector(".products");
const paginationContainer = document.querySelector(".pagination-container");
const Products = [];
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${API_URL}/products`);
        const data = yield res.json();
        data.forEach((product) => {
            Products.push(product);
        });
    }
    catch (error) {
        console.log(error);
    }
});
const displayProducts = () => {
    products.innerHTML = "";
    Products.forEach((product) => {
        const productEl = document.createElement("div");
        productEl.classList.add("product");
        // add product id to the product element
        productEl.dataset.id = product.id;
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
// Product
productsContainer.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    if (!target.classList.contains("add-to-cart-btn")) {
        const product = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        const productId = product === null || product === void 0 ? void 0 : product.dataset.id;
        window.location.href = `product.html?id=${productId}`;
    }
});
products.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    if (target.classList.contains("add-to-cart-btn")) {
        const product = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        const productId = product === null || product === void 0 ? void 0 : product.dataset.id;
        const qty = 1;
        addToCart(productId, qty);
    }
});
// add product to cart
export const addToCart = (productId, qty) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            const res = yield fetch(`${API_URL}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({ productId, qty }),
            });
            const data = yield res.json();
            window.location.href = "cart.html";
            console.log(data);
        }
        else {
            // SignIn.html
            window.location.href = "SignIn.html";
        }
    }
    catch (error) {
        console.log(error);
    }
});
// carousel
const carousel = document.querySelector(".carousel");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const dots = document.querySelectorAll(".dots span");
const productContainer = document.querySelector(".product-container");
const product = document.querySelector(".product");
let carouselIndex = 0;
const renderCarousel = () => {
    product.innerHTML = `
        <div class="title">
            <h2>${Products[carouselIndex].name}</h2>
        </div>
        <div class="image">
            <img src="${Products[carouselIndex].image}" alt="product image">
        </div>
        <div class="price">
            <p>Price: ksh ${Products[carouselIndex].price}</p>
        </div>
    `;
};
const carouselSlide = () => {
    carouselIndex++;
    if (carouselIndex > Products.length - 1) {
        carouselIndex = 0;
    }
    renderCarousel();
};
const carouselSlideBack = () => {
    carouselIndex--;
    if (carouselIndex < 0) {
        carouselIndex = Products.length - 1;
    }
    renderCarousel();
};
const carouselDots = () => {
    dots.forEach((dot, index) => {
        if (index === carouselIndex) {
            dot.classList.add("active");
        }
        else {
            dot.classList.remove("active");
        }
    });
};
leftArrow.addEventListener("click", () => {
    carouselSlideBack();
    carouselDots();
});
rightArrow.addEventListener("click", () => {
    carouselSlide();
    carouselDots();
});
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        carouselIndex = index;
        renderCarousel();
        carouselDots();
    });
});
window.document.addEventListener("DOMContentLoaded", () => {
    const renderProducts = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetchProducts();
        displayProducts();
    });
    renderProducts();
    renderCarousel();
});
