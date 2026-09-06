import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Calendar, 
  Heart, 
  Bell, 
  Headphones, 
  Gift, 
  ShieldCheck, 
  ChevronRight, 
  LogOut, 
  Wallet, 
  Zap, 
  Moon, 
  Sun, 
  Check, 
  Copy,
  ExternalLink,
  Leaf
} from 'lucide-react';

import { StitchScreen } from '../types/grocery';

interface ProfileHamburgerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrders?: () => void;
  onOpenAddresses?: () => void;
  onOpenSubscriptions?: () => void;
  onOpenWishlist?: () => void;
  onOpenNotifications?: () => void;
  onOpenSupport?: () => void;
  onNavigate?: (screen: StitchScreen) => void;
}

export const ProfileHamburgerDrawer: React.FC<ProfileHamburgerDrawerProps> = ({
  isOpen,
  onClose,
  onOpenOrders,
  onOpenAddresses,
  onOpenSubscriptions,
  onOpenWishlist,
  onOpenNotifications,
  onOpenSupport,
  onNavigate
}) => {
  const { 
    currentUser, 
    isLoggedIn, 
    logout, 
    openAuthModal, 
    orders, 
    wishlist, 
    subscriptions,
    unreadNotificationsCount 
  } = useCart();

  const [copiedCode, setCopiedCode] = useState(false);
  const [isVegMode, setIsVegMode] = useState(false);
  const [freshCashBalance] = useState(150);

  if (!isOpen) return null;

  const handleOrders = () => {
    onClose();
    if (onOpenOrders) onOpenOrders();
    else if (onNavigate) onNavigate('my_orders');
  };

  const handleAddresses = () => {
    onClose();
    if (onOpenAddresses) onOpenAddresses();
    else if (onNavigate) onNavigate('saved_addresses');
  };

  const handleSubscriptions = () => {
    onClose();
    if (onOpenSubscriptions) onOpenSubscriptions();
    else if (onNavigate) onNavigate('daily_subscriptions');
  };

  const handleWishlist = () => {
    onClose();
    if (onOpenWishlist) onOpenWishlist();
    else if (onNavigate) onNavigate('wishlist');
  };

  const handleNotifications = () => {
    onClose();
    if (onOpenNotifications) onOpenNotifications();
    else if (onNavigate) onNavigate('notifications');
  };

  const handleSupport = () => {
    onClose();
    if (onOpenSupport) onOpenSupport();
  };

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('FRESH221');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel (Mobile: 85vw max-w-sm, Tablet/Desktop: max-w-md) */}
      <div className="absolute inset-y-0 right-0 sm:left-auto sm:right-0 max-w-md w-full bg-neutral-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* 1. Header with Clean Profile Card */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-neutral-900 text-white p-5 relative shrink-0">
          <button 
            id="close-profile-drawer-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {isLoggedIn && currentUser ? (
            <div className="flex items-center gap-3.5 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white/40">
                {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-black text-white truncate leading-tight">
                    {currentUser.name || 'Aditya'}
                  </h3>
                </div>
                <p className="text-xs text-emerald-100 font-medium truncate mt-0.5">
                  {currentUser.phone || '+91 98765 43210'}
                </p>
                <p className="text-[11px] text-emerald-200/80 truncate">
                  {currentUser.email || 'adixtya221@gmail.com'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-2">
              <div>
                <h3 className="text-lg font-black text-white">Welcome to FreshMart!</h3>
                <p className="text-xs text-emerald-100 font-medium">Get groceries delivered in 10 mins</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  openAuthModal('login');
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-900 font-extrabold text-xs cursor-pointer shadow-md transition-all active:scale-95"
              >
                Sign In
              </button>
            </div>
          )}

          {/* FreshCash Wallet Banner */}
          <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">FreshCash Balance</p>
                <p className="text-base font-black text-white">₹{freshCashBalance}</p>
              </div>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-200 bg-white/10 px-2.5 py-1 rounded-lg">
              Active Wallet
            </span>
          </div>
        </div>

        {/* 2. Scrollable Menu Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          
          {/* Quick Freshmart Essentials Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* My Orders */}
            <button
              id="drawer-my-orders-btn"
              onClick={handleOrders}
              className="bg-white hover:bg-emerald-50/50 p-3 rounded-2xl border border-neutral-200/80 hover:border-emerald-500 shadow-2xs flex items-center gap-2.5 text-left cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-neutral-900 leading-tight">My Orders</p>
                <p className="text-[10px] text-neutral-500 font-bold">{orders?.length || 0} orders placed</p>
              </div>
            </button>

            {/* Saved Addresses */}
            <button
              id="drawer-saved-addresses-btn"
              onClick={handleAddresses}
              className="bg-white hover:bg-emerald-50/50 p-3 rounded-2xl border border-neutral-200/80 hover:border-emerald-500 shadow-2xs flex items-center gap-2.5 text-left cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-neutral-900 leading-tight">Addresses</p>
                <p className="text-[10px] text-neutral-500 font-bold">Mumbai Locations</p>
              </div>
            </button>

            {/* Daily Subscriptions */}
            <button
              id="drawer-subscriptions-btn"
              onClick={handleSubscriptions}
              className="bg-white hover:bg-emerald-50/50 p-3 rounded-2xl border border-neutral-200/80 hover:border-emerald-500 shadow-2xs flex items-center gap-2.5 text-left cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-neutral-900 leading-tight">Subscriptions</p>
                <p className="text-[10px] text-neutral-500 font-bold">Daily Milk & Bread</p>
              </div>
            </button>

            {/* Wishlist */}
            <button
              id="drawer-wishlist-btn"
              onClick={handleWishlist}
              className="bg-white hover:bg-emerald-50/50 p-3 rounded-2xl border border-neutral-200/80 hover:border-emerald-500 shadow-2xs flex items-center gap-2.5 text-left cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-neutral-900 leading-tight">Favorites</p>
                <p className="text-[10px] text-neutral-500 font-bold">{wishlist?.length || 0} saved items</p>
              </div>
            </button>
          </div>

          {/* Pure Veg Mode Toggle */}
          <div className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-black text-neutral-900">Pure Veg Mode</p>
                <p className="text-[10px] text-neutral-500 font-medium">Show only 100% vegetarian products</p>
              </div>
            </div>
            <button
              onClick={() => setIsVegMode(!isVegMode)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isVegMode ? 'bg-emerald-600' : 'bg-neutral-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                isVegMode ? 'left-5' : 'left-0.5'
              }`} />
            </button>
          </div>

          {/* Refer & Earn Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-neutral-900">Refer Friends, Earn ₹100</span>
              </div>
              <button
                onClick={handleCopyReferral}
                className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedCode ? 'Copied!' : 'Copy FRESH221'}
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-1">
              Invite friends in Mumbai to Freshmart. When they place their first order, you both get ₹100 FreshCash!
            </p>
          </div>

          {/* Freshmart Support & Notifications List */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 shadow-2xs overflow-hidden">
            <button
              onClick={handleNotifications}
              className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-neutral-600" />
                <span className="text-xs font-bold text-neutral-800">Notifications & Deal Alerts</span>
              </div>
              {unreadNotificationsCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={handleSupport}
              className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">24x7 Customer Support</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Chat with Mumbai Delivery Support</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-xs font-bold text-neutral-800 block">21-Min Delivery Guarantee</span>
                  <span className="text-[10px] text-neutral-500 font-medium">100% genuine & farm fresh items</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Drawer Footer: Sign out & Version */}
        <div className="p-4 bg-white border-t border-neutral-200/80 shrink-0 space-y-2">
          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100/80 text-rose-700 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 px-1 pt-1">
            <span>Freshmart • Mumbai</span>
            <span>Version 3.4.2</span>
          </div>
        </div>

      </div>
    </div>
  );
};
