import Joi from "joi";

export const AddToCartDTO = Joi.object({
  productId: Joi.number().required(),
  qty: Joi.number().required(),
});

export const UpdateCartItemDTO = Joi.object({
  productId: Joi.number().required(),
  qty: Joi.number().required(),
});

export const RemoveFromCartDTO = Joi.object({
  productId: Joi.number().required(),
});
