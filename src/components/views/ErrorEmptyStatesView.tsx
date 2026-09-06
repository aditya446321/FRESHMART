import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  PackageOpen, 
  MapPinOff, 
  WifiOff, 
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
  Home
} from 'lucide-react';

interface ErrorEmptyStatesViewProps {
  onGoHome: () => void;
}

export const ErrorEmptyStatesView: React.FC<ErrorEmptyStatesViewProps> = ({ onGoHome }) => {
  const [activeStateTab, setActiveStateTab] = useState<'empty_cart' | 'no_search' | 'no_orders' | 'unserviceable' | 'payment_failed'>('empty_cart');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header (Stitch basketfresh_error_empty_states) */}
      <div className="space-y-1 text-center">
        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Stitch Design System Spec
        </span>
        <h1 className="text-2xl font-black text-neutral-900 font-display">
          Error & Empty State Interfaces
        </h1>
        <p className="text-xs text-neutral-500">
          Crafted empty states, 404 views, unserviceable location prompts and retry handlers.
        </p>
      </div>

      {/* State Switcher Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-neutral-200/80 shadow-2xs">
        {[
          { id: 'empty_cart' as const, label: '🛒 Empty Cart' },
          { id: 'no_search' as const, label: '🔍 Zero Results' },
          { id: 'no_orders' as const, label: '📦 No Orders' },
          { id: 'unserviceable' as const, label: '📍 Not Serviceable' },
          { id: 'payment_failed' as const, label: '⚠️ Payment Failed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStateTab(tab.id)}
            className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeStateTab === tab.id
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* State Presentation Canvas */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-neutral-200/80 shadow-xs text-center">
        
        {/* 1. Empty Cart */}
        {activeStateTab === 'empty_cart' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-neutral-900 font-display">Your Basket is Empty</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                You haven't added anything to your cart yet. Explore fresh fruits, daily milk, or pantry staples delivered in 10 minutes.
              </p>
            </div>
            <button
              onClick={onGoHome}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* 2. Zero Search Results */}
        {activeStateTab === 'no_search' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Search className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-neutral-900 font-display">No Groceries Found</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We couldn't find any products matching your search term. Check spelling or try popular categories like Dairy, Vegetables, or Atta.
              </p>
            </div>
            <button
              onClick={onGoHome}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Browse All Aisles
            </button>
          </div>
        )}

        {/* 3. No Orders Placed */}
        {activeStateTab === 'no_orders' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <PackageOpen className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-neutral-900 font-display">No Past Orders Placed</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Looks like you haven't placed any 10-minute grocery orders yet. Your order history, live tracking, and invoices will appear here.
              </p>
            </div>
            <button
              onClick={onGoHome}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Place Your First Order
            </button>
          </div>
        )}

        {/* 4. Location Not Serviceable */}
        {activeStateTab === 'unserviceable' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <MapPinOff className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-neutral-900 font-display">Location Currently Not Serviceable</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We are rapidly expanding! Our 10-minute micro fulfillment hub hasn't reached this pincode yet. Choose another address or notify us to open near you.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => alert('Thanks! We have recorded your pincode interest.')}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Notify When Live
              </button>
              <button
                onClick={onGoHome}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Change Address
              </button>
            </div>
          </div>
        )}

        {/* 5. Payment Failed */}
        {activeStateTab === 'payment_failed' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-neutral-900 font-display">Payment Authorization Failed</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Your bank or UPI app declined the transaction. No funds were debited from your account. You can retry with another UPI ID or Cash on Delivery.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => alert('Retrying payment gateway...')}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Payment</span>
              </button>
              <button
                onClick={onGoHome}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Return to Cart
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
