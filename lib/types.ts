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

export interface ShopifyProductVariant {
  gid: string;
  selectedOptions: { name: string; value: string }[];
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
  variantNodes: ShopifyProductVariant[];
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
  variantGid: string;
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

// ------- Auth -------

export interface ShopifyAddress {
  address1: string;
  city: string;
  country: string;
  zip: string;
}

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  defaultAddress: ShopifyAddress | null;
}

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

// ------- Account -------

export interface ShopifyMailingAddress {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  address1: string;
  address2: string | null;
  city: string;
  province: string | null;
  zip: string;
  country: string;
  phone: string | null;
}

export interface ShopifyAddressInput {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

export interface ShopifyOrderLineItem {
  title: string;
  quantity: number;
  variant: {
    image: { url: string; altText: string | null } | null;
    price: { amount: string; currencyCode: string };
  } | null;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  subtotalPrice: { amount: string; currencyCode: string };
  totalShippingPrice: { amount: string; currencyCode: string };
  totalTax: { amount: string; currencyCode: string };
  lineItems: ShopifyOrderLineItem[];
  shippingAddress: ShopifyMailingAddress | null;
  statusUrl: string;
}
