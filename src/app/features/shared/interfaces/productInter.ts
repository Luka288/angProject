import { Pagination } from './pagination';

export interface PaginatedProduct extends Pagination {
  products: Product[];
}

export interface Product {
  price: ProductPrice;
  category: ProductCategory;
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
}

export interface ProductPrice {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface ProductDisplay extends Product {
  index: number;
}

export interface ProductCache {
  total: number;
  limit: number;
  skip: number;
  products: Product[];
}

export interface ProductCacheItem {
  index: number;
}
