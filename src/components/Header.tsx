import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  ChevronDown, 
  Heart, 
  User, 
  ClipboardList,
  Bookmark,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory?: string | null;
  onSelectCategory?: (cat: string | null) => void;
  onOpenOrders: () => void;
  onOpenAddressModal: () => void;
  onOpenSearch?: () => void;
  onOpenProfileDrawer?: () => void;
  onNavigateHome?: () => void;
  onOpenWishlist?: () => void;
  onOpenReorder?: () => void;
  onOpenNotifications?: () => void;
}

const SEARCH_PLACEHOLDERS = [
  "Search for 'Protein Atta'",
  "Search for 'Mobiles'",
  "Search for 'Maggi Noodles'",
  "Search for 'Farm Fresh Milk'",
  "Search for 'Aloo Bhujia'",
  "Search for 'Chakki Atta'",
  "Search for 'Cold Drinks'",
  "Search for 'Dahi Handi'"
];

const HeaderComponent: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  onOpenOrders,
  onOpenAddressModal,
  onOpenSearch,
  onOpenProfileDrawer,
  onNavigateHome,
  onOpenWishlist,
  onOpenReorder,
  onOpenNotifications
}) => {
  const { 
    totalItemsCount, 
    finalTotal, 
    setIsCartOpen, 
    selectedAddress,
    wishlist,
    deliveryType,
    setIsSearchOpen,
    orders,
    currentUser,
    isLoggedIn,
    unreadNotificationsCount
  } = useCart();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotating search hint matching the screenshot
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch();
  };

  const addressText = selectedAddress
    ? `To ${selectedAddress.flatNo}, ${selectedAddress.street}${selectedAddress.landmark ? `, ${selectedAddress.landmark}` : ''}`
    : 'To Kranti Maidan, Vikhroli West, Mumbai';

  return (
    <header className="sticky top-0 z-40 bg-[#fcf1f4] border-b border-[#ebd2dc] shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5">
        {/* Top Header Row: Address on Left, Profile on Right (Strictly Clean) */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Delivery ETA & Address Selector */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
            {/* Clickable ETA & Location */}
            <div 
              onClick={onOpenAddressModal}
              className="flex flex-col cursor-pointer group select-none text-left py-0.5"
              title="Change Delivery Location in Mumbai"
            >
              {/* ETA Display */}
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#2e0039] tracking-tight leading-none">
                  {deliveryType === 'instant' ? '21 mins' : 'Slot Delivery'}
                </span>
              </div>

              {/* Delivery Address with Dropdown Arrow */}
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#2e0039]/90 group-hover:text-[#2e0039] transition-colors mt-0.5 max-w-[220px] sm:max-w-[340px] md:max-w-[440px] truncate">
                <span className="truncate">
                  {addressText}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2e0039] shrink-0 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Right Action: Profile Avatar (On phone & tablet ONLY Profile is shown) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop-only Cart button (hidden on phone & tablet) */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer font-bold text-xs shrink-0 active:scale-95"
              title="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-neutral-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-emerald-600">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[9px] uppercase font-bold text-emerald-100 tracking-wider">
                  {totalItemsCount === 0 ? 'Cart' : `${totalItemsCount} Items`}
                </span>
                <span className="font-extrabold text-white text-xs">
                  {totalItemsCount === 0 ? '₹0' : `₹${finalTotal}`}
                </span>
              </div>
            </button>

            {/* Profile Avatar Button (Phone, Tablet & Desktop) */}
            <button
              id="header-profile-avatar-btn"
              onClick={onOpenProfileDrawer}
              className="w-10 h-10 rounded-full bg-[#343a40] hover:bg-neutral-900 text-white flex items-center justify-center cursor-pointer transition-colors shadow-2xs shrink-0 ring-2 ring-white/60"
              title="Profile & Menu"
            >
              {isLoggedIn && currentUser && currentUser.name ? (
                <span className="font-black text-sm tracking-tight text-white">
                  {currentUser.name.slice(0, 1).toUpperCase()}
                </span>
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Second Row: Search Bar & Bookmark Icon (1:1 with Screenshot 1) */}
        <div className="mt-2 sm:mt-2.5 flex items-center gap-2 sm:gap-3">
          {/* Search Box Pill Container */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex-1 relative bg-white rounded-2xl border border-[#ebd0d9] hover:border-[#dfbac7] focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-xs flex items-center px-3 sm:px-4 py-2 sm:py-2.5 transition-all cursor-text"
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
            }}
          >
            <input
              id="header-grocery-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setIsSearchOpen(true);
                if (onOpenSearch) onOpenSearch();
              }}
              placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none pr-2"
            />

            {/* Clear Button if Search query exists */}
            {searchTerm && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchTerm('');
                }}
                className="w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center text-neutral-600 cursor-pointer mr-2 shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {/* Right Icons inside search container: Magnifying Glass | List Icon */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 text-neutral-500">
              <button
                type="submit"
                className="p-1 text-neutral-600 hover:text-emerald-700 transition-colors cursor-pointer"
                title="Search Products"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Vertical Divider */}
              <span className="h-4 sm:h-5 w-px bg-neutral-300 mx-0.5" />

              {/* Notes / Clipboard List Icon (opens Reorder / Quick List) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenReorder) onOpenReorder();
                }}
                className="p-1 text-neutral-600 hover:text-emerald-700 transition-colors cursor-pointer"
                title="Order Again / Quick Shopping List"
              >
                <ClipboardList className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </form>

          {/* Right Rounded-Square Bookmark Button (1:1 with Screenshot 1) */}
          <button
            id="header-bookmark-wishlist-btn"
            onClick={onOpenWishlist}
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-white border border-[#4c1653]/25 text-[#4c1653] hover:bg-[#fbf0f4] hover:border-[#4c1653]/40 flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0 relative"
            title="Saved Items & Wishlist"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
            {(wishlist?.length || 0) > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-2xs">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

export const Header = React.memo(HeaderComponent);
