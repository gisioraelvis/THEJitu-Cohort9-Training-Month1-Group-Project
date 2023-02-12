import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/product.controller";

import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authenticateUser, authorizeAdmin, createProduct);
router.route("/:id/reviews").post(authenticateUser, createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(authenticateUser, authorizeAdmin, deleteProduct)
  .put(authenticateUser, authorizeAdmin, updateProduct);

export default router;
