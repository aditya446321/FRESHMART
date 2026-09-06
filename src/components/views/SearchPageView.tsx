import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/grocery';
import { 
  Search, 
  X, 
  ArrowLeft,
  Mic, 
  MicOff,
  Heart, 
  Plus, 
  Minus
} from 'lucide-react';

// Generated authentic assets matching user screenshot
import alooBhujiaImg from '../../assets/images/aloo_bhujia_pack_1788701542285.jpg';
import mixFarsanImg from '../../assets/images/mix_farsan_pack_1788701560968.jpg';
import bhujiaSevImg from '../../assets/images/bhujia_sev_orange_1788701581374.jpg';
import dahiHandiImg from '../../assets/images/dahi_handi_pot_1788701595669.jpg';
import playingCardsImg from '../../assets/images/playing_cards_box_1788701609994.jpg';
import acrylicColourImg from '../../assets/images/acrylic_colour_box_1788701633068.jpg';
import gelPensImg from '../../assets/images/gel_pens_pack_1788701649361.jpg';
import modellingClayImg from '../../assets/images/modelling_clay_box_1788701665483.jpg';
import spriteThumb from '../../assets/images/sprite_can_thumb_1788701690088.jpg';
import gokulMilkThumb from '../../assets/images/gokul_milk_thumb_1788701705698.jpg';
import luxSoapThumb from '../../assets/images/lux_soap_thumb_1788701720873.jpg';

interface SearchPageViewProps {
  onOpenQuickView: (prod: Product) => void;
  initialQuery?: string;
  onBack?: () => void;
}

