var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let API_URL = "http://localhost:5500/api";
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
        Admin
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
        window.location.href = "myorders.html";
    }
    else {
        window.location.href = "SignIn.html";
    }
});
// DOM elements
const myOrdersP = document.querySelector("#myOrdersP");
const tableBody = document.querySelector("tbody");
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
        window.location.href = "myorders.html";
    }
    else {
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
(_a = myOrdersP.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(profileBtn, myOrdersP);
profileBtn.addEventListener("click", () => {
    window.location.href = "UserProfile.html";
});
// get orders
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${API_URL}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });
        const data = yield res.json();
        console.log(data);
        /* Sample response
        [
        {
            "id": 1,
            "userId": 8,
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
            "createdAt": "2023-02-15T23:12:38.303Z",
            "updatedAt": "2023-02-15T23:12:38.303Z"
        },
        {
            "id": 2,
            "userId": 8,
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
            "createdAt": "2023-02-15T23:15:08.730Z",
            "updatedAt": "2023-02-15T23:15:08.730Z"
        }]
        
        */
        // display orders
        data.forEach((order) => {
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
            });
            row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.userId}</td>
        <td>${orderDate}</td>
        <td>${order.totalPrice}</td>
        <td class="${order.isPaid ? "check" : "close"}"><span class="material-symbols-rounded">${order.isPaid ? "check" : "close"}</span></td>
        <td class="${order.isDelivered ? "check" : "close"}"><span class="material-symbols-rounded">${order.isDelivered ? "check" : "close"}</span></td>
        <td><button>DETAILS</button></td>
        `;
            tableBody.appendChild(row);
        });
    }
    catch (err) {
        console.log(err);
    }
});
tableBody.addEventListener("click", (e) => {
    var _a, _b, _c, _d, _e, _f;
    const target = e.target;
    if (target.textContent === "DETAILS") {
        const orderId = (_f = (_e = (_d = (_c = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.previousElementSibling) === null || _c === void 0 ? void 0 : _c.previousElementSibling) === null || _d === void 0 ? void 0 : _d.previousElementSibling) === null || _e === void 0 ? void 0 : _e.previousElementSibling) === null || _f === void 0 ? void 0 : _f.textContent;
        window.location.href = `Order.html?id=${orderId}`;
    }
});
window.addEventListener("DOMContentLoaded", () => {
    getOrders();
});
export {};
