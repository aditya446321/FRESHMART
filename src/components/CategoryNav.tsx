import React, { useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import { 
  LayoutGrid, 
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
  selectedSubcategory: string | null;
  onSelectSubcategory: (subcatSlug: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
}) => {
  const activeCategoryObj = CATEGORIES.find(c => c.slug === selectedCategory);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Category Horizontal Scrolling Bar */}
      <div>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-xl font-black text-neutral-900 tracking-tight font-display">
              Shop by Category
            </h2>
            <span className="text-[11px] sm:text-xs text-neutral-400 font-medium hidden sm:inline">
              (19 Aisles Available)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedCategory && (
              <button
                onClick={() => {
                  onSelectCategory(null);
                  onSelectSubcategory(null);
                }}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All</span>
              </button>
            )}

            {/* Desktop / Laptop Scroll Arrows */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => handleScroll('left')}
                className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                title="Scroll Left"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                title="Scroll Right"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Rail (Touch-friendly & Desktop-navigable) */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x"
        >
          {/* "All Aisles" button */}
          <button
            onClick={() => {
              onSelectCategory(null);
              onSelectSubcategory(null);
            }}
            className={`shrink-0 snap-start flex flex-col items-center justify-center p-2 rounded-2xl w-[72px] sm:w-20 md:w-24 border transition-all cursor-pointer ${
              selectedCategory === null
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-emerald-400 hover:bg-emerald-50/30'
            }`}
          >
            <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-1 transition-colors ${
              selectedCategory === null ? 'bg-emerald-800 text-white' : 'bg-neutral-100 text-emerald-700'
            }`}>
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] md:text-xs font-black text-center leading-tight">
              All Aisles
            </span>
          </button>

          {/* Individual Category Cards */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (isSelected) {
                    onSelectCategory(null);
                    onSelectSubcategory(null);
                  } else {
                    onSelectCategory(cat.slug);
                    onSelectSubcategory(null);
                  }
                }}
                className={`shrink-0 snap-start flex flex-col items-center p-2 rounded-2xl w-[72px] sm:w-20 md:w-24 border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs scale-102'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                }`}
              >
                <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl overflow-hidden mb-1 p-0.5 flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isSelected ? 'bg-emerald-800 ring-2 ring-white/50' : 'bg-neutral-50'
                }`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-center leading-tight line-clamp-2 h-7 flex items-center justify-center">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory Pills bar when a category is selected */}
      {activeCategoryObj && activeCategoryObj.subcategories && activeCategoryObj.subcategories.length > 0 && (
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-2.5 sm:p-3 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-neutral-600 shrink-0 mr-1">
            <span>{activeCategoryObj.name}</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </div>

          <button
            onClick={() => onSelectSubcategory(null)}
            className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold transition-colors cursor-pointer shrink-0 ${
              selectedSubcategory === null
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            All ({activeCategoryObj.itemCount})
          </button>

          {activeCategoryObj.subcategories.map((sub) => {
            const isSubSelected = selectedSubcategory === sub.name;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubcategory(isSubSelected ? null : sub.name)}
                className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold transition-colors cursor-pointer shrink-0 ${
                  isSubSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