// Authentic Bhujia & Mixtures dataset matching screenshot
const BHUJIA_PRODUCTS: Product[] = [
  {
    id: 'prod-bhujia-1',
    name: "Haldiram's Aloo Bhujia Sev",
    brand: "Haldiram's",
    category: "snacks-munchies",
    categoryName: "Snacks & Munchies",
    subcategory: "Namkeen & Bhujia",
    description: "Crispy potato noodles infused with mint, red chillies and lemon twist. 100% vegetarian Indian snack.",
    shortDescription: "Crispy mint potato bhujia sev",
    images: [alooBhujiaImg],
    primaryImage: alooBhujiaImg,
    price: 55,
    mrp: 60,
    discountPercentage: 8,
    weight: "200 g",
    unit: "pack",
    stock: 60,
    lowStockThreshold: 10,
    sku: "HAL-ALOO-200G",
    barcode: "890400440011",
    rating: 4.8,
    reviewCount: 342,
    reviews: [],
    status: 'active',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-05T00:00:00Z',
    highlights: ["100% Vegetarian", "Crisp stay-fresh zip lock", "Authentic Bikaneri spices"],
    tags: ["bhujia", "aloo bhujia", "haldiram", "sev", "namkeen", "farsan", "snacks"]
  },
  {
    id: 'prod-bhujia-2',
    name: "Chheda's Mix Farsan",
    brand: "Chheda's",
    category: "snacks-munchies",
    categoryName: "Snacks & Munchies",
    subcategory: "Namkeen & Bhujia",
    description: "Crunchy classic Mumbai style farsan mixture with sev, gathiya, roasted peanuts and spices.",
    shortDescription: "Special tea-time mix farsan",
    images: [mixFarsanImg],
    primaryImage: mixFarsanImg,
    price: 48,
    mrp: 55,
    discountPercentage: 12,
    weight: "170 g",
    unit: "pack",
    stock: 45,
    lowStockThreshold: 10,
    sku: "CHD-FARSAN-170G",
    barcode: "890400440022",
    rating: 4.7,
    reviewCount: 215,
    reviews: [],
    status: 'active',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-05T00:00:00Z',
    highlights: ["Mumbai Special", "Mildly spiced", "Fresh crunchy texture"],
    tags: ["farsan", "chheda", "mix farsan", "namkeen", "sev", "snacks"]
  },
  {
    id: 'prod-bhujia-3',
    name: "Haldiram's Bhujia Sev",
    brand: "Haldiram's",
    category: "snacks-munchies",
    categoryName: "Snacks & Munchies",
    subcategory: "Namkeen & Bhujia",
    description: "Original Bikaneri moth dal bhujia sev made with secret Rajasthani spices and cold-pressed oil.",
    shortDescription: "Original Bikaneri bhujia sev",
    images: [bhujiaSevImg],
    primaryImage: bhujiaSevImg,
    price: 58,
    mrp: 65,
    discountPercentage: 10,
    weight: "200 g",
    unit: "pack",
    stock: 80,
    lowStockThreshold: 10,
    sku: "HAL-BHUJIA-200G",
    barcode: "890400440033",
    rating: 4.9,
    reviewCount: 520,
    reviews: [],
    status: 'active',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-05T00:00:00Z',
    highlights: ["Authentic Bikaneri Recipe", "Rich in Protein", "Zero trans fat"],
    tags: ["bhujia", "bhujia sev", "haldiram", "sev", "namkeen", "snacks"]
  },
  {
    id: 'prod-bhujia-4',
    name: "Bikaji Bikaneri Bhujia Classic",
    brand: "Bikaji",
    category: "snacks-munchies",
    categoryName: "Snacks & Munchies",
    subcategory: "Namkeen & Bhujia",
    description: "Traditional spicy moth bean flour crispy sev seasoned with black pepper and cardamom.",
    shortDescription: "Spicy classic Bikaneri bhujia",
    images: [bhujiaSevImg],
    primaryImage: bhujiaSevImg,
    price: 52,
    mrp: 60,
    discountPercentage: 13,
    weight: "200 g",
    unit: "pack",
    stock: 50,
    lowStockThreshold: 10,
    sku: "BIK-BHUJIA-200G",
    barcode: "890400440044",
    rating: 4.6,
    reviewCount: 180,
    reviews: [],
    status: 'active',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-05T00:00:00Z',
    highlights: ["Traditional Taste", "Crisp moth flour", "Spicy pepper punch"],
    tags: ["bikaji", "bhujia", "namkeen", "snacks"]
  },
  {
    id: 'prod-bhujia-5',
    name: "Haldiram's Khatta Meetha Mixture",
    brand: "Haldiram's",
    category: "snacks-munchies",
    categoryName: "Snacks & Munchies",
    subcategory: "Namkeen & Bhujia",
    description: "Sweet and tangy blend of puffed rice, crispy sev, green peas and golden raisins.",
    shortDescription: "Sweet & tangy festive mixture",
    images: [mixFarsanImg],
    primaryImage: mixFarsanImg,
    price: 55,
    mrp: 62,
    discountPercentage: 11,
    weight: "200 g",
    unit: "pack",
    stock: 65,
    lowStockThreshold: 10,
    sku: "HAL-KM-200G",
    barcode: "890400440055",
    rating: 4.8,
    reviewCount: 290,
    reviews: [],
    status: 'active',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-05T00:00:00Z',
    highlights: ["Sweet & Tangy", "Raisins & nuts", "Kid-friendly favorite"],
    tags: ["khatta meetha", "mixture", "haldiram", "farsan", "snacks"]
  }
];

