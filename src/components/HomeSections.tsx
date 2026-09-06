import React, { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Product, StitchScreen } from '../types/grocery';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/categories';
import { 
  ArrowRight, 
  RotateCw, 
  Check, 
  Flame, 
  TrendingUp, 
  Clock, 
  Tag, 
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

interface HomeSectionsProps {
  onOpenQuickView: (product: Product) => void;
  onSelectCategory: (categorySlug: string) => void;
  onNavigate: (screen: StitchScreen) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  onOpenQuickView,
  onSelectCategory,
  onNavigate,
}) => {
  const { products, currentUser, addToCart } = useCart();

  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Aditya';

  // SECTION 4: 10 Target Categories
  const targetedCategories = useMemo(() => {
    const targetSlugs = [
      'dairy-eggs',
      'fruits-vegetables',
      'snacks-munchies',
      'biscuits-cookies',
      'beverages-juices',
      'atta-rice-dal',
      'personal-care',
      'household-cleaning',
      'home-essentials',
      'chocolates-sweets'
    ];
    return CATEGORIES.filter(c => targetSlugs.includes(c.slug)).slice(0, 10);
  }, []);

  // SECTION 5: Deals You'll Love (High discount or trending)
  const dealsProducts = useMemo(() => {
    return products
      .filter(p => p.discountPercentage >= 10 || p.isPopular)
      .slice(0, 8);
  }, [products]);

  // SECTION 6: "Aditya, order again" Frequently purchased
  const orderAgainProducts = useMemo(() => {
    return products
      .filter(p => p.rating >= 4.5 || p.isPopular)
      .slice(0, 6);
  }, [products]);

  // SECTION 9: Specific Collections
  const snackAttackProducts = useMemo(() => {
    return products.filter(p => p.categorySlug === 'snacks-munchies' || p.category === 'snacks-munchies').slice(0, 6);
  }, [products]);

  const freshEverydayProducts = useMemo(() => {
    return products.filter(p => p.categorySlug === 'fruits-vegetables' || p.categorySlug === 'dairy-eggs').slice(0, 6);
  }, [products]);

  const sweetToothProducts = useMemo(() => {
    return products.filter(p => p.categorySlug === 'chocolates-sweets' || p.category === 'chocolates-sweets').slice(0, 6);
  }, [products]);

  const pantryStaplesProducts = useMemo(() => {
    return products.filter(p => p.categorySlug === 'atta-rice-dal' || p.category === 'atta-rice-dal').slice(0, 6);
  }, [products]);

  const homeEssentialsProducts = useMemo(() => {
    return products.filter(p => p.categorySlug === 'household-cleaning' || p.categorySlug === 'home-essentials').slice(0, 6);
  }, [products]);

  const personalCareProducts = useMemo(() => {
    return products.filter(p => p.categorySlug === 'personal-care' || p.category === 'personal-care').slice(0, 6);
  }, [products]);

  // SECTION 10: Recently Viewed
  const recentlyViewedProducts = useMemo(() => {
    return products.slice(4, 9);
  }, [products]);

  return (
    <div className="space-y-8 sm:space-y-10">

      {/* SECTION 4: Shop by Category */}
      <section id="section-shop-by-category" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
              Shop by Category
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
              10 curated aisles delivered fresh in 10 minutes
            </p>
          </div>
          <button
            onClick={() => onNavigate('category')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>See All Aisles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 10 Category Tiles Grid with Real Category Imagery */}
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
          {targetedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="flex flex-col items-center p-1.5 sm:p-2 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer group text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl overflow-hidden mb-1 sm:mb-1.5 p-0.5 bg-neutral-50 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-neutral-800 leading-tight line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 5: Deals You'll Love (Horizontal Carousel on Mobile, Grid on Desktop) */}
      <section id="section-deals-you-love" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <div>
              <h2 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                Deals You'll Love
              </h2>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Top discounts & lightning steals right now
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('offers_deals')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>View All Deals</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
          {dealsProducts.map((prod) => (
            <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
              <ProductCard
                product={prod}
                onOpenQuickView={onOpenQuickView}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: "Aditya, order again" Personalized Section */}
      <section id="section-order-again" className="bg-emerald-950 text-white rounded-3xl p-3.5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center font-black">
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight font-display">
                {userName}, order again
              </h2>
              <p className="text-[11px] sm:text-xs text-emerald-300/80 font-medium">
                Your frequently purchased favorites ready in 1 click
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('reorder')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shadow-2xs font-sans"
          >
            <span>See all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 no-scrollbar snap-x">
          {orderAgainProducts.map((prod) => (
            <div key={prod.id} className="min-w-[150px] sm:min-w-0 shrink-0 snap-start bg-white rounded-2xl p-2.5 text-neutral-900 flex flex-col justify-between">
              <div 
                onClick={() => onOpenQuickView(prod)}
                className="aspect-square rounded-xl bg-neutral-50 flex items-center justify-center p-1 cursor-pointer mb-2"
              >
                <img
                  src={prod.primaryImage}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
                  {prod.brand}
                </span>
                <h4 
                  onClick={() => onOpenQuickView(prod)}
                  className="text-xs font-black line-clamp-1 cursor-pointer hover:text-emerald-700"
                >
                  {prod.name}
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono font-black text-neutral-900">
                    ₹{prod.price}
                  </span>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-2 py-0.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-black cursor-pointer active:scale-95"
                  >
                    + ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: Promotional Collection Banner */}
      <section id="section-promo-banner" className="relative rounded-3xl overflow-hidden shadow-xs bg-linear-to-r from-orange-600 via-rose-600 to-amber-600 text-white p-4 sm:p-8">
        <div className="relative z-10 max-w-lg space-y-2">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            🍿 BINGE WATCH READY
          </span>
          <h3 className="text-xl sm:text-3xl font-black tracking-tight font-display">
            Snack Attack - Up to 30% OFF
          </h3>
          <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
            Bingo Mad Angles, Lay's Cream & Onion, Uncle Chipps Spicy Treat, Maggi Cuppa & chilled soft drinks.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectCategory('snacks-munchies')}
              className="bg-white text-orange-950 hover:bg-orange-50 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Explore Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: Product Collections */}
      <div id="section-product-collections" className="space-y-8 sm:space-y-10">
        
        {/* 9.1: Snack Attack */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                🍿 Snack Attack
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Chips, namkeen, wafers & party munchies
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('snacks-munchies')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
            {snackAttackProducts.map((prod) => (
              <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
                <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
              </div>
            ))}
          </div>
        </section>

        {/* 9.2: Fresh Everyday */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                🌿 Fresh Everyday
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Crisp green vegetables, fresh fruits & farm milk
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('fruits-vegetables')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
            {freshEverydayProducts.map((prod) => (
              <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
                <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
              </div>
            ))}
          </div>
        </section>

        {/* 9.3: Sweet Tooth */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                🍫 Sweet Tooth
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Gourmet chocolates, cookies & Indian mithai
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('chocolates-sweets')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
            {sweetToothProducts.map((prod) => (
              <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
                <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
              </div>
            ))}
          </div>
        </section>

        {/* 9.4: Pantry Staples */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                🌾 Pantry Staples
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Chakki atta, aged basmati rice, pure dals & spices
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('atta-rice-dal')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
            {pantryStaplesProducts.map((prod) => (
              <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
                <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
              </div>
            ))}
          </div>
        </section>

        {/* 9.5: Home Essentials */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                🧼 Home Essentials & Cleaning
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Detergents, floor cleaners, dishwash bars & pooja items
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('household-cleaning')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
            {homeEssentialsProducts.map((prod) => (
              <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
                <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
              </div>
            ))}
          </div>
        </section>

        {/* 9.6: Personal Care */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
                🧴 Personal Care
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                Soaps, face washes, handwashes, shampoos & skin care
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('personal-care')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
            {personalCareProducts.map((prod) => (
              <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
                <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* SECTION 10: Recently Viewed */}
      <section id="section-recently-viewed" className="space-y-3 sm:space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-700" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight font-display">
                You recently viewed
              </h2>
              <p className="text-[11px] text-neutral-500 font-medium">
                Pick up right where you left off
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar snap-x">
          {recentlyViewedProducts.map((prod) => (
            <div key={prod.id} className="min-w-[190px] sm:min-w-[210px] md:min-w-0 sm:max-w-none shrink-0 snap-start">
              <ProductCard product={prod} onOpenQuickView={onOpenQuickView} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
