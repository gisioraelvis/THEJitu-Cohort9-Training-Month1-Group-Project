import { Product } from "./interfaces";
const API_URL = "http://localhost:5500/api" as string;

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

const Products: Product[] = [];

const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();

    data.forEach((product: Product) => {
      Products.push(product);
    });
  } catch (error) {
    console.log(error);
  }
};

const displayProducts = () => {
  products.innerHTML = "";
  Products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    // add product id to the product element
    productEl.dataset.id = product.id as unknown as string;
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

const renderProducts = async () => {
  await fetchProducts();
  displayProducts();
};
renderProducts();

// Product
productsContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (!target.classList.contains("add-to-cart-btn")) {
    const product = target.parentElement?.parentElement;
    const productId = product?.dataset.id as string;
    window.location.href = `product.html?id=${productId}`;
  }
});

products.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.classList.contains("add-to-cart-btn")) {
    const product = target.parentElement?.parentElement;
    const productId = product?.dataset.id as string;
    const qty = 1;
    addToCart(productId, qty);
  }
});

// add product to Cart
export const addToCart = async (productId: string, qty: number) => {
  try {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ productId, qty }),
      });
      const data = await res.json();

      window.location.href = "cart.html";
      console.log(data);
    } else {
      // SignIn.html
      window.location.href = "SignIn.html";
    }
  } catch (error) {
    console.log(error);
  }
};
