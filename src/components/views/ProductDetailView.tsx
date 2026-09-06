import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Product, ProductVariant } from '../../types/grocery';
import { 
  Heart, 
  Share2, 
  Star, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus, 
  Check, 
  Leaf, 
  ChevronRight,
  Sparkles,
  Package,
  ShoppingBag
} from 'lucide-react';

interface ProductDetailViewProps {
  productId?: string;
  onBackToHome: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId, onBackToHome }) => {
  const { 
    products, 
    addToCart, 
    updateQuantity, 
    getItemQuantity, 
    toggleWishlist, 
    isInWishlist 
  } = useCart();

  // Selected product or first product
  const product = products.find(p => p.id === productId) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const activeWeight = selectedVariant ? selectedVariant.weight : product.weight;
  const qty = getItemQuantity(product.id, selectedVariant?.id);
  const isWishlisted = isInWishlist(product.id);
  const discount = Math.round(((activeMrp - activePrice) / activeMrp) * 100);

  const images = product.images && product.images.length > 0 ? product.images : [product.primaryImage];

  // Frequently bought together companion item
  const companionProduct = products.find(p => p.id !== product.id && p.categorySlug === product.categorySlug) || products[1];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Breadcrumb (Stitch basketfresh_product_detail header) */}
      <nav aria-label="Product Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
        <button onClick={onBackToHome} className="hover:text-neutral-700 cursor-pointer">Home</button>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-neutral-700 cursor-pointer">{product.categoryName}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-neutral-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Two-Column Detail Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center aspect-square">
            <img
              src={images[activeImageIndex] || product.primaryImage}
              alt={product.name}
              className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-300"
            />
            
            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-xs">
                {discount}% OFF
              </span>
            )}

            {/* Top Right Action Icons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-neutral-50 shrink-0 cursor-pointer ${
                    activeImageIndex === idx ? 'border-emerald-600 shadow-xs' : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* 10-Minute Darkstore Guarantee Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-xs">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>10-Minute Superfast Delivery Assured</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Dispatched from your nearest automated Micro Darkstore in sterile cold-chain storage. Delivered directly to your door.
            </p>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="space-y-6">
          
          {/* Brand, Title & Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-black text-xs bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{product.rating || 4.8}</span>
                <span className="text-neutral-400 font-normal">({product.ratingCount || 428})</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs text-neutral-500">
              {activeWeight} • Category: <strong className="text-neutral-700">{product.categoryName}</strong>
            </p>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-neutral-900">₹{activePrice}</span>
            {activeMrp > activePrice && (
              <>
                <span className="text-sm font-semibold text-neutral-400 line-through">₹{activeMrp}</span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Save ₹{activeMrp - activePrice} ({discount}% OFF)
                </span>
              </>
            )}
          </div>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-400">
                Select Pack Size / Weight:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedVariant?.id === v.id
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span>{v.weight}</span>
                    <span className="ml-1.5 opacity-80">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Stepper */}
          <div className="pt-2 flex items-center gap-4">
            {qty === 0 ? (
              <button
                onClick={() => addToCart(product, selectedVariant)}
                className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket • ₹{activePrice}</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200">
                <button
                  onClick={() => updateQuantity(product.id, qty - 1, selectedVariant?.id)}
                  className="w-10 h-10 rounded-xl bg-white text-emerald-800 font-black shadow-2xs hover:bg-neutral-50 flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-base px-3 text-neutral-900">{qty}</span>
                <button
                  onClick={() => updateQuantity(product.id, qty + 1, selectedVariant?.id)}
                  className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-black shadow-2xs hover:bg-emerald-800 flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Description & Key Highlights */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">
              Product Overview
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {product.description || 'Farm-fresh harvest, graded and washed to meet premium quality standards. Packaged carefully to preserve freshness during express 10-minute transport.'}
            </p>

            {/* Highlights bullet tags */}
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-bold">100% Quality Checked</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-100">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-bold">Zero Adulteration</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Frequently Bought Together Bundle */}
      {companionProduct && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-neutral-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Frequently Bought Together</span>
              </h3>
              <p className="text-xs text-neutral-500">Customers who bought {product.name} also added</p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={product.primaryImage} alt="" className="w-14 h-14 rounded-xl object-contain bg-white p-1 border border-neutral-200" />
                <span className="font-black text-neutral-400">+</span>
                <img src={companionProduct.primaryImage} alt="" className="w-14 h-14 rounded-xl object-contain bg-white p-1 border border-neutral-200" />
              </div>
              <div className="space-y-0.5 text-xs">
                <p className="font-bold text-neutral-900">{product.name} + {companionProduct.name}</p>
                <p className="text-neutral-500">Bundle Price: <strong className="text-emerald-700">₹{activePrice + companionProduct.price}</strong></p>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(product, selectedVariant);
                addToCart(companionProduct);
                alert('Both items added to your basket!');
              }}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Add Both to Basket
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
