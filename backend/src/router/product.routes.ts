import express from "express";
import {
  getAllProducts,
  // getProductById,
  // deleteProduct,
  // createProduct,
  // updateProduct,
  // createProductReview,
  // getTopProducts,
} from "../controllers/product.controller";

import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const productRoutes = express.Router();

productRoutes.route("/").get(getAllProducts);

// productRoutes
//   .route("/")
//   .get(getProducts)
//   .post(authenticateUser, authorizeAdmin, createProduct);

// productRoutes.route("/:id/reviews").post(authenticateUser, createProductReview);

// productRoutes.get("/top", getTopProducts);

// productRoutes
//   .route("/:id")
//   .get(getProductById)
//   .delete(authenticateUser, authorizeAdmin, deleteProduct)
//   .put(authenticateUser, authorizeAdmin, updateProduct);

export default productRoutes;
