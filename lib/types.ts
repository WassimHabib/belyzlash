export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface ProductVariation {
  id: number;
  attributes: { name: string; option: string }[];
  price: string;
  stock_status: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variations: number[];
  categories: { id: number; name: string; slug: string }[];
  stock_status: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface CartItem {
  productId: number;
  variationId?: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface OrderLineItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
}

export interface OrderBilling {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CreateOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: OrderBilling;
  shipping: OrderBilling;
  line_items: OrderLineItem[];
}
