import React, { useState } from 'react';
import { Product, ProductVariant } from '../types/grocery';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Plus, 
  Minus, 
  Heart, 
  Star, 
  Zap, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

interface ProductDetailContentProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({ product, onClose }) => {
  const { 
    addToCart, 
    updateQuantity, 
    getItemQuantity, 
    toggleWishlist, 
    isInWishlist 
  } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const activeWeight = selectedVariant ? selectedVariant.weight : product.weight;
  const currentQty = getItemQuantity(product.id, selectedVariant?.id);
  const isWishlisted = isInWishlist(product.id);
  const discount = Math.round(((activeMrp - activePrice) / activeMrp) * 100);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-neutral-100 relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {product.categoryName}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs font-semibold text-emerald-700">
              {product.subcategory}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
              title="Copy Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-rose-600 transition-colors"
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {copySuccess && (
            <div className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Link copied to clipboard!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Images */}
            <div className="space-y-3">
              <div className="aspect-square bg-white rounded-2xl p-6 flex items-center justify-center border border-neutral-200/80 shadow-xs relative">
                <img
                  src={product.images[activeImageIndex] || product.primaryImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
                  }}
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-2xs">
                    {discount}% OFF
                  </span>
                )}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-lg text-xs font-bold text-neutral-800 shadow-xs border border-neutral-200">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Delivered in 10 Mins</span>
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl border p-1 bg-white overflow-hidden cursor-pointer transition-all ${
                        activeImageIndex === idx ? 'border-emerald-600 ring-2 ring-emerald-200 shadow-xs' : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain" 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info & Actions */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-black uppercase text-emerald-700 tracking-wider">
                  {product.brand}
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1 leading-snug">
                  {product.name}
                </h2>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md font-extrabold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    {product.reviewCount} Ratings & Reviews
                  </span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
                    ₹{activePrice}
                  </span>
                  {activeMrp > activePrice && (
                    <span className="text-sm text-neutral-400 line-through font-mono font-medium">
                      MRP ₹{activeMrp}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                      Save ₹{activeMrp - activePrice} ({discount}% OFF)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 mt-1.5">
                  Inclusive of all taxes. Free express delivery on carts above ₹199.
                </p>
              </div>

              {/* Variants Picker if available */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                    Choose Pack Size:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variants.map((v) => {
                      const isVSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isVSelected
                              ? 'border-emerald-700 bg-emerald-50/50 text-emerald-900 ring-2 ring-emerald-600/20'
                              : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                          }`}
                        >
                          <div className="text-xs font-bold">{v.weight}</div>
                          <div className="text-xs font-extrabold text-neutral-900">₹{v.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add to cart / Stepper */}
              <div className="pt-2 flex items-center gap-3">
                {currentQty > 0 ? (
                  <div className="flex items-center bg-emerald-700 text-white rounded-xl shadow-sm overflow-hidden h-11 w-40">
                    <button
                      onClick={() => updateQuantity(product.id, currentQty - 1, selectedVariant?.id)}
                      className="w-12 h-full flex items-center justify-center hover:bg-emerald-800 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 font-black text-center text-sm">
                      {currentQty} in Cart
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, currentQty + 1, selectedVariant?.id)}
                      className="w-12 h-full flex items-center justify-center hover:bg-emerald-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product, selectedVariant)}
                    className="flex-1 h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart ({activeWeight})</span>
                  </button>
                )}
              </div>

              {/* Key Features & Highlights */}
              <div className="space-y-2 pt-3 border-t border-neutral-100">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Product Highlights
                </h4>
                <ul className="space-y-1.5">
                  {product.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freshness & Quality Promise */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-semibold text-neutral-700">100% Replacement Guarantee</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-semibold text-neutral-700">Express 10-min delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <h4 className="text-sm font-bold text-neutral-900">About this Product</h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Customer Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <h4 className="text-sm font-bold text-neutral-900">Verified Customer Reviews</h4>
              <div className="space-y-2.5">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-neutral-900">{rev.userName}</span>
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{rev.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <ProductDetailContent
      key={product.id}
      product={product}
      onClose={onClose}
    />
  );
};
