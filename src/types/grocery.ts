export type ProductCategory =
  | 'fruits-vegetables'
  | 'dairy-eggs'
  | 'atta-rice-dal'
  | 'oil-ghee'
  | 'masala-spices'
  | 'snacks-munchies'
  | 'biscuits-cookies'
  | 'chocolates-sweets'
  | 'beverages-juices'
  | 'breakfast-cereals'
  | 'instant-noodles'
  | 'bakery-breads'
  | 'dry-fruits-nuts'
  | 'household-cleaning'
  | 'pooja-essentials'
  | 'baby-care'
  | 'pet-supplies'
  | 'frozen-foods'
  | 'sauces-spreads';

export interface ProductVariant {
  id: string;
  sku: string;
  barcode?: string;
  weight: string;
  unit: string;
  price: number;
  mrp: number;
  stock: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory | string;
  categorySlug?: string;
  categoryName: string;
  subcategory: string;
  description: string;
  shortDescription?: string;
  images: string[];
  primaryImage: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  weight: string;
  unit: string;
  stock: number;
  lowStockThreshold: number;
  sku: string;
  barcode?: string;
  rating: number;
  ratingCount?: number;
  reviewCount: number;
  reviews: ProductReview[];
  variants?: ProductVariant[];
  ingredients?: string[];
  nutritionInfo?: {
    calories?: string;
    fat?: string;
    protein?: string;
    carbs?: string;
    sodium?: string;
  };
  highlights: string[];
  tags: string[];
  isOrganic?: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  color?: string;
  subcategories?: Subcategory[];
}

export type CategoryInfo = Category;

export interface CartItem {
  id?: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  mrp: number;
  quantity: number;
  product: Product;
  selectedPrice?: number;
  selectedMrp?: number;
  selectedWeight?: string;
}

export interface Coupon {
  id?: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate?: string;
  expiresAt?: string;
  usageLimit?: number;
  usedCount?: number;
  isActive?: boolean;
  applicableCategories?: string[];
}

export interface Offer {
  id: string;
  title: string;
  tagline: string;
  code?: string;
  discount: string;
  bannerImage: string;
  category?: ProductCategory;
  bgGradient: string;
  expiry: string;
  badge: string;
}

export interface Address {
  id: string;
  userId?: string;
  name?: string;
  fullName?: string;
  phone: string;
  flatNo?: string;
  houseFlat?: string;
  street?: string;
  buildingStreet?: string;
  landmark?: string;
  area?: string;
  city: string;
  state?: string;
  pincode: string;
  type: 'home' | 'work' | 'other' | 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'packed'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimeline {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  createdAt?: string;
  items: CartItem[];
  totalAmount: number;
  finalTotal?: number;
  savings: number;
  deliveryFee: number;
  handlingFee: number;
  appliedCoupon?: string;
  deliveryAddress: Address;
  deliverySlot: string;
  status: OrderStatus | 'confirmed';
  paymentMethod: 'upi' | 'cod' | 'card' | 'wallet' | 'netbanking' | 'external_gateway';
  notes?: string;
  estimatedDelivery?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'member';
  addresses: Address[];
  avatar?: string;
  isVip?: boolean;
  walletBalance?: number;
  hasFreeDeliveryPass?: boolean;
  memberSince?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'offer' | 'system';
  linkTab?: 'orders' | 'coupons' | 'profile';
}

export interface DailySubscription {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  weight: string;
  quantity: number;
  frequency: 'daily' | 'alternate' | 'weekdays' | 'custom';
  customDays?: string[];
  slot: string;
  startDate: string;
  status: 'active' | 'paused' | 'cancelled';
  nextDeliveryDate: string;
  addressId?: string;
}

export interface StoreSettings {
  storeName: string;
  supportPhone: string;
  supportEmail: string;
  operatingHours: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  handlingFee: number;
  minimumOrder: number;
  expressDeliveryMinutes: number;
  currency: string;
  isStoreOpen: boolean;
  allowCashOnDelivery: boolean;
  gstRate: number;
  // External Payment Gateway URL & Config
  customPaymentGatewayUrl?: string;
  paymentApiKey?: string;
  paymentWebhookSecret?: string;
  enableExternalPaymentUrl?: boolean;
  // Supabase Cloud Storage & DB Integration
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseServiceRoleKey?: string;
  enableSupabaseSync?: boolean;
}

export type StitchScreen = 
  | 'home'
  | 'search'
  | 'category'
  | 'categories'
  | 'reorder'
  | 'profile'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'order_success'
  | 'order_tracking'
  | 'my_orders'
  | 'offers_deals'
  | 'daily_subscriptions'
  | 'wishlist'
  | 'saved_addresses'
  | 'notifications'
  | 'account'
  | 'empty_states';
