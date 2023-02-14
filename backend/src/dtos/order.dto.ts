import Joi from "joi";

// Create new order DTO
export const CreateOrderDTO = Joi.object({
  orderItems: Joi.array().items(
    Joi.object({
      qty: Joi.number().required(),
      productId: Joi.string().required(),
    })
  ),
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  totalPrice: Joi.number().required(),
});
