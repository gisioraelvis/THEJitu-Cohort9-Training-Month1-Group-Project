import Joi from "joi";

// Create new order DTO
export const CreateOrderDTO = Joi.object({
  orderItems: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      qty: Joi.number().required(),
    })
  ),
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  totalPrice: Joi.number().required(),
});
