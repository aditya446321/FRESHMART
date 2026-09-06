import React, { useState, useMemo, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AddressModal } from './components/AddressModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { Footer } from './components/Footer';
import { CATEGORIES } from './data/categories';
import { Product, Order, StitchScreen } from './types/grocery';

// Stitch Screen Views
import { FruitsVegetablesAisleView } from './components/views/FruitsVegetablesAisleView';
import { SearchPageView } from './components/views/SearchPageView';
import { OffersDealsView } from './components/views/OffersDealsView';
import { DailySubscriptionsView } from './components/views/DailySubscriptionsView';
import { OrderTrackingView } from './components/views/OrderTrackingView';
import { MyOrdersPageView } from './components/views/MyOrdersPageView';
import { WishlistView } from './components/views/WishlistView';
import { SavedAddressesView } from './components/views/SavedAddressesView';
import { NotificationsView } from './components/views/NotificationsView';
import { AccountPageView } from './components/views/AccountPageView';
import { ErrorEmptyStatesView } from './components/views/ErrorEmptyStatesView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { ProfileHamburgerDrawer } from './components/ProfileHamburgerDrawer';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { HomeSections } from './components/HomeSections';
import { DedicatedCategoriesView } from './components/views/DedicatedCategoriesView';
import { OrderAgainView } from './components/views/OrderAgainView';
import { MobileBottomNav } from './components/MobileBottomNav';

