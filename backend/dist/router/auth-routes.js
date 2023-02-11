"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const verify_jwt_1 = require("../middlewares/verify-jwt");
const authroute = (0, express_1.Router)();
// An endpoint that registers users
authroute.post("/register", user_controller_1.RegisterUser);
// An Endpoint that Allows user to reset a password.
authroute.post("/reset-password", user_controller_1.ResetPassword);
// An endpoint that we can use to Search users by name
authroute.get("/search-user-by-name", verify_jwt_1.VerifyToken, user_controller_1.SearchUser); // Protected route
exports.default = authroute;
