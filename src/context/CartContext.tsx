import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CartItem, Product, ProductVariant, Coupon, Address, Order, OrderStatus, StoreSettings, UserProfile, NotificationItem, DailySubscription } from '../types/grocery';
import { COUPONS } from '../data/categories';
import rawProductsData from '../data/products.json';

export type AccountTab = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'coupons' | 'notifications' | 'settings' | 'help';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
  clearCart: () => void;
  
  // Products Catalog (Live Sync & Storefront)
  products: Product[];
  addProduct: (newProd: Product) => void;
  updateProduct: (updatedProd: Product) => void;
  deleteProduct: (productId: string) => void;

  // Pricing
  totalItemsCount: number;
  itemTotal: number;
  mrpTotal: number;
  savings: number;
  deliveryFee: number;
  handlingFee: number;
  couponDiscount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  finalTotal: number;

  // Address & Delivery
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  savedAddresses: Address[];
  addAddress: (addr: Address) => void;
  deliveryType: 'instant' | 'scheduled';
  setDeliveryType: (type: 'instant' | 'scheduled') => void;
  selectedSlot: string;
  setSelectedSlot: (slot: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (paymentMethod: 'upi' | 'cod' | 'card' | 'wallet' | 'external_gateway', notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;

  // User Profile & Authentication
  currentUser: UserProfile | null;
  isLoggedIn: boolean;
  walletBalance: number;
  useWalletBalance: boolean;
  setUseWalletBalance: (use: boolean) => void;
  walletDiscount: number;
  applyReferralCode: (code: string) => { success: boolean; message: string };
  buyFreeDeliveryPass: (planName: string) => { success: boolean; message: string };
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (emailOrPhone: string) => Promise<{ success: boolean; message?: string }>;

  // UI Drawer / Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeQuickViewProduct: Product | null;
  setActiveQuickViewProduct: (prod: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Auth & Account Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot', returnAction?: () => void) => void;
  closeAuthModal: () => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  accountActiveTab: AccountTab;
  setAccountActiveTab: (tab: AccountTab) => void;
  openAccountModal: (tab?: AccountTab) => void;
  closeAccountModal: () => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;

  // Subscriptions
  subscriptions: DailySubscription[];
  addSubscription: (sub: DailySubscription) => void;
  toggleSubscriptionPause: (id: string) => void;
  cancelSubscription: (id: string) => void;
}

const DEFAULT_SUBSCRIPTIONS: DailySubscription[] = [
  {
    id: 'sub-1',
    productId: 'prod-4',
    productName: 'Nandini GoodLife Toned Milk',
    productImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    productPrice: 30,
    weight: '500 ml',
    quantity: 2,
    frequency: 'daily',
    slot: '6:30 AM - 7:30 AM',
    startDate: '2025-01-01',
    status: 'active',
    nextDeliveryDate: 'Tomorrow at 7:00 AM'
  },
  {
    id: 'sub-2',
    productId: 'prod-5',
    productName: 'Farm Fresh Country Eggs (Pack of 6)',
    productImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&auto=format&fit=crop&q=80',
    productPrice: 65,
    weight: '6 pcs',
    quantity: 1,
    frequency: 'alternate',
    slot: '6:30 AM - 7:30 AM',
    startDate: '2025-01-05',
    status: 'active',
    nextDeliveryDate: 'Day after tomorrow at 7:00 AM'
  }
];

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    type: 'home',
    name: 'Aditya',
    phone: '+91 98765 43210',
    flatNo: 'B12',
    street: 'Kranti Maidan, Vikhroli West',
    landmark: 'Near Kranti Ground',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400079',
    isDefault: true
  },
  {
    id: 'addr-2',
    type: 'work',
    name: 'Aditya (Office)',
    phone: '+91 98765 43210',
    flatNo: '6th Floor, Godrej One',
    street: 'Pirojshanagar, Vikhroli East',
    landmark: 'Near Eastern Express Highway',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400079',
    isDefault: false
  }
];

