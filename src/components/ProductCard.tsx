import React, { useState } from 'react';
import { Product, ProductVariant } from '../types/grocery';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Heart, Eye, Zap, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuickView?: (product: Product) => void;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const { 
    addToCart, 
    updateQuantity, 
    getItemQuantity, 
    toggleWishlist, 
    isInWishlist 
  } = useCart();

  // If variants exist, manage selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const activeWeight = selectedVariant ? selectedVariant.weight : product.weight;
  const activeStock = selectedVariant ? selectedVariant.stock : product.stock;
  const currentQty = getItemQuantity(product.id, selectedVariant?.id);
  const isWishlisted = isInWishlist(product.id);
  const discount = Math.round(((activeMrp - activePrice) / activeMrp) * 100);

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-neutral-200/80 hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden p-2.5 sm:p-3.5">
      
      {/* Top badges bar */}
      <div className="flex items-center justify-between gap-1 z-10">
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 overflow-hidden">
          {/* Authentic Indian Food Safety Veg/NonVeg Indicator */}
          <span 
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border border-emerald-600 bg-white flex items-center justify-center p-[1.5px] sm:p-[2px] shrink-0" 
            title="100% Vegetarian"
          >
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-600" />
          </span>

          {/* 10 MINS Express Tag */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold shrink-0">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 fill-emerald-600" />
            <span className="whitespace-nowrap">10 MINS</span>
          </div>

          {discount > 0 && (
            <span className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded tracking-wider uppercase shrink-0 whitespace-nowrap">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 hover:bg-white text-neutral-400 hover:text-rose-500 flex items-center justify-center shadow-2xs border border-neutral-100 transition-colors cursor-pointer shrink-0 ml-auto"
          title="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Clean Unobstructed Product Image Container - Enlarged for clear visibility */}
      <div 
        onClick={() => onOpenQuickView && onOpenQuickView(product)}
        className="relative my-2 sm:my-2.5 h-36 sm:h-44 md:h-48 w-full rounded-2xl bg-neutral-50/80 border border-neutral-100 overflow-hidden flex items-center justify-center p-1 sm:p-1.5 cursor-pointer group-hover:border-emerald-400 group-hover:bg-white group-hover:shadow-xs transition-all duration-300"
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5 sm:p-1 transition-transform duration-300 ease-out group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
          }}
        />

        {/* Quick View Button overlay on hover (desktop/laptop only) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView && onOpenQuickView(product);
          }}
          className="hidden md:flex absolute inset-x-3 bottom-2 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-950 text-white text-xs font-bold backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between pt-0.5">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px] mb-1">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 bg-amber-50 text-amber-900 px-1 sm:px-1.5 py-0.5 rounded font-bold text-[9px] sm:text-[10px] shrink-0">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title (Locked 2-line height so grid cards never jitter) */}
          <h3 
            onClick={() => onOpenQuickView && onOpenQuickView(product)}
            className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-2 leading-snug cursor-pointer hover:text-emerald-700 transition-colors h-[34px] sm:h-[40px] overflow-hidden"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Weight / Variant selector (Fixed height slot) */}
          <div className="mt-1 sm:mt-1.5 mb-2 sm:mb-2.5 h-[28px] sm:h-[30px] flex items-center">
            {product.variants && product.variants.length > 1 ? (
              <select
                value={selectedVariant?.id}
                onChange={(e) => {
                  const v = product.variants?.find(v => v.id === e.target.value);
                  setSelectedVariant(v);
                }}
                className="w-full text-[10px] sm:text-[11px] bg-neutral-100/90 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold rounded-lg px-1.5 sm:px-2 py-1 focus:outline-none focus:border-emerald-600 truncate cursor-pointer"
              >
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.weight} - ₹{v.price}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 truncate block">
                {activeWeight}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart (Anti-Floating Layout) */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 pt-1.5 sm:pt-2 border-t border-neutral-100">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap overflow-hidden">
              <span className="text-xs sm:text-sm md:text-base font-black text-neutral-900 font-mono">
                ₹{activePrice}
              </span>
              {activeMrp > activePrice && (
                <span className="text-[10px] sm:text-xs text-neutral-400 line-through font-mono font-medium">
                  ₹{activeMrp}
                </span>
              )}
            </div>
            {activeStock <= 5 && activeStock > 0 ? (
              <span className="text-[9px] sm:text-[10px] font-bold text-rose-600 block truncate">
                Only {activeStock} left
              </span>
            ) : (
              <span className="text-[9px] text-emerald-700 font-semibold block truncate">
                In Stock
              </span>
            )}
          </div>

          {/* Stepper or Add button */}
          <div className="shrink-0">
            {activeStock <= 0 ? (
              <span className="h-7 sm:h-8 px-2 rounded-lg bg-neutral-100 text-neutral-400 font-bold text-[10px] sm:text-xs flex items-center justify-center border border-neutral-200">
                Sold Out
              </span>
            ) : currentQty > 0 ? (
              <div className="flex items-center bg-emerald-700 text-white rounded-lg sm:rounded-xl shadow-xs overflow-hidden h-7 sm:h-8 md:h-9">
                <button
                  onClick={() => updateQuantity(product.id, currentQty - 1, selectedVariant?.id)}
                  className="w-6 sm:w-7 md:w-8 h-full flex items-center justify-center hover:bg-emerald-800 active:bg-emerald-900 transition-colors cursor-pointer"
                  title="Decrease"
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <span className="px-1 sm:px-2 font-black text-xs sm:text-sm text-center min-w-[16px] sm:min-w-[20px] font-mono">
                  {currentQty}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, currentQty + 1, selectedVariant?.id)}
                  className="w-6 sm:w-7 md:w-8 h-full flex items-center justify-center hover:bg-emerald-800 active:bg-emerald-900 transition-colors cursor-pointer"
                  title="Increase"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, selectedVariant)}
                className="h-7 sm:h-8 md:h-9 px-2 sm:px-3 md:px-4 rounded-lg sm:rounded-xl border-2 border-emerald-600 bg-emerald-50/50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-black text-xs sm:text-sm tracking-wide transition-all duration-150 flex items-center gap-0.5 sm:gap-1 cursor-pointer active:scale-95 shadow-2xs whitespace-nowrap"
              >
                <span>ADD</span>
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export const ProductCard = React.memo(ProductCardComponent);
