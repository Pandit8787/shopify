export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  category: string;
  brand: string;
  tags: string[];
  images: string[];
  video?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  longDescription?: string;
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  featured?: boolean;
  isNew?: boolean;
  discountPercent?: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  size?: string;
  color?: string;
  priceSnapshot: number;
  title: string;
  image: string;
}

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wallet: number;
  rewardPoints: number;
  addresses: Address[];
  referralCode: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "refunded";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  tracking?: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  tag?: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  description: string;
  active: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "order" | "offer" | "system" | "reward";
}

export interface ListParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
  colors?: string[];
  sizes?: string[];
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  hasMore: boolean;
}
