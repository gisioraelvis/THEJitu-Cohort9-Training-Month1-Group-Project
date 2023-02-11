import express, { Request, Response, NextFunction } from "express";
import {
  authUser,
  registerUser,
  // getUserProfile,
  // updateUserProfile,
  // getUsers,
  // deleteUser,
  // getUserById,
  // updateUser,
} from "../controllers/user.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

// Fetch all users - admin only
// userRoutes
//   .route("/")
//   .get(authenticateUser, authorizeAdmin, getUsers);

userRoutes.route("/signup").post(registerUser);

userRoutes.post("/signin", authUser);

// // User profile
// userRoutes
//   .route("/profile")
//   .get(authenticateUser, getUserProfile)
//   .put(authenticateUser, updateUserProfile);

// // Admin only - delete, update, get user by id
// userRoutes
//   .route("/:id")
//   .delete(authenticateUser, authorizeAdmin, deleteUser)
//   .get(authenticateUser, authorizeAdmin, getUserById)
//   .put(authenticateUser, authorizeAdmin, updateUser);

export default userRoutes;
