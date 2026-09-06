import { Category, Coupon } from '../types/grocery';

export const CATEGORIES: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    icon: 'Apple',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500&auto=format&fit=crop&q=60',
    itemCount: 24,
    color: '#16a34a',
    subcategories: [
      { id: 'sub-fv-1', name: 'Fresh Vegetables', slug: 'fresh-vegetables', itemCount: 12 },
      { id: 'sub-fv-2', name: 'Fresh Fruits', slug: 'fresh-fruits', itemCount: 8 },
      { id: 'sub-fv-3', name: 'Exotic & Organic', slug: 'exotic-organic', itemCount: 4 }
    ]
  },
  {
    id: 'dairy-eggs',
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    icon: 'Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60',
    itemCount: 18,
    color: '#0284c7',
    subcategories: [
      { id: 'sub-de-1', name: 'Milk', slug: 'milk', itemCount: 6 },
      { id: 'sub-de-2', name: 'Butter & Cheese', slug: 'butter-cheese', itemCount: 5 },
      { id: 'sub-de-3', name: 'Paneer & Tofu', slug: 'paneer-tofu', itemCount: 3 },
      { id: 'sub-de-4', name: 'Farm Eggs', slug: 'farm-eggs', itemCount: 4 }
    ]
  },
  {
    id: 'atta-rice-dal',
    name: 'Atta, Rice & Dal',
    slug: 'atta-rice-dal',
    icon: 'Wheat',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60',
    itemCount: 16,
    color: '#d97706',
    subcategories: [
      { id: 'sub-ard-1', name: 'Atta & Flours', slug: 'atta-flours', itemCount: 6 },
      { id: 'sub-ard-2', name: 'Basmati & Daily Rice', slug: 'rice', itemCount: 5 },
      { id: 'sub-ard-3', name: 'Toor & Moong Dal', slug: 'dal', itemCount: 5 }
    ]
  },
  {
    id: 'oil-ghee',
    name: 'Oil & Ghee',
    slug: 'oil-ghee',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60',
    itemCount: 10,
    color: '#ca8a04',
    subcategories: [
      { id: 'sub-og-1', name: 'Cooking Oils', slug: 'cooking-oils', itemCount: 4 },
      { id: 'sub-og-2', name: 'Pure Desi Ghee', slug: 'desi-ghee', itemCount: 3 },
      { id: 'sub-og-3', name: 'Mustard & Olive Oil', slug: 'mustard-olive', itemCount: 3 }
    ]
  },
  {
    id: 'masala-spices',
    name: 'Masala & Spices',
    slug: 'masala-spices',
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
    itemCount: 12,
    color: '#ea580c',
    subcategories: [
      { id: 'sub-ms-1', name: 'Powdered Spices', slug: 'powdered-spices', itemCount: 5 },
      { id: 'sub-ms-2', name: 'Whole Spices', slug: 'whole-spices', itemCount: 4 },
      { id: 'sub-ms-3', name: 'Salt & Sugar', slug: 'salt-sugar', itemCount: 3 }
    ]
  },
  {
    id: 'bakery-breads',
    name: 'Bakery & Breads',
    slug: 'bakery-breads',
    icon: 'Croissant',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60',
    itemCount: 8,
    color: '#b45309',
    subcategories: [
      { id: 'sub-bb-1', name: 'Brown & Multigrain Bread', slug: 'brown-bread', itemCount: 4 },
      { id: 'sub-bb-2', name: 'White Bread & Pav', slug: 'white-bread', itemCount: 4 }
    ]
  },
  {
    id: 'snacks-munchies',
    name: 'Snacks & Munchies',
    slug: 'snacks-munchies',
    icon: 'Popcorn',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    itemCount: 14,
    color: '#e11d48',
    subcategories: [
      { id: 'sub-sm-1', name: 'Chips & Crisps', slug: 'chips-crisps', itemCount: 8 },
      { id: 'sub-sm-2', name: 'Namkeen & Bhujia', slug: 'namkeen', itemCount: 6 }
    ]
  },
  {
    id: 'biscuits-cookies',
    name: 'Biscuits & Cookies',
    slug: 'biscuits-cookies',
    icon: 'Cookie',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60',
    itemCount: 12,
    color: '#854d0e',
    subcategories: [
      { id: 'sub-bc-1', name: 'Digestive & Marie', slug: 'digestive', itemCount: 4 },
      { id: 'sub-bc-2', name: 'Cookies & Wafers', slug: 'cookies', itemCount: 5 },
      { id: 'sub-bc-3', name: 'Cream Biscuits', slug: 'cream-biscuits', itemCount: 3 }
    ]
  },
  {
    id: 'chocolates-sweets',
    name: 'Chocolates & Sweets',
    slug: 'chocolates-sweets',
    icon: 'Candy',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=60',
    itemCount: 10,
    color: '#701a75',
    subcategories: [
      { id: 'sub-cs-1', name: 'Milk Chocolates', slug: 'milk-choc', itemCount: 5 },
      { id: 'sub-cs-2', name: 'Dark Chocolates', slug: 'dark-choc', itemCount: 3 },
      { id: 'sub-cs-3', name: 'Indian Mithai', slug: 'mithai', itemCount: 2 }
    ]
  },
  {
    id: 'beverages-juices',
    name: 'Beverages & Juices',
    slug: 'beverages-juices',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=500&auto=format&fit=crop&q=60',
    itemCount: 14,
    color: '#0891b2',
    subcategories: [
      { id: 'sub-bj-1', name: 'Tea & Green Tea', slug: 'tea', itemCount: 5 },
      { id: 'sub-bj-2', name: 'Coffee', slug: 'coffee', itemCount: 3 },
      { id: 'sub-bj-3', name: 'Cold Pressed Juices', slug: 'juices', itemCount: 4 },
      { id: 'sub-bj-4', name: 'Soft Drinks & Soda', slug: 'soda', itemCount: 2 }
    ]
  },
  {
    id: 'breakfast-cereals',
    name: 'Breakfast & Cereals',
    slug: 'breakfast-cereals',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=500&auto=format&fit=crop&q=60',
    itemCount: 8,
    color: '#f59e0b',
    subcategories: [
      { id: 'sub-bc-1', name: 'Oats & Muesli', slug: 'oats', itemCount: 4 },
      { id: 'sub-bc-2', name: 'Honey & Spreads', slug: 'honey', itemCount: 4 }
    ]
  },
  {
    id: 'instant-noodles',
    name: 'Instant Food & Noodles',
    slug: 'instant-noodles',
    icon: 'Soup',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60',
    itemCount: 9,
    color: '#dc2626',
    subcategories: [
      { id: 'sub-in-1', name: 'Instant Noodles', slug: 'noodles', itemCount: 4 },
      { id: 'sub-in-2', name: 'Ready-to-Eat Meals', slug: 'ready-meals', itemCount: 3 },
      { id: 'sub-in-3', name: 'Pasta & Macaroni', slug: 'pasta', itemCount: 2 }
    ]
  },
  {
    id: 'dry-fruits-nuts',
    name: 'Dry Fruits & Nuts',
    slug: 'dry-fruits-nuts',
    icon: 'Nut',
    image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=500&auto=format&fit=crop&q=60',
    itemCount: 8,
    color: '#92400e',
    subcategories: [
      { id: 'sub-df-1', name: 'Almonds & Cashews', slug: 'almonds-cashews', itemCount: 4 },
      { id: 'sub-df-2', name: 'Raisins & Dates', slug: 'dates', itemCount: 2 },
      { id: 'sub-df-3', name: 'Walnuts & Pistachios', slug: 'walnuts', itemCount: 2 }
    ]
  },
  {
    id: 'household-cleaning',
    name: 'Household Cleaning',
    slug: 'household-cleaning',
    icon: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=60',
    itemCount: 10,
    color: '#2563eb',
    subcategories: [
      { id: 'sub-hc-1', name: 'Detergents & Fabric Care', slug: 'detergents', itemCount: 4 },
      { id: 'sub-hc-2', name: 'Surface Cleaners', slug: 'cleaners', itemCount: 4 },
      { id: 'sub-hc-3', name: 'Dishwashing Bars & Liquids', slug: 'dishwashing', itemCount: 2 }
    ]
  },
  {
    id: 'pooja-essentials',
    name: 'Pooja Essentials',
    slug: 'pooja-essentials',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500&auto=format&fit=crop&q=60',
    itemCount: 6,
    color: '#f97316',
    subcategories: [
      { id: 'sub-pe-1', name: 'Agarbatti & Dhoop', slug: 'agarbatti', itemCount: 3 },
      { id: 'sub-pe-2', name: 'Camphor & Diyas', slug: 'camphor', itemCount: 3 }
    ]
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    slug: 'baby-care',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60',
    itemCount: 6,
    color: '#ec4899',
    subcategories: [
      { id: 'sub-bc-1', name: 'Baby Diapers & Wipes', slug: 'diapers', itemCount: 4 },
      { id: 'sub-bc-2', name: 'Baby Bath & Skincare', slug: 'skincare', itemCount: 2 }
    ]
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    icon: 'Cat',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60',
    itemCount: 5,
    color: '#14b8a6',
    subcategories: [
      { id: 'sub-ps-1', name: 'Dog Food & Treats', slug: 'dog-food', itemCount: 3 },
      { id: 'sub-ps-2', name: 'Cat Food & Litter', slug: 'cat-food', itemCount: 2 }
    ]
  },
  {
    id: 'frozen-foods',
    name: 'Frozen Foods',
    slug: 'frozen-foods',
    icon: 'Snowflake',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    itemCount: 6,
    color: '#0284c7',
    subcategories: [
      { id: 'sub-ff-1', name: 'French Fries & Nuggets', slug: 'fries', itemCount: 2 },
      { id: 'sub-ff-2', name: 'Ice Creams & Kulfi', slug: 'ice-cream', itemCount: 2 },
      { id: 'sub-ff-3', name: 'Frozen Peas & Veggies', slug: 'peas', itemCount: 2 }
    ]
  },
  {
    id: 'sauces-spreads',
    name: 'Sauces & Spreads',
    slug: 'sauces-spreads',
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60',
    itemCount: 7,
    color: '#e11d48',
    subcategories: [
      { id: 'sub-ss-1', name: 'Tomato Ketchup', slug: 'ketchup', itemCount: 2 },
      { id: 'sub-ss-2', name: 'Mayonnaise & Dips', slug: 'mayo', itemCount: 2 },
      { id: 'sub-ss-3', name: 'Peanut Butter', slug: 'peanut-butter', itemCount: 2 }
    ]
  }
];

