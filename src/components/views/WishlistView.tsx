import React from 'react';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/grocery';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

interface WishlistViewProps {
  onOpenQuickView: (prod: Product) => void;
  onContinueShopping: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({ onOpenQuickView, onContinueShopping }) => {
  const { products, wishlist, addToCart } = useCart();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach(p => {
      addToCart(p);
    });
    alert(`Moved ${wishlistProducts.length} items to your cart!`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header (Stitch basketfresh_wishlist) */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 font-display flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>Saved Wishlist ({wishlistProducts.length})</span>
          </h1>
          <p className="text-xs text-neutral-500">Your favorite groceries bookmarked for quick re-ordering</p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Cart</span>
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 fill-rose-100" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-neutral-900">Your wishlist is empty</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Tap the heart icon on any product card while browsing to save it to your personal wishlist.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Explore Groceries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {wishlistProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      )}

    </div>
  );
};
