let API_URL = "http://localhost:5500/api" as string;

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
    window.location.href = "myorders.html";
  } else {
    window.location.href = "SignIn.html";
  }
});

// create btn with inline styles just below the nav that redirect user to update profile page
const updateProfileBtn = document.createElement("button");
updateProfileBtn.innerHTML = "Update Profile";


const getOrder = async () => {
  try {
    const jwt = localStorage.getItem("jwt") as string;
    const url = window.location.href;
    const orderId = url.split("=")[1];

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();

    // display order details
    displayOrderDetails(data);
  } catch (err) {
    console.log(err);
  }
};

const displayOrderDetails = (order: any) => {
  // if any of the fields is undefined or null or empty string, display "Not Provided"
  const shippingAddress = order.shippingAddress || "Not Provided";
  const paymentMethod = order.paymentMethod || "Not Provided";
  const taxPrice = order.taxPrice || "Not Provided";
  const shippingPrice = order.shippingPrice || "Not Provided";
  const totalPrice = order.totalPrice || "750";

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

  const big = document.querySelector(".big") as HTMLElement;
  big.appendChild(orderDetails);
};

window.addEventListener("DOMContentLoaded", () => {
  getOrder();
});
