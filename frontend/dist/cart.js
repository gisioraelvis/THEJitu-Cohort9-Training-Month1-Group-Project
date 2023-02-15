"use strict";
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
const cartPageContainer = document.querySelector(".cart-page-container");
const productsContainer = document.querySelector(".products-container");
const cartTotalItems = document.querySelector(".cart-total-items");
const cartCheckoutBtn = document.querySelector(".cart-checkout-btn");
// Global Variables
let cartItems = [];
let cartTotalPrice = 0;
const getCartItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = localStorage.getItem("jwt");
    const response = yield fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    });
    const data = yield response.json();
    // {message: 'There are no items in the cart', cart: Array(0)}
    if (data.cart) {
        productsContainer.innerHTML = `
        <div class="empty-cart">
            <h1>Your cart is empty</h1>
            <a href="/index.html">Go back to shopping</a>
        </div>`;
        return;
    }
    data.forEach((item) => {
        cartItems.push(item);
    });
    displayCartItems();
    getCartTotalPrice();
});
const displayCartItems = () => {
    if (cartItems.length === 0) {
        cartPageContainer.innerHTML = `
     <div class="empty-cart">
            <h1>Your cart is empty</h1>
            <a href="/index.html">Go back to shopping</a>
        </div>`;
        return;
    }
    cartItems.forEach((item) => {
        getProduct(item.productId).then((product) => {
            productsContainer.innerHTML += `
            <div class="cart-product" data-id="${item.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="product image">
                </div>
                <div class="product-details">
                    <div class="product-title-price">
                        <div>
                            <h2 class="product-title">${product.name}</h2>
                        </div>
                        <div>
                            <p class="product-price">Price: ksh ${product.price}</p>
                        </div>
                    </div>
                    <div class="product-delete-btn">
                        <button class="delete-btn" type="button">
                            <span class="material-icons" title="Remove from cart">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        });
    });
};
// get product
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/products/${id}`);
    const data = yield response.json();
    return data;
});
const getCartTotalPrice = () => {
    cartItems.forEach((item) => {
        getProduct(item.productId).then((product) => {
            cartTotalPrice += product.price * item.qty;
            cartTotalItems.innerHTML = `
                <h1>Total For(${cartItems.length}) items:</h1>
                <h2> Ksh ${cartTotalPrice}</h2>
            `;
        });
    });
};
productsContainer.addEventListener("click", (e) => {
    var _a, _b;
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
        const cartProduct = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        const id = cartProduct === null || cartProduct === void 0 ? void 0 : cartProduct.dataset.id;
        deleteCartItem(id);
    }
});
const deleteCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const jwt = localStorage.getItem("jwt");
    const response = yield fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    });
    const data = yield response.json();
    console.log(data);
    // reload the page
    window.location.reload();
});
// place order
cartCheckoutBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = localStorage.getItem("jwt");
    const res = yield fetch(`${API_URL}/cart/checkout`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` },
    });
    const data = yield res.json();
    console.log(data);
    //   window.location.href = "Order.html";
}));
// Event Listeners
window.addEventListener("DOMContentLoaded", () => {
    getCartItems();
});
