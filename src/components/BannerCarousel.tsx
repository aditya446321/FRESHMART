import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface BannerCarouselProps {
  onSelectCategory: (categorySlug: string) => void;
}

const BANNERS = [
  {
    id: 1,
    badge: '⚡ FLASH SAVINGS',
    title: 'Weekend Grocery Sale',
    subtitle: 'Fresh essentials, organic veggies & farm dairy delivered to your door in 10 minutes.',
    cta: 'Shop Now',
    category: 'fruits-vegetables',
    discount: 'Save up to 40%',
    bgColor: 'from-emerald-950 via-emerald-900/90 to-transparent',
    accentColor: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    badge: '🧊 SUMMER SIPS',
    title: 'Chill Your Way - Cold Coffee Season is Here',
    subtitle: 'Cafe Style Cold Coffee, creamy frappes, iced lattes & gourmet chocolate syrups.',
    cta: 'Shop Now',
    category: 'beverages-juices',
    discount: 'Up to 30% OFF',
    bgColor: 'from-amber-950 via-amber-900/90 to-transparent',
    accentColor: 'bg-amber-400',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    badge: '🥛 MORNING ESSENTIALS',
    title: 'Daily Farm Fresh Milk, Bread & Eggs',
    subtitle: 'Amul Taaza, Harvest Gold Bread, Farm Eggs & Country Butter delivered by 7 AM or in 10 mins.',
    cta: 'Shop Breakfast',
    category: 'dairy-eggs',
    discount: 'Starting @ ₹28',
    bgColor: 'from-emerald-950 via-teal-950/90 to-transparent',
    accentColor: 'bg-emerald-400',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    badge: '🍿 MIDNIGHT CRAVINGS',
    title: 'Snack Attack & Cold Drinks',
    subtitle: 'Bingo Mad Angles, Lay\'s Cream & Onion, Uncle Chipps, Maggi Cuppa Noodles & ice chilled sodas.',
    cta: 'Explore Deals',
    category: 'snacks-munchies',
    discount: 'Buy 2 Get 1 Free',
    bgColor: 'from-neutral-950 via-neutral-900/90 to-transparent',
    accentColor: 'bg-rose-400',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1000&auto=format&fit=crop&q=80'
  }
];

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ onSelectCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = BANNERS[currentIndex];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Hero Slider */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs sm:shadow-sm bg-neutral-950 text-white min-h-[220px] sm:min-h-[280px] md:min-h-[320px] flex items-center border border-neutral-800/80">
        {/* Crisp Banner Image on Right / Subtle Scrim on Left */}
        <div 
          className="absolute inset-0 bg-cover bg-right sm:bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${current.image})` }}
        />
        {/* Directional Gradient Scrim: Solid text protection on left, crystal clear photo on right */}
        <div className={`absolute inset-0 bg-gradient-to-r ${current.bgColor} sm:w-4/5`} />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent sm:hidden" />

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-10 py-5 sm:py-8 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-emerald-200">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-amber-300" />
              <span>{current.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-white font-extrabold">{current.discount}</span>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-display">
              {current.title}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-lg line-clamp-2">
              {current.subtitle}
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => onSelectCategory(current.category)}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>{current.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-300 bg-black/20 px-3 py-2 rounded-xl backdrop-blur-xs">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Zero Delivery Fee above ₹199</span>
              </div>
            </div>
          </div>

          {/* Side Promo Pill Card (Tablet/Desktop) */}
          <div className="hidden lg:block w-72 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-white space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300">Live Express Hub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-neutral-200">
              Your neighborhood dark-store has <strong className="text-white">120+ categories</strong> ready for packing right now.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold bg-white/10 p-2 rounded-xl">
              <Zap className="w-3.5 h-3.5 shrink-0 fill-amber-300" />
              <span>Current Packing ETA: 3 mins</span>
            </div>
          </div>
        </div>

        {/* Carousel arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/30 hover:bg-black/60 text-white items-center justify-center backdrop-blur-xs transition-all z-20 cursor-pointer"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % BANNERS.length)}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/30 hover:bg-black/60 text-white items-center justify-center backdrop-blur-xs transition-all z-20 cursor-pointer"
          aria-label="Next banner"
        >
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-5 sm:w-6 bg-emerald-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Engineering-Grade Service Guarantees Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
        <div className="bg-white border border-neutral-200/90 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 shadow-2xs hover:border-emerald-500/40 transition-colors">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-black">
            <Zap className="w-4 sm:w-5 h-4 sm:h-5 fill-emerald-600 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-black text-neutral-900 leading-tight truncate">10-Min Delivery</h4>
            <p className="text-[10px] sm:text-[11px] text-neutral-500 font-medium truncate">Nearest dark-store</p>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 shadow-2xs hover:border-emerald-500/40 transition-colors">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-black text-neutral-900 leading-tight truncate">100% Quality</h4>
            <p className="text-[10px] sm:text-[11px] text-neutral-500 font-medium truncate">Fresh or replacement</p>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 shadow-2xs hover:border-emerald-500/40 transition-colors">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-black text-neutral-900 leading-tight truncate">Free Delivery</h4>
            <p className="text-[10px] sm:text-[11px] text-neutral-500 font-medium truncate">Orders above ₹199</p>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 shadow-2xs hover:border-emerald-500/40 transition-colors">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <RefreshCw className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-black text-neutral-900 leading-tight truncate">Instant Refund</h4>
            <p className="text-[10px] sm:text-[11px] text-neutral-500 font-medium truncate">Direct to source</p>
          </div>
        </div>
      </div>
    </div>
  );
};