import { 
  ArrowUpDown, 
  Sparkles, 
  SlidersHorizontal, 
  Flame, 
  Tag, 
  Check, 
  ChevronRight,
  PackageOpen,
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
type FilterTag = 'all' | 'under-99' | 'trending' | 'organic' | 'high-discount';

const MainContent: React.FC = () => {
  const { products, wishlist, setIsCartOpen, openAuthModal } = useCart();

  // Active Screen State (defaults to home grocery store matching Instamart / Blinkit)
  const [currentScreen, setCurrentScreen] = useState<StitchScreen>('home');
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Navigation & Search State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Sorting & Filtering State
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [activeFilterTag, setActiveFilterTag] = useState<FilterTag>('all');

  // Modal Visibility States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // If user switches to cart screen, trigger cart drawer
  useEffect(() => {
    if (currentScreen === 'cart') {
      setIsCartOpen(true);
    } else if (currentScreen === 'checkout') {
      setIsCheckoutOpen(true);
    }
  }, [currentScreen, setIsCartOpen]);

  // Handle category selection from home or header
  const handleSelectCategory = (catSlug: string | null) => {
    setSelectedCategory(catSlug);
    setSelectedSubcategory(null);
    if (catSlug) {
      setCurrentScreen('category');
    } else {
      setCurrentScreen('home');
    }
  };

  // Filtered & Sorted Product Collection for Home View
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Wishlist if keyword triggered
    if (searchTerm === 'wishlist:active') {
      result = result.filter(p => wishlist.includes(p.id));
    }
    // Filter by search term
    else if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags?.some(t => t.toLowerCase().includes(q))
        );
      });
    }

    // Filter by Category
    if (selectedCategory) {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }

    // Filter by Subcategory
    if (selectedSubcategory) {
      result = result.filter(p => p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());
    }

    // Quick Filter tags
    if (activeFilterTag === 'under-99') {
      result = result.filter(p => p.price <= 99);
    } else if (activeFilterTag === 'trending') {
      result = result.filter(p => p.isPopular || p.rating >= 4.7);
    } else if (activeFilterTag === 'organic') {
      result = result.filter(p => p.isOrganic || p.tags?.includes('organic'));
    } else if (activeFilterTag === 'high-discount') {
      result = result.filter(p => {
        const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);
        return disc >= 20;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = Math.round(((a.mrp - a.price) / a.mrp) * 100);
          const discB = Math.round(((b.mrp - b.price) / b.mrp) * 100);
          return discB - discA;
        });
        break;
      case 'relevance':
      default:
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, selectedSubcategory, sortBy, activeFilterTag, wishlist]);

  // Segmented Home Sections
  const featuredSections = useMemo(() => {
    if (selectedCategory || searchTerm || activeFilterTag !== 'all' || sortBy !== 'relevance') {
      return null;
    }

    return [
      {
        title: '🥦 Farm Fresh Fruits & Crisp Vegetables',
        subtitle: 'Harvested directly from farms, tested for zero chemical residues',
        slug: 'fruits-vegetables',
        items: products.filter((p) => p.categorySlug === 'fruits-vegetables').slice(0, 5),
      },
      {
        title: '🥛 Dairy, Country Eggs & Morning Bread',
        subtitle: 'Cold-chain milk, artisan sourdough bread and country butter',
        slug: 'dairy-eggs',
        items: products.filter((p) => p.categorySlug === 'dairy-eggs').slice(0, 5),
      },
      {
        title: '🌾 Chakki Atta, Premium Rice & Pure Dals',
        subtitle: '100% stone-ground unadulterated whole grains & kitchen staples',
        slug: 'atta-rice-dal',
        items: products.filter((p) => p.categorySlug === 'atta-rice-dal').slice(0, 5),
      },
      {
        title: '🍟 Midnight Munchies & Cold Beverages',
        subtitle: 'Crunchy chips, premium chocolates, mocktails and juices',
        slug: 'snacks-munchies',
        items: products.filter((p) => p.categorySlug === 'snacks-munchies').slice(0, 5),
      },
    ];
  }, [products, selectedCategory, searchTerm, activeFilterTag, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100/60 font-sans text-neutral-900 selection:bg-emerald-600 selection:text-white">
      
      {/* Top Navigation Header (hidden on search screen to provide 1:1 app screenshot immersion) */}
      {currentScreen !== 'search' && (
        <Header
          searchTerm={searchTerm}
          setSearchTerm={(term) => {
            setSearchTerm(term);
            if (term.trim() && currentScreen !== 'search') {
              setCurrentScreen('search');
            }
          }}
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onOpenOrders={() => setCurrentScreen('my_orders')}
          onOpenAddressModal={() => setIsAddressModalOpen(true)}
          onOpenSearch={() => setCurrentScreen('search')}
          onOpenProfileDrawer={() => setIsProfileDrawerOpen(true)}
          onNavigateHome={() => {
            setCurrentScreen('home');
            setSelectedCategory(null);
            setSelectedSubcategory(null);
            setSearchTerm('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenWishlist={() => setCurrentScreen('wishlist')}
          onOpenReorder={() => setCurrentScreen('reorder')}
          onOpenNotifications={() => setCurrentScreen('notifications')}
        />
      )}

      {/* Main Content Rendering per Screen */}
      <main className={`flex-1 w-full mx-auto ${currentScreen === 'search' ? 'p-0' : 'max-w-7xl px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-6'}`}>
        
        {/* VIEW 1: Customer Search Page (1:1 with user photo) */}
        {currentScreen === 'search' && (
          <SearchPageView
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            initialQuery={searchTerm}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {/* VIEW 2: Dedicated Categories View (All 10 requested Aisles) */}
        {(currentScreen === 'category' || currentScreen === 'categories') && (
          <DedicatedCategoriesView
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            initialCategory={selectedCategory || 'dairy-eggs'}
            onNavigateHome={() => setCurrentScreen('home')}
          />
        )}

        {/* VIEW: Aditya's Reordered Items (1:1 with reference screenshot) */}
        {currentScreen === 'reorder' && (
          <OrderAgainView
            onBack={() => setCurrentScreen('home')}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {/* VIEW 3: Product Detail Full View (basketfresh_product_detail) */}
        {currentScreen === 'product_detail' && (
          <ProductDetailView
            productId={quickViewProduct?.id}
            onBackToHome={() => setCurrentScreen('home')}
          />
        )}

        {/* VIEW 4: Order Confirmed / Success (basketfresh_order_success) */}
        {currentScreen === 'order_success' && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-800 text-white rounded-2xl flex items-center justify-between text-xs font-bold shadow-xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Order #BF-94821 Confirmed & Sent to Nearest Darkstore!</span>
              </div>
              <button
                onClick={() => setCurrentScreen('order_tracking')}
                className="px-3 py-1 bg-white text-emerald-950 rounded-lg text-[11px] font-black cursor-pointer hover:bg-emerald-50"
              >
                Track Live
              </button>
            </div>
            <OrderTrackingView onContinueShopping={() => setCurrentScreen('home')} />
          </div>
        )}

        {/* VIEW 5: Live Order Tracking (basketfresh_order_tracking) */}
        {currentScreen === 'order_tracking' && (
          <OrderTrackingView onContinueShopping={() => setCurrentScreen('home')} />
        )}

        {/* VIEW 6: My Past & Active Orders (basketfresh_my_orders) */}
        {currentScreen === 'my_orders' && (
          <MyOrdersPageView
            onTrackOrder={() => setCurrentScreen('order_tracking')}
            onContinueShopping={() => setCurrentScreen('home')}
          />
        )}

        {/* VIEW 7: Offers & Promo Deals (basketfresh_offers_deals) */}
        {currentScreen === 'offers_deals' && (
          <OffersDealsView onOpenQuickView={(p) => setQuickViewProduct(p)} />
        )}

        {/* VIEW 8: Daily Milk & Breakfast Subscriptions (basketfresh_daily_subscriptions) */}
        {currentScreen === 'daily_subscriptions' && (
          <DailySubscriptionsView />
        )}

        {/* VIEW 9: Saved Wishlist (basketfresh_wishlist) */}
        {currentScreen === 'wishlist' && (
          <WishlistView
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onContinueShopping={() => setCurrentScreen('home')}
          />
        )}

        {/* VIEW 10: Saved Addresses (basketfresh_saved_addresses) */}
        {currentScreen === 'saved_addresses' && (
          <SavedAddressesView onOpenAddModal={() => setIsAddressModalOpen(true)} />
        )}

        {/* VIEW 11: Notifications & Activity (basketfresh_notifications) */}
        {currentScreen === 'notifications' && (
          <NotificationsView
            onGoToTab={(t) => {
              if (t === 'coupons') setCurrentScreen('offers_deals');
              else if (t === 'orders') setCurrentScreen('my_orders');
              else setCurrentScreen('home');
            }}
          />
        )}

        {/* VIEW 12: Account Profile (basketfresh_account) */}
        {currentScreen === 'account' && (
          <AccountPageView
            onNavigate={(tab) => {
              if (tab === 'orders') setCurrentScreen('my_orders');
              else if (tab === 'subscriptions') setCurrentScreen('daily_subscriptions');
              else if (tab === 'addresses') setCurrentScreen('saved_addresses');
              else if (tab === 'offers') setCurrentScreen('offers_deals');
              else if (tab === 'notifications') setCurrentScreen('notifications');
            }}
            onOpenAuth={() => openAuthModal('login')}
          />
        )}

        {/* VIEW 13: Error & Empty States (basketfresh_error_empty_states) */}
        {currentScreen === 'empty_states' && (
          <ErrorEmptyStatesView onGoHome={() => setCurrentScreen('home')} />
        )}

        {/* VIEW 0: Grocery Home (basketfresh_grocery_home) */}
        {currentScreen === 'home' && (
          <div className="space-y-6 sm:space-y-8">
            
            {/* Banner Carousel */}
            {!searchTerm && !selectedCategory && (
              <BannerCarousel onSelectCategory={(cat) => handleSelectCategory(cat)} />
            )}

            {/* Category Horizontal Browsing Rail */}
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              selectedSubcategory={selectedSubcategory}
              onSelectSubcategory={setSelectedSubcategory}
            />

            {/* Filter Bar & Sort Controls */}
            <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-neutral-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              {/* Quick Filter Chips */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-extrabold uppercase text-neutral-400 tracking-wider flex items-center gap-1 shrink-0 mr-1">
                  <SlidersHorizontal className="w-3 h-3 text-neutral-500" /> Filter:
                </span>

                {[
                  { id: 'all' as FilterTag, label: 'All Items' },
                  { id: 'trending' as FilterTag, label: '🔥 Trending' },
                  { id: 'under-99' as FilterTag, label: '⚡ Under ₹99' },
                  { id: 'organic' as FilterTag, label: '🌿 Organic' },
                  { id: 'high-discount' as FilterTag, label: '🏷️ 20%+ OFF' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setActiveFilterTag(chip.id)}
                    className={`text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeFilterTag === chip.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200/60'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown & Count */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                <span className="text-xs font-bold text-neutral-500">
                  <strong className="text-neutral-900">{filteredProducts.length}</strong> items available
                </span>

                <div className="flex items-center gap-1.5 bg-neutral-100/90 rounded-xl px-2.5 py-1 border border-neutral-200">
                  <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="text-xs font-bold bg-transparent text-neutral-800 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="relevance">Popularity / Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Discount</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Active Filters feedback indicator */}
            {(selectedCategory || selectedSubcategory || searchTerm || activeFilterTag !== 'all') && (
              <div className="flex items-center justify-between bg-emerald-50/80 border border-emerald-200/80 px-3.5 py-2 rounded-xl text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-emerald-900">Browsing Filter:</span>
                  {selectedCategory && (
                    <span className="px-2 py-0.5 bg-emerald-700 text-white rounded-md font-bold uppercase text-[10px]">
                      {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                    </span>
                  )}
                  {selectedSubcategory && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                      {selectedSubcategory}
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-2 py-0.5 bg-neutral-900 text-white rounded-md font-bold text-[10px]">
                      "{searchTerm}"
                    </span>
                  )}
                  {activeFilterTag !== 'all' && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md font-bold text-[10px] uppercase">
                      {activeFilterTag}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                    setSearchTerm('');
                    setActiveFilterTag('all');
                  }}
                  className="font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer ml-2"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Product Presentation Area */}
            {featuredSections ? (
              <HomeSections
                onOpenQuickView={(p) => setQuickViewProduct(p)}
                onSelectCategory={(cat) => handleSelectCategory(cat)}
                onNavigate={(scr) => setCurrentScreen(scr as any)}
              />
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-neutral-900">
                  No matching groceries found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  We couldn't find any products matching your current filters or search criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                    setSearchTerm('');
                    setActiveFilterTag('all');
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
                >
                  Clear Filters & Show All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 md:gap-4">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* 4. Footer */}
      {currentScreen !== 'search' && (
        <Footer 
          onSelectCategory={handleSelectCategory}
          onOpenAddressModal={() => setIsAddressModalOpen(true)}
          onOpenOrders={() => setCurrentScreen('my_orders')}
          onOpenSupport={() => setIsSupportOpen(true)}
          onNavigateHome={() => {
            setCurrentScreen('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 5. Modals & Slide-over Drawers */}
      <CartDrawer 
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <FloatingCartBar />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order: Order) => {
          setCurrentScreen('order_tracking');
        }}
      />

      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      <AuthModal
        isOpen={false}
        onClose={() => {}}
      />

      <AccountModal
        isOpen={false}
        onClose={() => {}}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Instamart Profile Hamburger Slide-over Drawer */}
      <ProfileHamburgerDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        onOpenOrders={() => {
          setIsProfileDrawerOpen(false);
          setCurrentScreen('my_orders');
        }}
        onOpenAddresses={() => {
          setIsProfileDrawerOpen(false);
          setCurrentScreen('saved_addresses');
        }}
        onOpenSubscriptions={() => {
          setIsProfileDrawerOpen(false);
          setCurrentScreen('daily_subscriptions');
        }}
        onOpenWishlist={() => {
          setIsProfileDrawerOpen(false);
          setCurrentScreen('wishlist');
        }}
        onOpenNotifications={() => {
          setIsProfileDrawerOpen(false);
          setCurrentScreen('notifications');
        }}
        onOpenSupport={() => {
          setIsProfileDrawerOpen(false);
          setIsSupportOpen(true);
        }}
        onNavigate={(screen) => {
          setIsProfileDrawerOpen(false);
          setCurrentScreen(screen);
        }}
      />

      {/* 24x7 Live Customer Support Chat */}
      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Mobile 5-Tab Navigation Bar (Home | Categories | Search | Cart | Profile) */}
      <MobileBottomNav
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileDrawerOpen(true)}
      />

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
