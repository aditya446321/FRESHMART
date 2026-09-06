import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { COUPONS } from '../data/categories';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  ShoppingBag,
  MapPin
} from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    clearCart,
    itemTotal,
    mrpTotal,
    savings,
    deliveryFee,
    handlingFee,
    couponDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    finalTotal,
    selectedAddress,
    deliveryType
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (code: string) => {
    const res = applyCoupon(code);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const freeDeliveryThreshold = 199;
  const neededForFreeDelivery = Math.max(0, freeDeliveryThreshold - itemTotal);
  const freeDeliveryProgress = Math.min(100, Math.round((itemTotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-neutral-900 leading-tight">
                My Cart ({items.reduce((a, b) => a + b.quantity, 0)} items)
              </h2>
              <p className="text-[11px] text-neutral-500">
                {deliveryType === 'instant' ? '⚡ 10 Mins' : '📅 Scheduled'} to {selectedAddress.type}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-neutral-400 hover:text-rose-600 font-medium px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors"
                title="Clear Cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-black text-neutral-900">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Looks like you haven't added anything to your cart yet. Explore fresh fruits, dairy and snacks!
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Delivery ETA banner */}
              <div className="bg-emerald-50/90 border border-emerald-200/70 rounded-2xl p-3 flex items-center justify-between gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-black text-emerald-950">Delivery in 10-15 mins</h4>
                    <p className="text-[11px] text-emerald-800 truncate font-medium">
                      {selectedAddress.flatNo}, {selectedAddress.street}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-white text-emerald-800 px-2 py-1 rounded-lg border border-emerald-200/80 shadow-2xs shrink-0 uppercase tracking-wide">
                  Express
                </span>
              </div>

              {/* Free delivery progress bar (Anti-Floating Layout) */}
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  {neededForFreeDelivery > 0 ? (
                    <div className="font-semibold text-neutral-700 flex items-center gap-1.5 min-w-0">
                      <Truck className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="truncate">
                        Add <strong className="text-emerald-700 font-black">₹{neededForFreeDelivery}</strong> more for <strong className="text-emerald-700 font-bold whitespace-nowrap">FREE Delivery</strong>
                      </span>
                    </div>
                  ) : (
                    <div className="font-bold text-emerald-700 flex items-center gap-1.5 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        Unlocked <strong className="font-black whitespace-nowrap">FREE Express Delivery</strong>!
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] text-neutral-500 font-mono font-bold bg-white px-2 py-0.5 rounded border border-neutral-200 shrink-0 self-start sm:self-auto">
                    ₹199 target
                  </span>
                </div>
                <div className="w-full bg-neutral-200/80 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-extrabold uppercase text-neutral-400 tracking-wider">
                  Items Added ({items.length})
                </h3>
                {items.map((item) => (
                  <div 
                    key={`${item.productId}-${item.variantId || 'base'}`}
                    className="flex items-center justify-between gap-3 p-2.5 bg-white rounded-2xl border border-neutral-100 shadow-2xs hover:border-neutral-200 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-neutral-50 p-1 shrink-0 border border-neutral-100 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 truncate leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-medium">
                        {item.weight}
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs font-black text-neutral-900">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-[10px] text-neutral-400 line-through">
                            ₹{item.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center bg-emerald-700 text-white rounded-xl shadow-2xs overflow-hidden h-7">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="w-6 h-full flex items-center justify-center hover:bg-emerald-800 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 font-bold text-xs min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="w-6 h-full flex items-center justify-center hover:bg-emerald-800 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="bg-neutral-50 rounded-2xl p-3 border border-neutral-100 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800">
                  <Tag className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Coupons & Offers</span>
                </div>

                {appliedCoupon ? (
                  <div className="bg-emerald-100/70 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-emerald-900 tracking-wider">
                          '{appliedCoupon.code}' APPLIED
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <p className="text-[10px] text-emerald-700">
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter Promo Code"
                        className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-neutral-200 focus:border-emerald-600 focus:outline-none uppercase font-bold text-neutral-800 placeholder-neutral-400"
                      />
                      <button
                        onClick={() => handleApplyCoupon(couponInput)}
                        disabled={!couponInput.trim()}
                        className="bg-emerald-700 disabled:opacity-50 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick coupon badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {COUPONS.map((cpn) => (
                        <button
                          key={cpn.code}
                          onClick={() => handleApplyCoupon(cpn.code)}
                          className="text-[10px] font-bold bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 border-dashed px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>{cpn.code}</span>
                          <span className="text-neutral-400">•</span>
                          <span>Save {cpn.discountType === 'flat' ? `₹${cpn.discountValue}` : `${cpn.discountValue}%`}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {couponFeedback && (
                  <p className={`text-[11px] font-semibold ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 space-y-2.5 text-xs shadow-2xs">
                <h4 className="font-extrabold text-neutral-900 uppercase tracking-wider text-[11px] pb-1.5 border-b border-neutral-100">
                  Bill Summary
                </h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Item Total</span>
                    <span className="font-bold text-neutral-900 font-mono text-xs">₹{itemTotal}</span>
                  </div>

                  <div className="flex justify-between items-center text-neutral-600">
                    <span className="flex items-center gap-1">
                      Handling Charge <Info className="w-3 h-3 text-neutral-400" />
                    </span>
                    <span className="font-bold text-neutral-900 font-mono text-xs">₹{handlingFee}</span>
                  </div>

                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Delivery Partner Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          FREE
                        </span>
                      ) : (
                        <span className="font-bold text-neutral-900 font-mono text-xs">₹{deliveryFee}</span>
                      )}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center font-bold text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 p-2.5 rounded-xl">
                      <span className="truncate pr-2">Coupon Savings ({appliedCoupon?.code})</span>
                      <span className="shrink-0 font-mono text-xs">- ₹{couponDiscount}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2.5 border-t border-neutral-200 flex justify-between items-center text-sm font-black text-neutral-900">
                  <span className="text-neutral-900">To Pay</span>
                  <span className="text-base font-black text-emerald-700 font-mono">₹{finalTotal}</span>
                </div>

                {savings > 0 && (
                  <div className="bg-emerald-600/10 text-emerald-800 text-center py-2 rounded-xl text-[11px] font-extrabold border border-emerald-200/40">
                    🎉 You saved ₹{savings} on this order!
                  </div>
                )}
              </div>

              {/* Cancellation policy */}
              <div className="p-3 bg-neutral-50 rounded-xl text-[10px] text-neutral-500 leading-relaxed border border-neutral-200/60">
                <strong>Fast-dispatch policy:</strong> Orders are dispatched from your neighborhood micro-warehouse within 120 seconds to guarantee 10-minute delivery.
              </div>
            </>
          )}
        </div>

        {/* Bottom CTA / Checkout Bar (Fixed Alignment, No Floating Address) */}
        {items.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-white sticky bottom-0 z-10 shadow-lg space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-xs px-1 bg-neutral-50 p-2 rounded-xl border border-neutral-200/60">
              <span className="text-neutral-500 font-semibold text-[11px] shrink-0 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Delivering to:</span>
              </span>
              <span className="font-bold text-neutral-900 text-[11px] truncate text-right flex-1 min-w-0">
                {selectedAddress.flatNo}, {selectedAddress.street}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white rounded-2xl font-black text-sm flex items-center justify-between px-5 shadow-md transition-all cursor-pointer"
            >
              <div className="text-left leading-tight shrink-0">
                <span className="block text-[10px] text-emerald-200 font-bold uppercase">
                  {items.reduce((a, b) => a + b.quantity, 0)} Items
                </span>
                <span className="text-base font-extrabold">₹{finalTotal}</span>
              </div>

              <div className="flex items-center gap-1.5 font-black shrink-0">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
