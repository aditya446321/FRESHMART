import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { totalItemsCount, finalTotal, setIsCartOpen, isCartOpen } = useCart();

  if (totalItemsCount === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-80 z-30 animate-in slide-in-from-bottom-3 duration-200">
      <button
        id="floating-cart-view-btn"
        onClick={() => setIsCartOpen(true)}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between font-black text-xs active:scale-98 transition-all cursor-pointer border border-emerald-600"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="block text-[10px] text-emerald-200 uppercase font-extrabold">
              {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
            </span>
            <span className="text-sm font-black">₹{finalTotal}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white text-emerald-800 px-3 py-1.5 rounded-xl font-black text-xs shadow-2xs">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
