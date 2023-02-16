let API_URL = "http://localhost:5500/api" as string;

// Global Variables
let cartItems: any[] = [];
let cartTotalPrice: number = 0;

// nav
const nav = document.querySelector(".nav") as HTMLDivElement;
const cartBtn = document.querySelector(".cart-btn") as HTMLButtonElement;
const signBtn = document.querySelector(".sign-btn") as HTMLButtonElement;

const jwt = localStorage.getItem("jwt") as string;

if (jwt) {
  signBtn.innerHTML = `
        <span class="material-icons" title="profile">person</span>
        Profile
    `;
}

cartBtn.addEventListener("click", () => {
  if (jwt) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "SignIn.html";
  }
});

signBtn.addEventListener("click", () => {
  if (jwt) {
    window.location.href = "onePersonOrder.html";
  } else {
    window.location.href = "SignIn.html";
  }
});

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
                            <p class="product-price">Qty: ${item.qty}</p>
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

    console.log(id);

    if (id) {
      deleteCartItem(id);
    }
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
  if (cartItems.length === 0) {
    console.log("empty");
    cartCheckoutBtn.style.display = "hidden";
  }
};

// place order
cartCheckoutBtn.addEventListener("click", async () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }
  const jwt = localStorage.getItem("jwt") as string;
  console.log(jwt);
  const res = await fetch(
    `${API_URL}/cart/checkout?totalPrice=${cartTotalPrice??500}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
  const data = await res.json();
  console.log(data);
  /* 
  {
    "message": "Order created successfully",
    "order": [
        {
            "id": 1006,
            "userId": 1,
            "shippingAddress": "",
            "paymentMethod": "",
            "paymentResultId": null,
            "paymentResultStatus": "Pending",
            "taxPrice": null,
            "shippingPrice": null,
            "totalPrice": 0,
            "isPaid": false,
            "paidAt": null,
            "isDelivered": false,
            "deliveredAt": null,
            "createdAt": "2023-02-16T08:27:19.943Z",
            "updatedAt": "2023-02-16T08:27:19.943Z"
        }
    ]
}
  */

  // get the order id and redirect to e.g Order.html/?id=1006
  const orderId = data.order[0].id;
  window.location.href = `Order.html?id=${orderId}`;
});

// Event Listeners
window.addEventListener("DOMContentLoaded", () => {
  getCartItems();
});