const DEFAULT_USER: UserProfile = {
  id: 'usr-1',
  name: 'Aditya',
  email: 'aditya@freshmart.in',
  phone: '+91 98765 43210',
  role: 'customer',
  addresses: DEFAULT_ADDRESSES,
  isVip: true,
  walletBalance: 0,
  hasFreeDeliveryPass: false,
  memberSince: 'September 2024',
  createdAt: '2024-09-01T10:00:00.000Z'
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🚚 Order Placed & Packing',
    message: 'Order #FM-772914 is being packed at your nearby Vikhroli, Mumbai dark store. ETA 21 mins!',
    timestamp: '5 mins ago',
    read: false,
    type: 'order',
    linkTab: 'orders'
  },
  {
    id: 'notif-2',
    title: '🏷️ Weekend Super Saver',
    message: 'Get flat ₹100 OFF on orders above ₹499 with code FRESH100. Valid today only!',
    timestamp: '1 hour ago',
    read: false,
    type: 'offer',
    linkTab: 'coupons'
  },
  {
    id: 'notif-3',
    title: '🥛 Fresh Milk & Bananas Restocked',
    message: 'Amul Taaza Toned Milk & Fresh Organic Bananas are back in store at wholesale rates.',
    timestamp: 'Yesterday',
    read: true,
    type: 'system',
    linkTab: 'profile'
  }
];

