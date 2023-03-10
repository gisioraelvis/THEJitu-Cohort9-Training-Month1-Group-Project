var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let API_URL = "http://localhost:5500/api";
const productId = window.location.search.split("=")[1];
const fetchProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${API_URL}/products/${id}`);
    const data = yield res.json();
    return data;
});
export const renderProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield fetchProduct(id);
        const productContainer = document.querySelector(".product-cart-container");
        productContainer.innerHTML = `
            <div class="product">
                <div class="product-image">
                    <img src="${product.image}" alt="product image">
                </div>
                <div class="product-details">
                    <div class="product-title price">
                        <h2 class="product-title">${product.name}</h2>
                        <div class="line-separator"></div>
                        <p class="product-price">Price: ksh ${product.price}</p>
                    </div>
                    <div class="line-separator"></div>
                    <div class="product-description">
                        <h3>Description:</h3>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                </div>
            </div>
            <div class="product-page-cart">
                <div class="product-page-add-to-cart">
                    <div class="product-page-price">
                        <h3>Price: ksh ${product.price}</h3>
                    </div>
                    <div class="line-separator"></div>
                    <div class="product-page-status">
                        <h3>Status: <span class="status">${product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span></h3>
                    </div>
                    <div class="line-separator"></div>
                    <div class="product-page-qty">
                        <label for="qty">Qty:</label>
                        <input type="number" name="qty" id="qty" value="1" min="1">
                    </div>
                    <div class="line-separator"></div>
                    <button class="add-to-cart-btn" type="button">
                        <span class="material-icons" title="add to cart">add_shopping_cart</span>
                        Add To Cart
                    </button>
                </div>
            </div>
        `;
    }
    catch (error) {
        console.log(error);
    }
});
renderProduct(productId);
// update total price on qty change
document.addEventListener("input", (e) => {
    const target = e.target;
    if (target.id === "qty") {
        const qty = target.value;
        const price = document.querySelector(".product-price");
        const cartPrice = document.querySelector(".product-page-price");
        const productPrice = price.innerText.split(" ")[2];
        cartPrice.innerText = `Price: ksh ${Number(productPrice) * Number(qty)}`;
    }
});
// add to cart
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("add-to-cart-btn")) {
        const qty = document.querySelector("#qty")
            .value;
        addToCart(productId, qty);
    }
});
const addToCart = (productId, qty) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = localStorage.getItem("jwt");
    console.log(productId, qty);
    if (!jwt) {
        window.location.href = "SignIn.html";
    }
    else {
        const res = yield fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ productId, qty }),
        });
        const data = yield res.json();
        console.log(data);
        window.location.href = "cart.html";
    }
});
