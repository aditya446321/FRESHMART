import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/grocery';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  Flame, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickView: (product: Product) => void;
}

const TRENDING_SEARCHES = [
  'Milk & Curd',
  'Farm Tomatoes',
  'Aashirvaad Atta',
  'Amul Butter',
  'Basmati Rice',
  'Lays Classic',
  'Coca Cola',
  'Organic Eggs',
  'Surf Excel Matic',
  'Dettol Handwash'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onOpenQuickView }) => {
  const { products, isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Amul Taaza Milk',
    'Brown Bread',
    'Bananas'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen && !isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags?.some(t => t.toLowerCase().includes(q))
        );
      });

  const handleSelectSearchTerm = (term: string) => {
    setQuery(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-neutral-100 my-4 sm:my-8 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center gap-3 bg-white sticky top-0 z-10">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for atta, dal, milk, chips, shampoo..."
              className="w-full h-12 pl-12 pr-10 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-emerald-600 focus:bg-white text-sm sm:text-base font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setIsSearchOpen(false);
              onClose();
            }}
            className="p-3 rounded-2xl text-neutral-500 hover:bg-neutral-100 transition-colors font-bold text-xs sm:text-sm"
          >
            Esc
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {query.trim() === '' ? (
            <div className="space-y-6">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-extrabold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button 
                      onClick={() => setRecentSearches([])}
                      className="hover:text-rose-500 lowercase font-medium"
                    >
                      clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearchTerm(term)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-800 border border-neutral-200/80 transition-colors flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending searches */}
              <div className="space-y-2.5">
                <span className="text-xs text-neutral-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" /> Trending in your neighborhood
                </span>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectSearchTerm(term)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-neutral-700 hover:text-emerald-800 border border-neutral-200 transition-colors flex items-center gap-1.5"
                    >
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories preview */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Need inspiration?
                </span>
                <p className="text-xs text-emerald-800">
                  Search across 19 categories including organic vegetables, cold-pressed oils, gourmet cheeses, and kitchen essentials.
                </p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-black text-neutral-900">
                No matching groceries found for "{query}"
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Check for spelling errors or try searching for more generic terms like "milk", "vegetables", or "atta".
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500">
                  Showing {filteredProducts.length} items for <strong className="text-neutral-900">"{query}"</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenQuickView={onOpenQuickView}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
