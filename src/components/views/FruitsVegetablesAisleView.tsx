import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/grocery';
import { 
  Apple, 
  Carrot, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ShieldCheck, 
  Zap, 
  Leaf,
  ChevronRight
} from 'lucide-react';

interface FruitsVegetablesAisleViewProps {
  onOpenQuickView: (prod: Product) => void;
}

export const FruitsVegetablesAisleView: React.FC<FruitsVegetablesAisleViewProps> = ({ onOpenQuickView }) => {
  const { products } = useCart();

  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<'all' | 'organic' | 'under-99' | 'bestseller'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'discount'>('relevance');

  const subcategories = [
    { id: 'all', name: 'All Produce', count: 42, icon: <Apple className="w-4 h-4 text-emerald-600" /> },
    { id: 'fresh-vegetables', name: 'Fresh Vegetables', count: 18, icon: <Carrot className="w-4 h-4 text-orange-500" /> },
    { id: 'fresh-fruits', name: 'Fresh Fruits', count: 14, icon: <Apple className="w-4 h-4 text-rose-500" /> },
    { id: 'exotic-organic', name: 'Hydroponic & Organic', count: 6, icon: <Leaf className="w-4 h-4 text-emerald-500" /> },
    { id: 'seasonal-specials', name: 'Seasonal Mangoes & Berries', count: 4, icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
  ];

  const aisleProducts = useMemo(() => {
    let list = products.filter(p => p.categorySlug === 'fruits-vegetables');

    if (activeSubcategory !== 'all') {
      list = list.filter(p => 
        p.subcategory.toLowerCase().includes(activeSubcategory.replace('-', ' ')) ||
        (activeSubcategory === 'exotic-organic' && (p.isOrganic || p.subcategory.toLowerCase().includes('organic')))
      );
    }

    if (filterTag === 'organic') {
      list = list.filter(p => p.isOrganic);
    } else if (filterTag === 'under-99') {
      list = list.filter(p => p.price <= 99);
    } else if (filterTag === 'bestseller') {
      list = list.filter(p => p.isPopular || p.rating >= 4.5);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => {
        const discA = Math.round(((a.mrp - a.price) / a.mrp) * 100);
        const discB = Math.round(((b.mrp - b.price) / b.mrp) * 100);
        return discB - discA;
      });
    }

    return list;
  }, [products, activeSubcategory, filterTag, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner specific to Fruits & Veggies (Stitch basketfresh_fruits_vegetables) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Farm Harvested within 12 Hours</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
            Farm Fresh Fruits & Crisp Vegetables
          </h1>
          <p className="text-sm text-emerald-100 max-w-lg leading-relaxed">
            Directly sourced from verified regional farmers. Cold-chain transported and sorted under sterile, temperature-controlled micro hubs.
          </p>
          <div className="flex items-center gap-4 pt-2 text-xs font-bold text-emerald-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> 100% Quality Replacement
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-300" /> 10-Minute Express Delivery
            </span>
          </div>
        </div>

        {/* Decorative graphic background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none flex items-center justify-center">
          <Apple className="w-64 h-64 text-white -rotate-12" />
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Left Subcategory Rail */}
        <aside aria-label="Fruits and Vegetables Aisles" className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-3 sticky top-24">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">Aisles</h3>
            <span className="text-xs font-bold text-neutral-500">{subcategories.length} sections</span>
          </div>

          <nav className="space-y-1">
            {subcategories.map((sub) => {
              const isSelected = activeSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200/70 shadow-2xs'
                      : 'text-neutral-700 hover:bg-neutral-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {sub.icon}
                    <span>{sub.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-neutral-400'}`} />
                </button>
              );
            })}
          </nav>

          {/* Freshness Badge Box */}
          <div className="pt-4 border-t border-neutral-100 bg-emerald-50/50 rounded-xl p-3 text-[11px] text-emerald-900 space-y-1">
            <div className="font-extrabold flex items-center gap-1 text-emerald-800">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pesticide Residual Tested</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Every batch undergoes ozone-bath washing & digital grading before dispatch.
            </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="md:col-span-3 space-y-4">
          
          {/* Filter & Sort Bar */}
          <div className="bg-white rounded-2xl p-3 border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-extrabold uppercase text-neutral-400 tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <SlidersHorizontal className="w-3 h-3 text-neutral-500" /> Filter:
              </span>

              {[
                { id: 'all' as const, label: 'All Items' },
                { id: 'organic' as const, label: '🌿 Organic Only' },
                { id: 'under-99' as const, label: '⚡ Under ₹99' },
                { id: 'bestseller' as const, label: '🔥 Best Sellers' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterTag(pill.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    filterTag === pill.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200/60'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
              <span className="text-xs font-bold text-neutral-500">
                <strong className="text-neutral-900">{aisleProducts.length}</strong> items in aisle
              </span>

              <div className="flex items-center gap-1.5 bg-neutral-100 rounded-xl px-2.5 py-1 border border-neutral-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold bg-transparent text-neutral-800 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

          </div>

          {/* Products Grid */}
          {aisleProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 shadow-2xs space-y-3">
              <Apple className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="text-base font-black text-neutral-900">No produce matches your filter</h3>
              <p className="text-xs text-neutral-500">Try changing the aisle or resetting your filter criteria.</p>
              <button
                onClick={() => {
                  setActiveSubcategory('all');
                  setFilterTag('all');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Reset Produce Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {aisleProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpenQuickView={onOpenQuickView}
                />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
