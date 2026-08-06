export type Currency = 'VND' | 'USD';
export type Language = 'VI' | 'EN';

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase?: boolean;
}

export interface Product {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  category: 'fashion' | 'decor' | 'furniture' | 'beauty' | 'accessories';
  categoryLabel: string;
  priceVND: number;
  priceUSD: number;
  originalPriceVND?: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  badges?: string[]; // e.g. ['NEW', 'HOT', '-25%', 'BESTSELLER']
  isFlashSale?: boolean;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  description: string;
  descriptionEn?: string;
  specifications: Record<string, string>;
  features: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 50000 for VND
  minSpendVND: number;
  minSpendUSD: number;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotalVND: number;
  subtotalUSD: number;
  discountVND: number;
  discountUSD: number;
  shippingVND: number;
  shippingUSD: number;
  totalVND: number;
  totalUSD: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    notes?: string;
  };
  paymentMethod: 'cod' | 'momo_qr' | 'bank_transfer' | 'card';
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  orders: Order[];
}

export type ViewPage = 'home' | 'shop' | 'product-detail' | 'about' | 'contact' | 'account' | 'checkout-success';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
  image?: string;
}
