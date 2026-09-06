import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/grocery';
import { 
  ArrowLeft, 
  Search, 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  Check, 
  ShoppingBag,
  Plus,
  Minus,
  Heart,
  ChevronDown
} from 'lucide-react';

interface OrderAgainViewProps {
  onBack: () => void;
  onOpenQuickView: (product: Product) => void;
}

const AISLE_TABS = [
  { id: 'most_ordered', label: 'Most Ordered', icon: '🔥' },
  { id: 'munchies_snacks', label: 'Munchies & Snacks', icon: '🍿' },
  { id: 'biscuits_cakes', label: 'Biscuits & Cakes', icon: '🍪' },
  { id: 'dairy_bread', label: 'Dairy, Bread & Eggs', icon: '🥛' },
  { id: 'beverages', label: 'Beverages', icon: '☕' },
  { id: 'personal_care', label: 'Personal Care', icon: '✨' },
  { id: 'sweet_tooth', label: 'Sweet Tooth', icon: '🍫' },
];

export const OrderAgainView: React.FC<OrderAgainViewProps> = ({ onBack, onOpenQuickView }) => {
  const { 
    products, 
    currentUser, 
    addToCart, 
    updateQuantity, 
    getItemQuantity, 
    toggleWishlist, 
    isInWishlist 
  } = useCart();

  const [activeTab, setActiveTab] = useState<string>('most_ordered');
  const [filterPriceDrop, setFilterPriceDrop] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'freq' | 'price_low' | 'price_high'>('freq');
  const [searchQuery, setSearchQuery] = useState('');

  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Aditya';

  // Curated list of user's past frequently ordered items matching Screenshot 1 & 5
  const reorderProducts = useMemo(() => {
    let list = [...products].filter(p => p.isPopular || p.rating >= 4.4 || p.stock > 0);

    // Tab filtering
    if (activeTab === 'munchies_snacks') {
      list = list.filter(p => p.categorySlug === 'snacks-munchies' || p.category === 'snacks-munchies');
    } else if (activeTab === 'biscuits_cakes') {
      list = list.filter(p => p.categorySlug === 'biscuits-cookies' || p.category === 'biscuits-cookies');
    } else if (activeTab === 'dairy_bread') {
      list = list.filter(p => p.categorySlug === 'dairy-eggs' || p.categorySlug === 'bakery-breads');
    } else if (activeTab === 'beverages') {
      list = list.filter(p => p.categorySlug === 'beverages-juices' || p.category === 'beverages-juices');
    } else if (activeTab === 'personal_care') {
      list = list.filter(p => p.categorySlug === 'personal-care' || p.category === 'personal-care');
    } else if (activeTab === 'sweet_tooth') {
      list = list.filter(p => p.categorySlug === 'chocolates-sweets' || p.category === 'chocolates-sweets');
    }

    if (filterPriceDrop) {
      list = list.filter(p => p.discountPercentage >= 10);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    if (sortBy === 'price_low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, activeTab, filterPriceDrop, searchQuery, sortBy]);

  return (
    <div className="bg-neutral-50 min-h-screen pb-20 sm:pb-12">
      {/* Top Bar matching user reference screenshot */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
              title="Back to Store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight font-display flex items-center gap-1.5">
                <span>{userName}'s reordered items</span>
              </h1>
              <p className="text-[11px] text-neutral-500 font-semibold">
                All your {reorderProducts.length} favourite items in one place!
              </p>
            </div>
          </div>

          <div className="relative w-40 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reordered..."
              className="w-full h-8 sm:h-9 pl-7 pr-3 rounded-lg bg-neutral-100 border border-neutral-200 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-neutral-100">
          <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-200 rounded-lg px-2 py-1 text-[11px] font-bold text-neutral-700 shrink-0">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer"
            >
              <option value="freq">Most Frequent</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => setFilterPriceDrop(!filterPriceDrop)}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors shrink-0 cursor-pointer ${
              filterPriceDrop 
                ? 'bg-emerald-700 text-white border-emerald-700' 
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            🔥 Price Drop
          </button>

          <button
            onClick={() => setFilterVegOnly(!filterVegOnly)}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors shrink-0 cursor-pointer ${
              filterVegOnly 
                ? 'bg-emerald-700 text-white border-emerald-700' 
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            🌱 100% Veg
          </button>
        </div>
      </div>

      {/* Dual Column Layout matching Screenshot 1 */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-3 sm:py-6 flex gap-2 sm:gap-6">
        
        {/* Left Side Aisles Navigation */}
        <aside className="w-20 sm:w-48 md:w-56 shrink-0 space-y-1 sm:space-y-1.5">
          {AISLE_TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 ${
                  isSelected
                    ? 'bg-emerald-800 text-white font-black shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-200/80 hover:bg-neutral-50 font-bold'
                }`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span>
                <span className="text-[10px] sm:text-xs text-center sm:text-left leading-tight line-clamp-2">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Right Side Products Grid */}
        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {reorderProducts.map((prod) => {
              const qty = getItemQuantity(prod.id);
              const isWish = isInWishlist(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 hover:border-emerald-500/50 hover:shadow-sm transition-all duration-200 p-2.5 sm:p-3.5 flex flex-col justify-between relative group"
                >
                  {/* Buy Again Tag */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Buy Again
                    </span>

                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-1 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div
                    onClick={() => onOpenQuickView(prod)}
                    className="aspect-square rounded-xl bg-white border border-neutral-100 flex items-center justify-center p-2 cursor-pointer group-hover:scale-102 transition-transform my-1"
                  >
                    <img
                      src={prod.primaryImage}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block truncate">
                      {prod.brand}
                    </span>
                    <h4
                      onClick={() => onOpenQuickView(prod)}
                      className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-2 leading-snug cursor-pointer hover:text-emerald-700 h-9"
                    >
                      {prod.name}
                    </h4>
                    <span className="text-[10px] sm:text-xs text-neutral-500 font-semibold block">
                      {prod.weight}
                    </span>
                  </div>

                  {/* Price and Add Control */}
                  <div className="pt-2 border-t border-neutral-100 mt-2 flex items-center justify-between gap-1">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs sm:text-sm font-black text-neutral-900 font-mono">
                          ₹{prod.price}
                        </span>
                        {prod.mrp > prod.price && (
                          <span className="text-[10px] text-neutral-400 line-through font-mono">
                            ₹{prod.mrp}
                          </span>
                        )}
                      </div>
                      {prod.discountPercentage > 0 && (
                        <span className="text-[9px] font-bold text-emerald-700">
                          {prod.discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    {qty > 0 ? (
                      <div className="flex items-center bg-emerald-700 text-white rounded-lg overflow-hidden h-7 sm:h-8">
                        <button
                          onClick={() => updateQuantity(prod.id, qty - 1)}
                          className="w-6 sm:w-7 h-full flex items-center justify-center hover:bg-emerald-800 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 font-black text-xs font-mono">{qty}</span>
                        <button
                          onClick={() => updateQuantity(prod.id, qty + 1)}
                          className="w-6 sm:w-7 h-full flex items-center justify-center hover:bg-emerald-800 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(prod)}
                        className="h-7 sm:h-8 px-3 rounded-lg border-2 border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-black text-xs transition-colors cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <span>ADD</span>
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};
