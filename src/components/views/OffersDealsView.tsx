import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { COUPONS } from '../../data/categories';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/grocery';
import { 
  Tag, 
  Copy, 
  Check, 
  Sparkles, 
  Percent, 
  CreditCard, 
  Flame, 
  Zap, 
  Clock,
  ArrowRight
} from 'lucide-react';

interface OffersDealsViewProps {
  onOpenQuickView: (prod: Product) => void;
}

export const OffersDealsView: React.FC<OffersDealsViewProps> = ({ onOpenQuickView }) => {
  const { products, applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const bankOffers = [
    {
      bank: 'HDFC Bank',
      offer: 'Flat ₹75 Instant Discount on Debit & Credit Cards',
      minOrder: 'Min. order ₹599',
      code: 'HDFCFRESH',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      bank: 'Paytm UPI',
      offer: 'Assured ₹25 to ₹100 Cashback via Paytm UPI',
      minOrder: 'Min. order ₹299',
      code: 'PAYTM100',
      color: 'from-sky-500 to-blue-600'
    },
    {
      bank: 'CRED Pay',
      offer: 'Up to ₹150 Cashback on payment with CRED UPI',
      minOrder: 'Min. order ₹499',
      code: 'CREDGROCERY',
      color: 'from-neutral-900 to-neutral-800'
    },
    {
      bank: 'Airtel Payments Bank',
      offer: 'Flat ₹40 Cashback on first grocery order',
      minOrder: 'Min. order ₹349',
      code: 'AIRTEL40',
      color: 'from-rose-600 to-red-700'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Big discount items (>= 20% discount)
  const dealProducts = products.filter(p => {
    const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);
    return disc >= 20;
  }).slice(0, 10);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Top Banner (Stitch basketfresh_offers_deals) */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-sm relative overflow-hidden">
        <div className="max-w-xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-white">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Super Saver Grocery Bonanza</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Biggest Discounts & Instant Promo Vouchers
          </h1>
          <p className="text-sm text-orange-100 leading-relaxed">
            Apply coupons at checkout for direct savings on daily dairy, fresh vegetables, oils, and snacks.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Available Coupon Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-600" />
              <span>Freshmart Exclusive Promo Codes</span>
            </h2>
            <p className="text-xs text-neutral-500">Tap copy to automatically apply to your active cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COUPONS.map((cp) => (
            <div
              key={cp.code}
              className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-black text-xs rounded-lg border border-emerald-200">
                    {cp.code}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3" />
                    {cp.discountType === 'percentage' ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} OFF`}
                  </span>
                </div>
                <h4 className="text-xs font-black text-neutral-900 line-clamp-1">{cp.description}</h4>
                <p className="text-[11px] text-neutral-500">
                  Min. Cart value: <strong className="text-neutral-700">₹{cp.minOrderValue}</strong>
                </p>
              </div>

              <button
                onClick={() => handleCopy(cp.code)}
                className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  copiedCode === cp.code
                    ? 'bg-emerald-700 text-white'
                    : 'bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-800'
                }`}
              >
                {copiedCode === cp.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied to Cart!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bank & Payment Partner Cashbacks */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            <span>Bank & UPI Partner Cashbacks</span>
          </h2>
          <p className="text-xs text-neutral-500">Extra instant savings on UPI & Card checkouts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bankOffers.map((bo) => (
            <div
              key={bo.code}
              className={`rounded-2xl p-4 bg-gradient-to-br ${bo.color} text-white shadow-2xs space-y-3 flex flex-col justify-between`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
                  {bo.bank}
                </span>
                <h4 className="text-xs font-bold leading-snug">{bo.offer}</h4>
                <p className="text-[10px] text-white/80">{bo.minOrder}</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/20 text-xs">
                <span className="font-mono font-bold tracking-wider">{bo.code}</span>
                <button
                  onClick={() => handleCopy(bo.code)}
                  className="px-2.5 py-1 bg-white text-neutral-900 rounded-lg font-bold text-[11px] hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Discount Deals of the Day */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
              <Percent className="w-5 h-5 text-rose-600" />
              <span>Deals of the Day (20% to 50% OFF)</span>
            </h2>
            <p className="text-xs text-neutral-500">Handpicked top discounts on fresh and daily staples</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {dealProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