export const SearchPageView: React.FC<SearchPageViewProps> = ({ 
  onOpenQuickView, 
  initialQuery = '',
  onBack 
}) => {
  const { products, addToCart, updateQuantity, getItemQuantity, wishlist, toggleWishlist } = useCart();
  
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechNotice, setSpeechNotice] = useState<string>('');
  
  // Recent searches state (mirroring user's screenshot)
  const [recentSearches, setRecentSearches] = useState<Array<{
    id: string;
    text: string;
    type: 'thumb' | 'icon';
    thumb?: string;
    query: string;
  }>>([
    { id: 'rs-1', text: 'sprite', type: 'thumb', thumb: spriteThumb, query: 'sprite' },
    { id: 'rs-2', text: 'spei', type: 'icon', query: 'spei' },
    { id: 'rs-3', text: 'gokul milk', type: 'thumb', thumb: gokulMilkThumb, query: 'milk' },
    { id: 'rs-4', text: 'lux soap', type: 'thumb', thumb: luxSoapThumb, query: 'soap' },
    { id: 'rs-5', text: 'surf excel bar', type: 'icon', query: 'surf excel' },
  ]);

  // Trending in your city items (mirroring user's screenshot)
  const trendingItems = [
    { id: 'trend-1', label: 'Pen', image: gelPensImg, query: 'pen' },
    { id: 'trend-2', label: 'Playing Cards', image: playingCardsImg, query: 'cards' },
    { id: 'trend-3', label: 'Dahi Handi', image: dahiHandiImg, query: 'handi' },
    { id: 'trend-4', label: 'Acrylic Colour', image: acrylicColourImg, query: 'colour' },
    { id: 'trend-5', label: 'Modelling Clay', image: modellingClayImg, query: 'clay' },
  ];

  // Sync initial query
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Combine catalog products with authentic Bhujia items
  const allSearchableProducts = useMemo(() => {
    const existingIds = new Set(products.map(p => p.id));
    const uniqueBhujia = BHUJIA_PRODUCTS.filter(p => !existingIds.has(p.id));
    return [...uniqueBhujia, ...products];
  }, [products]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const q = searchQuery.toLowerCase().trim();
    return allSearchableProducts.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [allSearchableProducts, searchQuery]);

  // Clear recent searches
  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  // Voice Search Handler
  const handleVoiceSearch = () => {
    // Check speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        setIsListening(true);
        setSpeechNotice('Listening... speak now');

        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          setSearchQuery(spokenText);
          setIsListening(false);
          setSpeechNotice('');
        };

        recognition.onerror = () => {
          setIsListening(false);
          setSpeechNotice('Voice input simulated: "Bhujia"');
          setSearchQuery('bhujia');
          setTimeout(() => setSpeechNotice(''), 2500);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
        setSearchQuery('bhujia');
      }
    } else {
      // Fallback
      setSpeechNotice('Simulated Voice Search: "Aloo Bhujia"');
      setSearchQuery('bhujia');
      setTimeout(() => setSpeechNotice(''), 2500);
    }
  };

  // Reusable Product Card matching the screenshot
  const renderBhujiaCard = (prod: Product) => {
    const qty = getItemQuantity(prod.id);
    const isWishlisted = wishlist.includes(prod.id);

    return (
      <div 
        key={prod.id}
        id={`product-card-${prod.id}`}
        className="bg-white rounded-2xl border border-neutral-200/80 p-2.5 sm:p-3 relative flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all select-none group"
      >
        {/* Wishlist Heart at top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(prod.id);
          }}
          className="absolute right-2.5 top-2.5 z-10 w-6 h-6 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
          title="Save to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'}`} />
        </button>

        {/* Product Image Area */}
        <div 
          className="relative w-full aspect-square flex items-center justify-center p-1.5 cursor-pointer"
          onClick={() => onOpenQuickView(prod)}
        >
          <img 
            src={prod.primaryImage} 
            alt={prod.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />

          {/* Green Vegetarian Indicator at bottom-right of image (FSSAI standard) */}
          <div className="absolute right-1 bottom-1 w-3.5 h-3.5 border border-emerald-600 rounded-[2px] p-[1.5px] flex items-center justify-center bg-white shadow-2xs">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </div>
        </div>

        {/* Pagination Dots below image (● ○ ○) */}
        <div className="flex items-center justify-center gap-1 my-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
          <div className="w-1 h-1 rounded-full bg-neutral-300" />
          <div className="w-1 h-1 rounded-full bg-neutral-300" />
        </div>

        {/* Product Name & Brand */}
        <div className="cursor-pointer mb-2" onClick={() => onOpenQuickView(prod)}>
          <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-tight min-h-[30px]">
            {prod.name}
          </h4>
        </div>

        {/* Bottom Action Row: Weight on left, ADD button on right */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 mt-auto">
          <span className="text-xs font-bold text-neutral-600 tracking-tight">
            {prod.weight || '200 g'}
          </span>

          {/* ADD button or Quantity Stepper */}
          {qty === 0 ? (
            <button
              id={`add-btn-${prod.id}`}
              onClick={() => addToCart(prod)}
              className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-extrabold text-[11px] sm:text-xs px-3 sm:px-4 py-1 rounded-lg bg-white active:scale-95 transition-all uppercase tracking-wider cursor-pointer shadow-2xs"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-emerald-600 text-white rounded-lg px-1.5 py-0.5 shadow-2xs">
              <button
                onClick={() => updateQuantity(prod.id, qty - 1)}
                className="w-5 h-5 flex items-center justify-center hover:bg-emerald-700 rounded cursor-pointer active:scale-90"
              >
                <Minus className="w-3 h-3 text-white" />
              </button>
              <span className="text-xs font-extrabold px-2 text-white min-w-[16px] text-center">
                {qty}
              </span>
              <button
                onClick={() => updateQuantity(prod.id, qty + 1)}
                className="w-5 h-5 flex items-center justify-center hover:bg-emerald-700 rounded cursor-pointer active:scale-90"
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main UI Body
  return (
    <div className="w-full bg-[#faf8f3] text-neutral-900 pb-12 select-none min-h-screen">
      
      {/* 1. Header Search Bar with Back Arrow & Mic */}
      <div className="sticky top-0 z-30 bg-[#faf8f3]/95 backdrop-blur-md px-3 sm:px-4 py-2.5 border-b border-neutral-200/50">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          {/* Back Arrow Button */}
          <button
            id="search-back-btn"
            onClick={onBack}
            className="w-9 h-9 rounded-full hover:bg-neutral-200/60 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Search Input Box */}
          <div className="flex-1 relative flex items-center bg-white rounded-2xl border border-neutral-200/90 shadow-2xs hover:border-neutral-300 transition-all">
            <input
              id="grocery-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for atta, dal, coke and more"
              className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-500 pl-4 pr-16 py-2.5 sm:py-3 text-sm font-medium outline-none"
              autoFocus
            />

            <div className="absolute right-3 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center text-neutral-600 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Microphone Voice Search */}
              <button
                onClick={handleVoiceSearch}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'hover:bg-neutral-100 text-neutral-700'
                }`}
                title="Voice search"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Voice Feedback Banner */}
        {speechNotice && (
          <div className="mt-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 py-1 rounded-xl border border-emerald-200">
            {speechNotice}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-3.5 sm:px-5 py-4 space-y-6">

        {/* 2. Recent Searches Section */}
        {recentSearches.length > 0 && !searchQuery && (
          <section className="space-y-3" id="recent-searches-section">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-neutral-900 tracking-tight">
                Recent searches
              </h3>
              <button
                id="clear-recent-searches-btn"
                onClick={handleClearRecent}
                className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                clear
              </button>
            </div>

            {/* Chips wrap */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {recentSearches.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSearchQuery(item.query)}
                  className="bg-white border border-neutral-200/90 hover:border-emerald-500 hover:bg-emerald-50/40 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-800 shadow-2xs cursor-pointer transition-all active:scale-95"
                >
                  {item.type === 'thumb' && item.thumb ? (
                    <img 
                      src={item.thumb} 
                      alt={item.text} 
                      className="w-4 h-4 object-contain rounded-xs"
                    />
                  ) : (
                    <Search className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 3. Trending In Your City Section */}
        {!searchQuery && (
          <section className="space-y-3" id="trending-city-section">
            <h3 className="text-sm sm:text-base font-black text-neutral-900 tracking-tight">
              Trending in your city
            </h3>

            {/* Horizontal Scroll Cards */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              {trendingItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSearchQuery(item.query)}
                  className="group shrink-0 flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-neutral-200/70 p-2 flex items-center justify-center shadow-2xs group-hover:border-emerald-500 transition-colors">
                    <img 
                      src={item.image} 
                      alt={item.label}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-neutral-800 text-center mt-1.5 max-w-[85px] truncate">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 4. Active Search Results OR Default "Bhujia & Mixtures" Section */}
        {searchQuery ? (
          <section className="space-y-3.5" id="search-results-section">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-neutral-900">
                Results for <span className="text-emerald-700">"{searchQuery}"</span>
              </h3>
              <span className="text-xs font-bold text-neutral-500">
                {searchResults.length} items found
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200/80 shadow-2xs space-y-3">
                <p className="text-sm font-black text-neutral-900">No matching groceries found for "{searchQuery}"</p>
                <p className="text-xs text-neutral-500">Try searching for aloo bhujia, milk, sprite, lux or farsan.</p>
                <button
                  onClick={() => setSearchQuery('bhujia')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700"
                >
                  Show Bhujia & Mixtures
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {searchResults.map(prod => renderBhujiaCard(prod))}
              </div>
            )}
          </section>
        ) : (
          <section className="space-y-3.5" id="bhujia-mixtures-section">
            <h3 className="text-sm sm:text-base font-black text-neutral-900 tracking-tight">
              Bhujia & Mixtures
            </h3>

            {/* 3-column / responsive grid matching user's photo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {BHUJIA_PRODUCTS.map(prod => renderBhujiaCard(prod))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