const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Freshmart Express Mumbai',
  supportPhone: '+91 22 2847 4455',
  supportEmail: 'support@freshmart.in',
  operatingHours: '6:00 AM - 12:00 AM Daily',
  deliveryFee: 25,
  freeDeliveryThreshold: 199,
  handlingFee: 4,
  minimumOrder: 49,
  expressDeliveryMinutes: 10,
  currency: '₹',
  isStoreOpen: true,
  allowCashOnDelivery: true,
  gstRate: 5,
  customPaymentGatewayUrl: 'https://api.razorpay.com/v1/checkout/embedded',
  enableExternalPaymentUrl: false,
  supabaseUrl: 'https://freshmart-project.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.freshmart-anon-key-placeholder',
  enableSupabaseSync: true
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_products');
      return saved ? JSON.parse(saved) : (rawProductsData as Product[]);
    } catch {
      return rawProductsData as Product[];
    }
  });

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('freshmart_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>(() => {
    return savedAddresses.find(a => a.isDefault) || savedAddresses[0] || DEFAULT_ADDRESSES[0];
  });

  const [deliveryType, setDeliveryType] = useState<'instant' | 'scheduled'>('instant');
  const [selectedSlot, setSelectedSlot] = useState<string>('Express in 10 mins');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_orders');
      if (saved) return JSON.parse(saved);
      const initialProducts = rawProductsData as Product[];
      return [
        {
          id: 'ord-101',
          orderNumber: 'FM-772914',
          date: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
          createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
          items: [
            {
              id: 'item-101-1',
              productId: initialProducts[0]?.id || 'prod-1',
              name: initialProducts[0]?.name || 'Fresh Hybrid Tomatoes',
              image: initialProducts[0]?.primaryImage || '',
              weight: '1 kg',
              price: initialProducts[0]?.price || 38,
              mrp: initialProducts[0]?.mrp || 50,
              quantity: 2,
              product: initialProducts[0]
            }
          ],
          totalAmount: 80,
          finalTotal: 80,
          savings: 24,
          deliveryFee: 0,
          handlingFee: 4,
          deliveryAddress: DEFAULT_ADDRESSES[0],
          deliverySlot: 'Instant Delivery (10 mins)',
          status: 'preparing',
          paymentMethod: 'upi',
          notes: 'Leave at security gate',
          estimatedDelivery: '10 Mins'
        },
        {
          id: 'ord-102',
          orderNumber: 'FM-651842',
          date: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          items: [
            {
              id: 'item-102-1',
              productId: initialProducts[1]?.id || 'prod-2',
              name: initialProducts[1]?.name || 'Organic Robusta Bananas',
              image: initialProducts[1]?.primaryImage || '',
              weight: '500 g',
              price: initialProducts[1]?.price || 32,
              mrp: initialProducts[1]?.mrp || 45,
              quantity: 1,
              product: initialProducts[1]
            }
          ],
          totalAmount: 36,
          finalTotal: 36,
          savings: 13,
          deliveryFee: 0,
          handlingFee: 4,
          deliveryAddress: DEFAULT_ADDRESSES[1],
          deliverySlot: 'Instant Delivery (10 mins)',
          status: 'delivered',
          paymentMethod: 'card',
          estimatedDelivery: 'Delivered'
        }
      ];
    } catch {
      return [];
    }
  });

  const [subscriptions, setSubscriptions] = useState<DailySubscription[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_subscriptions');
      return saved ? JSON.parse(saved) : DEFAULT_SUBSCRIPTIONS;
    } catch {
      return DEFAULT_SUBSCRIPTIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshmart_subscriptions', JSON.stringify(subscriptions));
    } catch {
      // ignore
    }
  }, [subscriptions]);

  const addSubscription = useCallback((sub: DailySubscription) => {
    setSubscriptions(prev => [sub, ...prev]);
  }, []);

  const toggleSubscriptionPause = useCallback((id: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'active' ? 'paused' : 'active' };
      }
      return s;
    }));
  }, []);

  const cancelSubscription = useCallback((id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  }, []);

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('freshmart_store_settings');
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('freshmart_auth_user');
      if (saved === 'null') return null;
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const isLoggedIn = currentUser !== null;

  // Auth & Account Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [postAuthCallback, setPostAuthCallback] = useState<(() => void) | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountActiveTab, setAccountActiveTab] = useState<AccountTab>('profile');
  const [useWalletBalance, setUseWalletBalance] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('freshmart_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  const openAuthModal = useCallback((mode: 'login' | 'signup' | 'forgot' = 'login', returnAction?: () => void) => {
    setAuthModalMode(mode);
    if (returnAction) {
      setPostAuthCallback(() => returnAction);
    } else {
      setPostAuthCallback(null);
    }
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPostAuthCallback(null);
  }, []);

  const openAccountModal = useCallback((tab: AccountTab = 'profile') => {
    setAccountActiveTab(tab);
    setIsAccountModalOpen(true);
  }, []);

  const closeAccountModal = useCallback(() => {
    setIsAccountModalOpen(false);
  }, []);

  const login = async (emailOrPhone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!emailOrPhone.trim()) {
      return { success: false, error: 'Please enter your mobile number or email' };
    }
    await new Promise(r => setTimeout(r, 400));
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0].replace('.', ' ') : 'Rahul Sharma',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'rahul.sharma@example.com',
      phone: emailOrPhone.startsWith('+') || /^\d+$/.test(emailOrPhone) ? emailOrPhone : '+91 98765 43210',
      role: 'customer',
      addresses: savedAddresses,
      isVip: true,
      memberSince: 'September 2024',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    localStorage.setItem('freshmart_auth_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    if (postAuthCallback) {
      postAuthCallback();
      setPostAuthCallback(null);
    }
    return { success: true };
  };

  const signup = async (name: string, email: string, phone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!name.trim()) {
      return { success: false, error: 'Full name is required' };
    }
    if (!phone.trim()) {
      return { success: false, error: 'Phone number is required' };
    }
    await new Promise(r => setTimeout(r, 400));
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || `${phone.replace(/\D/g, '')}@freshmart.in`,
      phone: phone.trim(),
      role: 'customer',
      addresses: savedAddresses,
      isVip: true,
      memberSince: 'Just joined',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    localStorage.setItem('freshmart_auth_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    if (postAuthCallback) {
      postAuthCallback();
      setPostAuthCallback(null);
    }
    return { success: true };
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.setItem('freshmart_auth_user', 'null');
    setIsAccountModalOpen(false);
  }, []);

  const updateProfile = useCallback((updated: Partial<UserProfile>) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updated };
      localStorage.setItem('freshmart_auth_user', JSON.stringify(next));
      return next;
    });
  }, []);

  const changePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    if (newPass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters' };
    }
    await new Promise(r => setTimeout(r, 300));
    return { success: true };
  };

  const forgotPassword = async (emailOrPhone: string): Promise<{ success: boolean; message?: string }> => {
    if (!emailOrPhone.trim()) {
      return { success: false, message: 'Please enter your registered mobile number or email' };
    }
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: `Reset link & 4-digit code sent to ${emailOrPhone}` };
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const next = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('freshmart_notifications', JSON.stringify(next));
      return next;
    });
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => {
      const next = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('freshmart_notifications', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    localStorage.setItem('freshmart_notifications', JSON.stringify([]));
  }, []);

  useEffect(() => {
    localStorage.setItem('freshmart_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('freshmart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('freshmart_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('freshmart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('freshmart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('freshmart_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  useEffect(() => {
    localStorage.setItem('freshmart_store_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Fast O(1) quantity lookup map
  const itemQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const key = item.variantId ? `${item.productId}_${item.variantId}` : item.productId;
      map[key] = item.quantity;
    }
    return map;
  }, [items]);

  const addToCart = useCallback((product: Product, variant?: ProductVariant) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.productId === product.id && 
        (variant ? item.variantId === variant.id : !item.variantId)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      }

      const activePrice = variant ? variant.price : product.price;
      const activeMrp = variant ? variant.mrp : product.mrp;
      const activeWeight = variant ? variant.weight : product.weight;

      return [...prev, {
        productId: product.id,
        variantId: variant?.id,
        name: product.name,
        image: product.primaryImage,
        weight: activeWeight,
        price: activePrice,
        mrp: activeMrp,
        quantity: 1,
        product
      }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, variantId?: string) => {
    setItems(prev => prev.filter(item => !(item.productId === productId && item.variantId === variantId)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems(prev => prev.map(item => {
      if (item.productId === productId && item.variantId === variantId) {
        return { ...item, quantity };
      }
      return item;
    }));
  }, [removeFromCart]);

  const getItemQuantity = useCallback((productId: string, variantId?: string) => {
    const key = variantId ? `${productId}_${variantId}` : productId;
    return itemQuantityMap[key] || 0;
  }, [itemQuantityMap]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  // Memoized Cart Calculations
  const { totalItemsCount, itemTotal, mrpTotal, baseSavings, deliveryFee, handlingFee, couponDiscount, savings, finalTotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    let mrp = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      count += item.quantity;
      total += item.price * item.quantity;
      mrp += item.mrp * item.quantity;
    }

    const baseSav = mrp > total ? mrp - total : 0;
    const hasPass = currentUser?.hasFreeDeliveryPass || false;
    const delFee = total === 0 ? 0 : (hasPass || total >= 199 ? 0 : 25);
    const handFee = total === 0 ? 0 : 5;

    let cDiscount = 0;
    if (appliedCoupon && total > 0) {
      if (total >= appliedCoupon.minOrderValue) {
        if (appliedCoupon.discountType === 'flat') {
          cDiscount = appliedCoupon.discountValue;
        } else if (appliedCoupon.discountType === 'percentage') {
          const disc = Math.round((total * appliedCoupon.discountValue) / 100);
          cDiscount = appliedCoupon.maxDiscount ? Math.min(disc, appliedCoupon.maxDiscount) : disc;
        }
      }
    }

    const subtotalAfterCoupon = Math.max(0, total + delFee + handFee - cDiscount);
    const userWallet = currentUser?.walletBalance || 0;
    const wDiscount = useWalletBalance ? Math.min(userWallet, subtotalAfterCoupon) : 0;

    return {
      totalItemsCount: count,
      itemTotal: total,
      mrpTotal: mrp,
      baseSavings: baseSav,
      deliveryFee: delFee,
      handlingFee: handFee,
      couponDiscount: cDiscount,
      walletDiscount: wDiscount,
      savings: baseSav + cDiscount + wDiscount,
      finalTotal: Math.max(0, subtotalAfterCoupon - wDiscount)
    };
  }, [items, appliedCoupon, currentUser?.hasFreeDeliveryPass, currentUser?.walletBalance, useWalletBalance]);

  const applyCoupon = (code: string) => {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (itemTotal < found.minOrderValue) {
      return { 
        success: false, 
        message: `Add items worth ₹${found.minOrderValue - itemTotal} more to apply ${found.code}!` 
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied! You save ₹${found.discountType === 'flat' ? found.discountValue : `${found.discountValue}%`}.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addAddress = (newAddr: Address) => {
    setSavedAddresses(prev => {
      const updated = newAddr.isDefault 
        ? prev.map(a => ({ ...a, isDefault: false }))
        : [...prev];
      return [...updated, newAddr];
    });
    if (newAddr.isDefault) {
      setSelectedAddress(newAddr);
    }
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const applyReferralCode = useCallback((code: string) => {
    if (!code.trim()) {
      return { success: false, message: 'Please enter a valid referral code' };
    }
    const currentBal = currentUser?.walletBalance || 0;
    const newBal = currentBal + 10;
    updateProfile({ walletBalance: newBal });
    return { 
      success: true, 
      message: `Referral applied! ₹10 FreshCash added to your wallet (Current balance: ₹${newBal}). Use on your next order!` 
    };
  }, [currentUser, updateProfile]);

  const buyFreeDeliveryPass = useCallback((planName: string) => {
    updateProfile({ hasFreeDeliveryPass: true });
    return { 
      success: true, 
      message: `Active: ${planName}! Enjoy unlimited free grocery deliveries from our Vikhroli West store.` 
    };
  }, [updateProfile]);

  const createOrder = (paymentMethod: 'upi' | 'cod' | 'card' | 'wallet' | 'external_gateway', notes?: string): Order => {
    const orderNumber = `FM-${Date.now().toString().slice(-6)}`;
    const nowIso = new Date().toISOString();
    
    // If wallet cash was used, deduct it from user's balance
    if (useWalletBalance && walletDiscount > 0 && currentUser) {
      const remainingBal = Math.max(0, (currentUser.walletBalance || 0) - walletDiscount);
      updateProfile({ walletBalance: remainingBal });
      setUseWalletBalance(false);
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: nowIso,
      createdAt: nowIso,
      items: items.map((it, idx) => ({ ...it, id: it.id || `item-${Date.now()}-${idx}` })),
      totalAmount: finalTotal,
      finalTotal,
      savings,
      deliveryFee,
      handlingFee,
      appliedCoupon: appliedCoupon ? appliedCoupon.code : undefined,
      deliveryAddress: selectedAddress,
      deliverySlot: deliveryType === 'instant' ? 'Instant Delivery (10 mins)' : selectedSlot,
      status: 'confirmed',
      paymentMethod,
      notes,
      estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getItemQuantity,
      clearCart,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      totalItemsCount,
      itemTotal,
      mrpTotal,
      savings,
      deliveryFee,
      handlingFee,
      couponDiscount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      finalTotal,
      selectedAddress,
      setSelectedAddress,
      savedAddresses,
      addAddress,
      deliveryType,
      setDeliveryType,
      selectedSlot,
      setSelectedSlot,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      createOrder,
      updateOrderStatus,
      storeSettings,
      updateStoreSettings,
      isCartOpen,
      setIsCartOpen,
      activeQuickViewProduct,
      setActiveQuickViewProduct,
      isSearchOpen,
      setIsSearchOpen,
      currentUser,
      isLoggedIn,
      login,
      signup,
      logout,
      updateProfile,
      changePassword,
      forgotPassword,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      openAuthModal,
      closeAuthModal,
      isAccountModalOpen,
      setIsAccountModalOpen,
      accountActiveTab,
      setAccountActiveTab,
      openAccountModal,
      closeAccountModal,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      clearAllNotifications,
      subscriptions,
      addSubscription,
      toggleSubscriptionPause,
      cancelSubscription
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
