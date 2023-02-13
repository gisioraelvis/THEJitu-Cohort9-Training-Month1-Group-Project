import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import dotenv from "dotenv";
import { Product } from "../interfaces/product.interface";
dotenv.config({ path: __dirname + "/../../.env" });

import {
  ProductCreateDto,
  ProductGetDto,
  ProductUpdateDto,
} from "../dtos/product.dto";

const dbUtils = new DatabaseUtils();

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await dbUtils.query("SELECT * FROM products");

    if (products.recordset.length > 0) {
      return res.status(200).json(products.recordset);
    }

    // if no products found return empty array
    if (products.recordset.length === 0) {
      return res.status(200).json(products.recordset);
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Fetch single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  try {
    const product = await dbUtils.exec("usp_FindProductById", {
      productId,
    });

    // TODO: return catories, brands and reviews as array of objects
    if (product.recordset.length > 0) {
      return res.status(200).json(product.recordset[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req: Request, res: Response) => {
  const { error } = ProductCreateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const {
    userId,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  try {
    const product = await dbUtils.exec("usp_CreateProduct", {
      userId,
      name,
      price,
      description,
      image,
      countInStock,
    });

    if (product.recordset.length > 0) {
      return res.status(201).json(product.recordset[0]);
    } else {
      return res.status(400).json({ message: "Product creation failed" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req: IRequestWithUser, res: Response) => {
  const { error } = ProductUpdateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const productId = req.params.id as string;

  const { id: userId } = req.user as IUser;

  const { name, price, description, image, countInStock } = req.body;

  try {
    const product = await dbUtils.exec("usp_FindProductById", { productId });

    if (product.recordset.length > 0) {
      const updatedProduct = await dbUtils.exec("usp_UpdateProduct", {
        id: productId,
        userId,
        name,
        price,
        description,
        image,
        countInStock,
      });

      if (updatedProduct.recordset.length > 0) {
        return res.status(200).json({
          updateProduct: updatedProduct.recordset[0],
        });
      } else {
        return res.status(400).json({ message: "Product update failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Product with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  try {
    const product = await dbUtils.exec("usp_FindProductById", { productId });

    if (product.recordset.length > 0) {
      const deletedProduct = await dbUtils.exec("usp_DeleteProductById", {
        id: productId,
      });

      if (
        deletedProduct.recordsets.length === 0 ||
        deletedProduct.recordset === undefined
      ) {
        return res.status(200).json({
          message: "Product deleted",
        });
      } else {
        return res.status(400).json({ message: "Product delete failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Product with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/* 
CREATE TABLE orders
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    shippingAddress VARCHAR(500) NOT NULL,
    paymentMethod VARCHAR(100) NOT NULL,
    paymentResultId VARCHAR(100) NOT NULL,
    paymentResultStatus VARCHAR(100) NOT NULL,
    paymentResultUpdateTime VARCHAR(100) NOT NULL,
    paymentResultEmailAddress VARCHAR(100) NOT NULL,
    taxPrice DECIMAL(10, 2) NOT NULL,
    shippingPrice DECIMAL(10, 2) NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    isPaid BIT NOT NULL DEFAULT 0,
    paidAt DATETIME,
    isDelivered BIT NOT NULL DEFAULT 0,
    deliveredAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE order_items
(
    orderId INT NOT NULL,
    productId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    qty INT NOT NULL,
    image VARCHAR(500) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (orderId, productId),
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);
*/

// /**
//  * @desc    Create new order
//  * @route   POST /api/orders
//  * @access  Private
//  */
// export const addOrderItems = async (req, res) => {
//   const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//   }

//   const order = new Order({
//     orderItems,
//     user: req.user._id,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   });

//   const createdOrder = await order.save();

//   res.status(201).json(createdOrder);
// };

// /**
//  * @desc    Get order by ID
//  * @route   GET /api/orders/:id
//  * @access  Private
//  */
// export const getOrderById = async (req, res) => {
//   const order = await Order.findById(req.params.id).populate(
//     "user",
//     "name email"
//   );

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// };

// /**
//  * @desc    Update order to paid
//  * @route   GET /api/orders/:id/pay
//  * @access  Private
//  */
// export const updateOrderToPaid = async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// };

// /**
//  * @desc    Update order to delivered
//  * @route   GET /api/orders/:id/deliver
//  * @access  Private/Admin
//  */
// export const updateOrderToDelivered = async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// };

// /**
//  * @desc    Get logged in user orders
//  * @route   GET /api/orders/myorders
//  * @access  Private
//  */
// export const getMyOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.json(orders);
// };

// /**
//  * @desc    Get all orders
//  * @route   GET /api/orders
//  * @access  Private/Admin
//  */
// const getOrders = async (req, res) => {
//   const orders = await Order.find({}).populate("user", "id name");
//   res.json(orders);
// };
