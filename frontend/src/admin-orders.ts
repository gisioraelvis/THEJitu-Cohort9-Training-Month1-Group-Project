import { Product } from "./interfaces";
let API_URL = "http://localhost:5500/api" as string;

const nav = document.querySelector(".nav") as HTMLDivElement;
const cartBtn = document.querySelector(".cart-btn") as HTMLButtonElement;
const signBtn = document.querySelector(".sign-btn") as HTMLButtonElement;

const jwt = localStorage.getItem("jwt") as string;

if (jwt) {
  signBtn.innerHTML = `
        <span class="material-icons" title="profile">person</span>
        Admin
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
    window.location.href = "myorders.html";
  } else {
    window.location.href = "SignIn.html";
  }
});

// DOM elements
const myOrdersP = document.querySelector("#myOrdersP") as HTMLParagraphElement;
const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;

cartBtn.addEventListener("click", () => {
  if (jwt) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "SignIn.html";
  }
});

signBtn.addEventListener("click", () => {
  if (jwt) {
    window.location.href = "myorders.html";
  } else {
    window.location.href = "SignIn.html";
  }
});

const profileBtn = document.createElement("button");
profileBtn.innerHTML = "Update Profile";

// located far right of the nav
profileBtn.style.position = "absolute";
profileBtn.style.right = "0";
profileBtn.style.top = "0";
profileBtn.style.margin = "2rem";
profileBtn.style.padding = "1rem";
profileBtn.style.borderRadius = "0.5rem";
profileBtn.style.backgroundColor = "grey";
profileBtn.style.color = "#fff";
profileBtn.style.cursor = "pointer";

myOrdersP.parentElement?.insertBefore(profileBtn, myOrdersP);

profileBtn.addEventListener("click", () => {
  window.location.href = "UserProfile.html";
});

// get orders
const getOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = await res.json();
    console.log(data);

    // display orders
    data.forEach((order: any) => {
      const row = document.createElement("tr");

      // format Thu, Feb 16, 2023, 9:54 AM
      const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "Africa/Nairobi",
      } as Intl.DateTimeFormatOptions);

      row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.userId}</td>
        <td>${orderDate}</td>
        <td>${order.totalPrice}</td>
        <td class="${
          order.isPaid ? "check" : "close"
        }"><span class="material-symbols-rounded">${
        order.isPaid ? "check" : "close"
      }</span></td>
        <td class="${
          order.isDelivered ? "check" : "close"
        }"><span class="material-symbols-rounded">${
        order.isDelivered ? "check" : "close"
      }</span></td>
        <td><button>DETAILS</button></td>
        `;

      tableBody.appendChild(row);
    });
  } catch (err) {
    console.log(err);
  }
};

tableBody.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.textContent === "DETAILS") {
    const orderId =
      target.parentElement?.previousElementSibling?.previousElementSibling
        ?.previousElementSibling?.previousElementSibling?.previousElementSibling
        ?.textContent;

    window.location.href = `Order.html?id=${orderId}`;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  getOrders();
});
