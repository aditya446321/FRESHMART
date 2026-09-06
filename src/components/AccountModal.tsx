import React, { useState } from 'react';
import { useCart, AccountTab } from '../context/CartContext';
import { COUPONS } from '../data/categories';
import { ProductCard } from './ProductCard';
import { Product } from '../types/grocery';
import { 
  X, 
  User, 
  Bell, 
  Heart, 
  Tag, 
  Settings, 
  HelpCircle, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2,
  Copy,
  ExternalLink,
  ChevronRight,
  Globe,
  Truck
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickView: (product: Product) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenQuickView,
}) => {
  const {
    currentUser,
    isLoggedIn,
    logout,
    accountActiveTab,
    setAccountActiveTab,
    isAccountModalOpen,
    closeAccountModal,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    wishlist,
    products,
    applyCoupon,
    storeSettings,
    updateStoreSettings
  } = useCart();

  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [localSettings, setLocalSettings] = useState(storeSettings);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  if (!isAccountModalOpen && !isOpen) return null;

  const handleClose = () => {
    if (typeof closeAccountModal === 'function') {
      closeAccountModal();
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(localSettings);
    setSaveSettingsSuccess(true);
    setTimeout(() => setSaveSettingsSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-neutral-100 my-auto flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-64 bg-neutral-50/80 border-b md:border-b-0 md:border-r border-neutral-200/80 p-4 sm:p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* User Avatar & Name */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-neutral-200">
              <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white font-black text-sm flex items-center justify-center shadow-xs">
                {currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'BF'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-neutral-900 truncate">
                  {currentUser ? currentUser.name : 'Guest Shopper'}
                </h3>
                <p className="text-[11px] text-neutral-500 truncate">
                  {currentUser ? currentUser.phone : 'Sign in for full perks'}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {[
                { id: 'profile' as AccountTab, label: 'My Profile', icon: User },
                { id: 'notifications' as AccountTab, label: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.read).length },
                { id: 'wishlist' as AccountTab, label: 'Saved Wishlist', icon: Heart, badge: wishlist.length },
                { id: 'coupons' as AccountTab, label: 'Coupons & Offers', icon: Tag },
                { id: 'settings' as AccountTab, label: 'Store & Settings', icon: Settings },
                { id: 'help' as AccountTab, label: 'Help & Support FAQ', icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = accountActiveTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAccountActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white text-emerald-800' : 'bg-rose-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 mt-4 border-t border-neutral-200">
            {isLoggedIn && (
              <button
                onClick={() => {
                  logout();
                  handleClose();
                }}
                className="w-full flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Content View */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
          {/* Top Bar with Close Button */}
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-base font-black text-neutral-900 capitalize">
              {accountActiveTab === 'profile' && 'Member Profile & Loyalty'}
              {accountActiveTab === 'notifications' && 'Notifications & Alerts'}
              {accountActiveTab === 'wishlist' && `Saved Items (${wishlist.length})`}
              {accountActiveTab === 'coupons' && 'Available Promo Vouchers'}
              {accountActiveTab === 'settings' && 'App Settings & Custom Gateway URL'}
              {accountActiveTab === 'help' && 'Frequently Asked Questions & Support'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Views */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* TAB: PROFILE */}
            {accountActiveTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 rounded-3xl relative overflow-hidden shadow-sm">
                  <div className="relative z-10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                      Verified Member Profile
                    </span>
                    <h3 className="text-xl font-black">{currentUser?.name || 'Valued Member'}</h3>
                    <p className="text-xs text-emerald-100">
                      Member Phone: {currentUser?.phone || '+91 98765 43210'} • Member since Jan 2025
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-emerald-200">
                      <span className="flex items-center gap-1">⚡ Free Express Delivery Always</span>
                      <span className="flex items-center gap-1">✨ Priority Darkstore Packing</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-1">
                    <span className="text-xs text-neutral-500 font-bold">Total Orders Completed</span>
                    <p className="text-2xl font-black text-neutral-900 font-mono">14</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-1">
                    <span className="text-xs text-neutral-500 font-bold">Lifetime Grocery Savings</span>
                    <p className="text-2xl font-black text-emerald-700 font-mono">₹2,840</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {accountActiveTab === 'notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-semibold">
                    Real-time status updates on packing, dispatches and instant sales.
                  </span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                    <p className="text-xs">No notifications at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          n.read ? 'bg-white border-neutral-100 opacity-70' : 'bg-emerald-50/60 border-emerald-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                            <Bell className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900">{n.title}</h4>
                            <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{n.message}</p>
                            <span className="text-[10px] text-neutral-400 mt-1 block font-mono">{n.timestamp}</span>
                          </div>
                        </div>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: WISHLIST */}
            {accountActiveTab === 'wishlist' && (
              <div className="space-y-4">
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                    <h3 className="text-sm font-bold text-neutral-800">Your wishlist is empty</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Tap the heart icon on any product card to bookmark it for quick ordering.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {wishlistedProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onOpenQuickView={onOpenQuickView}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: COUPONS */}
            {accountActiveTab === 'coupons' && (
              <div className="space-y-3.5">
                {COUPONS.map((cpn) => (
                  <div 
                    key={cpn.code}
                    className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-emerald-950 font-mono tracking-wider">
                          {cpn.code}
                        </span>
                        <span className="text-[10px] font-black uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                          {cpn.discountType === 'flat' ? `₹${cpn.discountValue} FLAT` : `${cpn.discountValue}% OFF`}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">
                        {cpn.description}
                      </p>
                      <span className="text-[10px] text-neutral-400 mt-0.5 block">
                        Min. Cart: ₹{cpn.minOrderValue}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCoupon(cpn.code)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedCoupon === cpn.code ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Apply Code</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SETTINGS & CUSTOM PAYMENT URL */}
            {accountActiveTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-5">
                {saveSettingsSuccess && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Settings updated successfully!
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Store Display Name
                    </label>
                    <input
                      type="text"
                      value={localSettings.storeName}
                      onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Custom Payment Gateway URL (Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={localSettings.customPaymentGatewayUrl || ''}
                      onChange={(e) => setLocalSettings({ ...localSettings, customPaymentGatewayUrl: e.target.value })}
                      placeholder="https://your-merchant-gateway.com/pay"
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                    <p className="text-[11px] text-neutral-400 mt-1">
                      If configured, this URL will appear as an available payment option in Checkout.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Free Delivery Threshold (₹)
                      </label>
                      <input
                        type="number"
                        value={localSettings.freeDeliveryThreshold}
                        onChange={(e) => setLocalSettings({ ...localSettings, freeDeliveryThreshold: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Standard Delivery Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={localSettings.standardDeliveryFee}
                        onChange={(e) => setLocalSettings({ ...localSettings, standardDeliveryFee: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Save Configuration
                </button>
              </form>
            )}

            {/* TAB: HELP FAQ */}
            {accountActiveTab === 'help' && (
              <div className="space-y-3">
                {[
                  {
                    q: 'How does FreshMart deliver in 10 minutes?',
                    a: 'We operate hyper-local dark stores (micro-fulfillment centers) located within 2-3 km of residential areas. Every item is picked and packed in under 2 minutes, allowing delivery partners to complete drops in 8-10 minutes.'
                  },
                  {
                    q: 'What if an item is damaged or missing?',
                    a: 'We offer an instant, no-questions-asked replacement or refund directly to your source payment method within 15 minutes.'
                  },
                  {
                    q: 'Is there a minimum order requirement?',
                    a: 'There is no minimum order requirement! You can order a single lemon or a full month of groceries. Orders above ₹199 enjoy FREE delivery.'
                  },
                  {
                    q: 'How can I contact customer support?',
                    a: 'Our support team is active 24x7 via in-app chat or phone at 1800-FRESH-MART.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
                    <h4 className="text-xs font-black text-neutral-900">{faq.q}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
