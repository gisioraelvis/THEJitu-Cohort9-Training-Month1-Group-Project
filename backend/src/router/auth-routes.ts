import { Router } from "express";
import {
  RegisterUser,
  ResetPassword,
  SearchUser,
} from "../controllers/user-controller";
import { VerifyToken } from "../middlewares/verify-jwt";

const authroute = Router();

// An endpoint that registers users
authroute.post("/register", RegisterUser);

// An Endpoint that Allows user to reset a password.
authroute.post("/reset-password", ResetPassword);

// An endpoint that we can use to Search users by name
authroute.get("/search-user-by-name", VerifyToken, SearchUser); // Protected route

export default authroute;
