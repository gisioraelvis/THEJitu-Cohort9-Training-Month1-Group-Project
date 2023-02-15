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
const productsContainer = document.querySelector(".products-container");
const productsTitle = document.querySelector(".products-title");
const products = document.querySelector(".products");
const paginationContainer = document.querySelector(".pagination-container");
const pagination = document.querySelector(".pagination");
const prev = document.querySelector(".prev");
const pages = document.querySelector(".pages");
const next = document.querySelector(".next");
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
const renderProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchProducts();
    displayProducts();
});
renderProducts();
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
// add product to Cart
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
