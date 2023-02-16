let API_URL = "http://localhost:5500/api" as string;

// Global Variables
let cartItems: any[] = [];
let cartTotalPrice: number = 0;

const cartPageContainer = document.querySelector(
  ".cart-page-container"
) as HTMLDivElement;
const productsContainer = document.querySelector(
  ".products-container"
) as HTMLDivElement;
const cartTotalItems = document.querySelector(
  ".cart-total-items"
) as HTMLDivElement;
const cartCheckoutBtn = document.querySelector(
  ".cart-checkout-btn"
) as HTMLDivElement;

const getCartItems = async () => {
  const jwt = localStorage.getItem("jwt") as string;
  const response = await fetch(`${API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await response.json();
  // {message: 'There are no items in the cart', cart: Array(0)}
  if (data.cart) {
    productsContainer.innerHTML = `
        <div class="empty-cart">
            <h1>Your cart is empty</h1>
            <a href="/index.html">Go back to shopping</a>
        </div>`;
    return;
  }

  data.forEach((item: any) => {
    cartItems.push(item);
  });
  displayCartItems();
  getCartTotalPrice();
};

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
const getProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};

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
  const target = e.target as HTMLButtonElement;

  if (target.classList.contains("delete-btn")) {
    const cartProduct = target.parentElement?.parentElement?.parentElement;
    const id = cartProduct?.dataset.id as string;
    deleteCartItem(id);
  }
});

const deleteCartItem = async (id: string) => {
  console.log(id);
  const jwt = localStorage.getItem("jwt") as string;
  const response = await fetch(`${API_URL}/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await response.json();
  console.log(data);

  // reload the page
  window.location.reload();
};

// place order
cartCheckoutBtn.addEventListener("click", async () => {
  const jwt = localStorage.getItem("jwt") as string;
  const res = await fetch(`${API_URL}/cart/checkout`, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  });
  const data = await res.json();
  console.log(data);
  window.location.href = "Order.html";
});

// Event Listeners
window.addEventListener("DOMContentLoaded", () => {
  getCartItems();
});
