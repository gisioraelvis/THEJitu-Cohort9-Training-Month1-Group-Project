import Joi, { ref } from "joi";

/* 
export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  user: string;
  name: string;
  image: string;
  description: string;
  brands: Brand[];
  categories: Category[];
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt?: string;
  updatedAt?: string;
}
*/

// Create a new product
export const ProductCreateDto = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  countInStock: Joi.number().required(),
});

// Get a product by id
export const ProductGetDto = Joi.object({
  id: Joi.string().required(),
});

// Update a product by id
export const ProductUpdateDto = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  countInStock: Joi.number().required(),
});

// Delete a product by id
export const ProductDeleteDto = Joi.object({
  id: Joi.string().required(),
});

// Create a new brand
export const BrandCreateDto = Joi.object({
  name: Joi.string().required(),
});

// Get a brand by id
export const BrandGetDto = Joi.object({
  id: Joi.string().required(),
});

// Update a brand by id
export const BrandUpdateDto = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});

// Delete a brand by id
export const BrandDeleteDto = Joi.object({
  id: Joi.string().required(),
});

// Create a new category
export const CategoryCreateDto = Joi.object({
  name: Joi.string().required(),
});

// Get a category by id
export const CategoryGetDto = Joi.object({
  id: Joi.string().required(),
});

// Update a category by id
export const CategoryUpdateDto = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});

// Delete a category by id
export const CategoryDeleteDto = Joi.object({
  id: Joi.string().required(),
});
