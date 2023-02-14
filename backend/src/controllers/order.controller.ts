import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { CreateOrderDTO } from "../dtos/order.dto";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req: IRequestWithUser, res: Response) => {
  const { error } = CreateOrderDTO.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  const { id: userId } = req.user as IUser;

  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  // create order
  const order = await dbUtils.exec("usp_CreateOrder", {
    userId,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  if (order.recordset.length > 0) {
    const { id: orderId } = order.recordset[0];
    // create order item
    orderItems.forEach(async (item: any) => {
      await dbUtils.exec("usp_CreateOrderItem", {
        orderId,
        productId: item.product,
        qty: item.qty,
      });
    });

    return res.status(201).json({ message: "Order created successfully" });
  } else {
    return res.status(500).json({ message: "Unable to create order" });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

    if (order.recordset.length > 0) {
      return res.status(200).json(order.recordset[0]);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update order to paid
 * @route   GET /api/orders/:id/pay
 * @access  Private
 */
export const updateOrderToPaid = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    id: paymentResultId,
    status: paymentResultStatus,
    update_time: paymentResultUpdateTime,
    payer: { email_address: paymentResultEmailAddress },
  } = req.body;

  try {
    const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

    if (order.recordset.length > 0) {
      await dbUtils.exec("usp_UpdateOrderToPaid", {
        id,
        paymentResultId,
        paymentResultStatus,
        paymentResultUpdateTime,
        paymentResultEmailAddress,
      });

      return res.status(200).json({ message: "Order updated successfully" });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update order to delivered
 * @route   GET /api/orders/:id/deliver
 * @access  Private/Admin
 */
export const updateOrderToDelivered = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

    if (order.recordset.length > 0) {
      await dbUtils.exec("usp_UpdateOrderToDelivered", { id });

      return res.status(200).json({ message: "Order updated successfully" });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = async (req: IRequestWithUser, res: Response) => {
  const { id: userId } = req.user as IUser;

  try {
    const orders = await dbUtils.query(
      `SELECT * FROM orders WHERE userId=${userId}`
    );

    if (orders.recordset.length > 0) {
      return res.status(200).json(orders.recordset);
    } else {
      return res.status(404).json({ message: "Orders not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await dbUtils.query(`SELECT * FROM orders`);

    if (orders.recordset.length > 0) {
      return res.status(200).json(orders.recordset);
    } else {
      return res.status(404).json({ message: "Orders not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};
