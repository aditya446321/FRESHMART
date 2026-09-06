import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/grocery';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../ProductCard';
import { 
  Search, 
  ArrowUpDown, 
  SlidersHorizontal, 
  ChevronRight,
  Sparkles,
  PackageOpen
} from 'lucide-react';

interface DedicatedCategoriesViewProps {
  onOpenQuickView: (product: Product) => void;
  initialCategory?: string;
  onNavigateHome?: () => void;
}

export const DedicatedCategoriesView: React.FC<DedicatedCategoriesViewProps> = ({
  onOpenQuickView,
  initialCategory,
  onNavigateHome,
}) => {
  const { products } = useCart();

  // Selected primary category
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    initialCategory || 'dairy-eggs'
  );

  // Selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [inCategorySearch, setInCategorySearch] = useState('');

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === selectedCategorySlug) || CATEGORIES[0];
  }, [selectedCategorySlug]);

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = p.categorySlug === selectedCategorySlug || p.category === selectedCategorySlug;
      if (!matchCat) return false;
      if (selectedSubcategory) {
        return p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
      }
      return true;
    });

    if (inCategorySearch.trim()) {
      const q = inCategorySearch.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategorySlug, selectedSubcategory, inCategorySearch, sortBy]);

  return (
    <div className="bg-neutral-50 min-h-screen pb-24 sm:pb-16">
      {/* Category Header Bar */}
      <div className="bg-white border-b border-neutral-200/90 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
              All Grocery Categories
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-500 font-semibold">
              Instant 10-min delivery across all aisles
            </p>
          </div>

          <div className="relative w-44 sm:w-64">
            <input
              type="text"
              value={inCategorySearch}
              onChange={(e) => setInCategorySearch(e.target.value)}
              placeholder={`Search in ${currentCategory?.name || 'Aisle'}...`}
              className="w-full h-8 sm:h-9 pl-7 pr-3 rounded-lg bg-neutral-100 border border-neutral-200 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Subcategories Horizontal Rail */}
        {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-neutral-100">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubcategory === null
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All {currentCategory.name}
            </button>

            {currentCategory.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.name)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubcategory === sub.name
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Categories Layout (Left Sidebar + Right Product Grid) */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-3 sm:py-6 flex gap-2.5 sm:gap-6">
        
        {/* Left Category Navigation Sidebar */}
        <aside className="w-20 sm:w-52 md:w-60 shrink-0 space-y-1.5 sm:space-y-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategorySlug(cat.slug);
                  setSelectedSubcategory(null);
                }}
                className={`w-full text-left p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 group ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-200/80 hover:bg-neutral-50 hover:border-emerald-300'
                }`}
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-0.5 ${
                  isSelected ? 'bg-emerald-900 ring-2 ring-white/40' : 'bg-neutral-100'
                }`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1 hidden sm:block">
                  <span className="text-xs font-black leading-tight block truncate">
                    {cat.name}
                  </span>
                  <span className={`text-[10px] font-semibold block ${isSelected ? 'text-emerald-200' : 'text-neutral-400'}`}>
                    {cat.itemCount || 12} items
                  </span>
                </div>
                <span className="text-[9px] sm:hidden text-center font-bold leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Right Product Grid */}
        <main className="flex-1 min-w-0">
          
          {/* Sorting and Count Header */}
          <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-neutral-200/80 mb-3 sm:mb-4 flex items-center justify-between gap-3 shadow-2xs">
            <span className="text-xs font-bold text-neutral-600">
              Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> items in{' '}
              <strong className="text-emerald-700">{selectedSubcategory || currentCategory?.name}</strong>
            </span>

            <div className="flex items-center gap-1.5 bg-neutral-100 px-2 py-1 rounded-lg border border-neutral-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold bg-transparent text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="relevance">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <PackageOpen className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-neutral-900">No items found in this section</h3>
              <p className="text-xs text-neutral-500">Try choosing a different subcategory or search term.</p>
              <button
                onClick={() => {
                  setSelectedSubcategory(null);
                  setInCategorySearch('');
                }}
                className="bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                View All in {currentCategory?.name}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onOpenQuickView={onOpenQuickView}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
