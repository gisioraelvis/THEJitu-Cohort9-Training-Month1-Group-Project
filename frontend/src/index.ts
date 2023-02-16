import { Product } from "./interfaces";
let API_URL = "http://localhost:5500/api" as string;

/* 
To access the cart page the user should be logged in i.e jwt token should be present in the local storage
When user clicks on sign in button, the user should be redirected to the login page if not logged in
else redirect to profile page
 */

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

// add product to cart
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

// carousel
const carousel = document.querySelector(".carousel") as HTMLDivElement;
const leftArrow = document.querySelector(".left-arrow") as HTMLDivElement;
const rightArrow = document.querySelector(".right-arrow") as HTMLDivElement;
const dots = document.querySelectorAll(
  ".dots span"
) as NodeListOf<HTMLSpanElement>;
const productContainer = document.querySelector(
  ".product-container"
) as HTMLDivElement;
const product = document.querySelector(".product") as HTMLDivElement;

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
    } else {
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

productContainer.addEventListener("click", () => {
  const productId = Products[carouselIndex].id as unknown as string;
  window.location.href = `product.html?id=${productId}`;
});

window.document.addEventListener("DOMContentLoaded", () => {
  const renderProducts = async () => {
    await fetchProducts();
    displayProducts();
  };
  renderProducts();

  renderCarousel();
});
