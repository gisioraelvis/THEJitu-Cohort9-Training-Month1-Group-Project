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
let API_URL = "http://localhost:5500/api";
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
/*
get order id from url e.g  Order.html?id=1010, append jwt token as bearer token to the request header
make get request to /api/orders/2

sample response
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
}

display order details
*/
const getOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = localStorage.getItem("jwt");
        const url = window.location.href;
        const orderId = url.split("=")[1];
        const res = yield fetch(`${API_URL}/orders/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });
        const data = yield res.json();
        // display order details
        displayOrderDetails(data);
    }
    catch (err) {
        console.log(err);
    }
});
const displayOrderDetails = (order) => {
    /*
          sample response
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
  }
      */
    // if any of the fields is undefined or null or empty string, display "Not Provided"
    const shippingAddress = order.shippingAddress || "Not Provided";
    const paymentMethod = order.paymentMethod || "Not Provided";
    const taxPrice = order.taxPrice || "Not Provided";
    const shippingPrice = order.shippingPrice || "Not Provided";
    const totalPrice = order.totalPrice || "Not Provided";
    const shippingState = order.isDelivered
        ? `Delivered At ${order.deliveredAt}`
        : "Not Delivered";
    const paymentState = order.isPaid ? `Paid At ${order.paidAt}` : "Not Paid";
    const orderDetails = document.createElement("div");
    orderDetails.classList.add("big");
    orderDetails.innerHTML = `
        <div class="twodivs">
            <!-- div one -->
            <div class="cartdetails">

                <p style="font-weight: bold;">Order ID:
                <p id="OrderId">${order.id}</p>
                </p>
                <hr>
                <p style="font-weight: bold;">Shipping To:</p>
                <p>Address: ${shippingAddress}</p>
                <p id="DeliveryState">${shippingState}</p>
                <hr>
                <p style="font-weight: bold;">Payment Method:</p>
                <p>${paymentMethod}</p>
                <p id="PaymentState">${paymentState}</p>
                <hr>
            </div>

            <!-- div two  -->
            <div class="ordersummarry">
                <p style="font-weight: bold; align-self: center;">Order Summary</p>
                <hr>
                <div style="justify-content: space-around;">
                    <p>Shipping:
                        KSH: ${shippingPrice}</p>
                </div>
                <hr>

                <div style="justify-content: space-around;">
                    <p>Tax:
                        KSH: ${taxPrice}</p>
                </div>
                <hr>

                <div style="justify-content: space-around;">
                    <p>Total:
                        KSH: ${totalPrice}</p>
                </div>
                <hr>
                    <p>Pat With M-pesa Xpress</p>
                    <input type="text" class="phonenumber"
                        style="background-color: grey; width: 100%;  border-radius: 5px;"
                        placeholder="Enter your M-Pesa ">
                    <button class="placebutton"> Pay</button>
            </div>

        </div>
    `;
    const big = document.querySelector(".big");
    big.appendChild(orderDetails);
};
window.addEventListener("DOMContentLoaded", () => {
    getOrder();
});
