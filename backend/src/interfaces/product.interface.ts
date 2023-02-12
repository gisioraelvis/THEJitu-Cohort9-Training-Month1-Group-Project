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
