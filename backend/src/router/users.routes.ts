import express, { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  upgradeUserToAdmin,
  updateUserProfileByAdmin,
} from "../controllers/user.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

// Fetch all users - admin only
userRoutes.route("/").get(authenticateUser, authorizeAdmin, getAllUsers);

userRoutes.route("/signup").post(registerUser);

userRoutes.post("/signin", loginUser);

userRoutes.route("/profile").get(authenticateUser, getUserProfile);

userRoutes.route("/profile").put(authenticateUser, updateUserProfile);

userRoutes.route("/:id").get(authenticateUser, authorizeAdmin, getUserById);

userRoutes.route("/:id").delete(authenticateUser, authorizeAdmin, deleteUser);

userRoutes
  .route("/:id")
  .patch(authenticateUser, authorizeAdmin, upgradeUserToAdmin);

userRoutes
  .route("/:id")
  .put(authenticateUser, authorizeAdmin, updateUserProfileByAdmin);

export default userRoutes;
