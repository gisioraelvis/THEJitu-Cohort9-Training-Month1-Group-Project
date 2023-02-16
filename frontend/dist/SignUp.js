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
/*
 <form action="">
            <label for="name">Name</label><br><br>
            <input type="text" name="name" id="name" placeholder="Enter Your name"><br><br>
            <label for="email">Email</label><br><br>
            <input type="email" name="email" id="email" placeholder="Enter Your email"><br><br>
            <label for="password1">password</label><br><br>
            <input type="password" name="password1" id="password1" placeholder="Enter Your password"><br><br>
            <label for="password2">Confirm password</label><br><br>
            <input type="password" name="password2" id="password2" placeholder="Enter Your password"><br><br>
            <button type="submit">SIGN UP</button>
            <P class="customer_enquiry">Existing Customer? <a href="SignIn.html">Sign In</a></P>
        </form>
*/
/*
POST api/users/sigup
sample request body
{
    "name": "Elvis",
    "email": "gisioraelvis2@gmail.com",
    "password": "@Gisioraelvis21",
    "confirmPassword": "@Gisioraelvis21"
}

sample response body
{
    "id": 7,
    "name": "Elvis",
    "email": "gisioraelvis2@gmail.com",
    "isAdmin": false,
    "JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkVsdmlzIiwiZW1haWwiOiJnaXNpb3JhZWx2aXMyQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzY0OTY5NTUsImV4cCI6MTY3NjU4MzM1NX0.DaFA9j5Aq2jYQxcPwpeC1B0QlJQKKpBxZ85eoB-cxPE"
}

set the JWT in the local storage as jwt
*/
const signUpForm = document.querySelector("form");
const signUpName = document.querySelector("#name");
const signUpEmail = document.querySelector("#email");
const signUpPassword1 = document.querySelector("#password1");
const signUpPassword2 = document.querySelector("#password2");
signUpForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = signUpName.value;
    const email = signUpEmail.value;
    const password1 = signUpPassword1.value;
    const password2 = signUpPassword2.value;
    // check if the passwords match
    if (password1 !== password2) {
        alert("Passwords do not match");
        return;
    }
    const res = yield fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password: password1,
            confirmPassword: password2,
        }),
    });
    const data = yield res.json();
    if (data.JWT) {
        localStorage.setItem("jwt", data.JWT);
        window.location.href = "index.html";
    }
    else {
        alert(data.message);
    }
}));
