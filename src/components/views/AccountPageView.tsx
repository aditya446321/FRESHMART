import React from 'react';
import { useCart } from '../../context/CartContext';
import { 
  User, 
  Wallet, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Phone,
  Mail
} from 'lucide-react';

interface AccountPageViewProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
}

export const AccountPageView: React.FC<AccountPageViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { currentUser, isLoggedIn, logout, savedAddresses, orders, subscriptions } = useCart();

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 max-w-md mx-auto space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-black text-neutral-900 font-display">Sign In to Your Account</h3>
          <p className="text-xs text-neutral-500">
            Access saved addresses, past orders, live tracking, wallet balance, and daily milk subscriptions.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const menuItems = [
    { id: 'orders', label: 'My Past & Active Orders', desc: `${orders.length} orders placed`, icon: <ShoppingBag className="w-4 h-4 text-emerald-700" /> },
    { id: 'subscriptions', label: 'Daily Milk & Essentials Subscriptions', desc: `${subscriptions.length} active schedule`, icon: <Calendar className="w-4 h-4 text-blue-600" /> },
    { id: 'addresses', label: 'Saved Delivery Addresses', desc: `${savedAddresses.length} saved locations`, icon: <MapPin className="w-4 h-4 text-amber-600" /> },
    { id: 'offers', label: 'Coupons & Exclusive Deals', desc: '4 promo vouchers ready', icon: <CreditCard className="w-4 h-4 text-purple-600" /> },
    { id: 'notifications', label: 'Notifications & Alerts', desc: 'Order status and deal drops', icon: <Bell className="w-4 h-4 text-rose-500" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Profile Card Header (Stitch basketfresh_account) */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white font-black text-xl flex items-center justify-center shadow-xs">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-neutral-900">{currentUser.name}</h1>
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <Phone className="w-3 h-3 text-neutral-400" /> {currentUser.phone}
              </p>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <Mail className="w-3 h-3 text-neutral-400" /> {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-neutral-500" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Wallet & Savings Ribbon */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-100">
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Freshmart Cash</span>
              <p className="text-lg font-black text-emerald-950">₹250.00</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">Lifetime Savings</span>
              <p className="text-lg font-black text-amber-950">₹1,840</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Account Navigation Links */}
      <div className="bg-white rounded-3xl p-3 border border-neutral-200/80 shadow-xs divide-y divide-neutral-100">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 rounded-2xl transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">{item.label}</h4>
                <p className="text-[11px] text-neutral-400">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        ))}
      </div>

      {/* Customer Support & Safety */}
      <div className="p-4 rounded-2xl bg-neutral-100/80 border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>FSSAI License #11223344556677 • 100% Secure SSL Checkout</span>
        </div>
        <a href="mailto:support@freshmart.in" className="font-bold text-neutral-800 hover:underline">
          Help & Support
        </a>
      </div>

    </div>
  );
};
