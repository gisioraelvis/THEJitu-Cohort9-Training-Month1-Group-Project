import express, { Request, Response, NextFunction } from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Fetch all users - admin only
router
  .route("/")
  .post(registerUser)
  .get(authenticateUser, authorizeAdmin, getUsers);

// User sign in
router.post("/signin", authUser);

// User profile
router
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .put(authenticateUser, updateUserProfile);

// Admin only - delete, update, get user by id
router
  .route("/:id")
  .delete(authenticateUser, authorizeAdmin, deleteUser)
  .get(authenticateUser, authorizeAdmin, getUserById)
  .put(authenticateUser, authorizeAdmin, updateUser);

export default router;