export const COUPONS: Coupon[] = [
  {
    id: 'cpn-1',
    code: 'FRESH100',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 499,
    description: 'Flat ₹100 OFF on orders above ₹499',
    expiryDate: '2026-12-31'
  },
  {
    id: 'cpn-2',
    code: 'FRESH20',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 150,
    minOrderValue: 299,
    description: '20% OFF up to ₹150 on your cart',
    expiryDate: '2026-12-31'
  },
  {
    id: 'cpn-3',
    code: 'ORGANIC50',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 249,
    description: 'Flat ₹50 OFF on fresh fruits & vegetables',
    expiryDate: '2026-12-31'
  },
  {
    id: 'cpn-4',
    code: 'SUPER50',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 299,
    description: 'Flat ₹50 OFF on orders above ₹299',
    expiryDate: '2026-12-31'
  },
  {
    id: 'cpn-5',
    code: 'WELCOME',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 75,
    minOrderValue: 199,
    description: '20% OFF (Up to ₹75) on first order',
    expiryDate: '2026-12-31'
  },
  {
    id: 'cpn-6',
    code: 'VEGGIE10',
    discountType: 'percentage',
    discountValue: 10,
    maxDiscount: 60,
    minOrderValue: 199,
    description: '10% OFF on Fruits & Organic harvest',
    expiryDate: '2026-12-31'
  }
];
