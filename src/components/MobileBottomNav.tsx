import React from 'react';
import { Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StitchScreen } from '../types/grocery';

interface MobileBottomNavProps {
  currentScreen: StitchScreen;
  onNavigate: (screen: StitchScreen) => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenCart,
  onOpenProfile,
}) => {
  const { totalItemsCount, currentUser, isLoggedIn } = useCart();

  const isHomeActive = currentScreen === 'home';
  const isCategoriesActive = currentScreen === 'category' || currentScreen === 'categories';
  const isSearchActive = currentScreen === 'search';
  const isCartActive = currentScreen === 'cart';
  const isProfileActive = currentScreen === 'account' || currentScreen === 'profile';

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around pb-[calc(0.375rem+env(safe-area-inset-bottom))]"
    >
      {/* 1. HOME */}
      <button
        id="nav-tab-home"
        onClick={() => onNavigate('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group min-h-[44px] ${
          isHomeActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <Home className={`w-5 h-5 transition-transform group-active:scale-90 ${isHomeActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          {isHomeActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
          )}
        </div>
        <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isHomeActive ? 'font-black' : 'font-medium'}`}>
          Home
        </span>
      </button>

      {/* 2. CATEGORIES */}
      <button
        id="nav-tab-categories"
        onClick={() => onNavigate('category')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group min-h-[44px] ${
          isCategoriesActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <LayoutGrid className={`w-5 h-5 transition-transform group-active:scale-90 ${isCategoriesActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          {isCategoriesActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
          )}
        </div>
        <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isCategoriesActive ? 'font-black' : 'font-medium'}`}>
          Categories
        </span>
      </button>

      {/* 3. SEARCH */}
      <button
        id="nav-tab-search"
        onClick={() => onNavigate('search')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group min-h-[44px] ${
          isSearchActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <Search className={`w-5 h-5 transition-transform group-active:scale-90 ${isSearchActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          {isSearchActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
          )}
        </div>
        <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isSearchActive ? 'font-black' : 'font-medium'}`}>
          Search
        </span>
      </button>

      {/* 4. CART */}
      <button
        id="nav-tab-cart"
        onClick={onOpenCart}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group min-h-[44px] ${
          isCartActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <ShoppingBag className={`w-5 h-5 transition-transform group-active:scale-90 ${isCartActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-emerald-700 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
              {totalItemsCount}
            </span>
          )}
          {isCartActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
          )}
        </div>
        <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isCartActive ? 'font-black' : 'font-medium'}`}>
          Cart
        </span>
      </button>

      {/* 5. PROFILE */}
      <button
        id="nav-tab-profile"
        onClick={onOpenProfile}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group min-h-[44px] ${
          isProfileActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          {isLoggedIn && currentUser ? (
            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[9px] font-black flex items-center justify-center ring-1 ring-emerald-600">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
          ) : (
            <User className={`w-5 h-5 transition-transform group-active:scale-90 ${isProfileActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          )}
          {/* Notification online dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
          {isProfileActive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
          )}
        </div>
        <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isProfileActive ? 'font-black' : 'font-medium'}`}>
          {isLoggedIn && currentUser ? currentUser.name.split(' ')[0] : 'Profile'}
        </span>
      </button>
    </nav>
  );
};
