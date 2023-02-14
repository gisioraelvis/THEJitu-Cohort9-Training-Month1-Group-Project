import express from "express";
import {
  createOrder,
  getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/order.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware";

const orderRoutes = express.Router();

orderRoutes
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizeAdmin, getOrders);

orderRoutes.route("/myorders").get(authenticateUser, getMyOrders);

orderRoutes.route("/:id").get(authenticateUser, getOrderById);
orderRoutes.route("/:id/pay").put(authenticateUser, updateOrderToPaid);
orderRoutes
  .route("/:id/deliver")
  .put(authenticateUser, authorizeAdmin, updateOrderToDelivered);

export default orderRoutes;
