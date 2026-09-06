import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { DailySubscription, Product } from '../../types/grocery';
import { 
  Calendar, 
  Clock, 
  Check, 
  Pause, 
  Play, 
  Plus, 
  Sparkles, 
  ShieldCheck,
  Milk,
  Egg,
  Coffee,
  Sun
} from 'lucide-react';

export const DailySubscriptionsView: React.FC = () => {
  const { products, subscriptions, addSubscription, toggleSubscriptionPause } = useCart();

  const [selectedFreq, setSelectedFreq] = useState<'daily' | 'alternate' | 'weekdays'>('daily');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Subscribable items (milk, eggs, bread, yogurt)
  const subscribableItems = products.filter(p => 
    p.categorySlug === 'dairy-eggs' || 
    p.name.toLowerCase().includes('milk') ||
    p.name.toLowerCase().includes('egg') ||
    p.name.toLowerCase().includes('bread') ||
    p.name.toLowerCase().includes('curd')
  ).slice(0, 8);

  const handleCreateSubscription = (product: Product) => {
    const newSub: DailySubscription = {
      id: `sub-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.primaryImage,
      productPrice: product.price,
      weight: product.weight,
      quantity: 1,
      frequency: selectedFreq,
      slot: '6:30 AM - 7:30 AM',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      nextDeliveryDate: 'Tomorrow at 7:00 AM'
    };

    addSubscription(newSub);
    setSuccessMsg(`Subscribed to ${product.name} successfully!`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Top Banner (Stitch basketfresh_daily_subscriptions) */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-sm relative overflow-hidden">
        <div className="max-w-xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-white">
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>Daily Morning Doorstep Delivery</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Never Run Out of Fresh Morning Essentials
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            Subscribe to fresh cow milk, country eggs, whole wheat bread and curd. Guaranteed arrival by 7:00 AM before you wake up. Pause anytime with 1 tap.
          </p>
          <div className="flex items-center gap-4 pt-2 text-xs font-bold text-blue-200">
            <span>• No delivery fee on subscriptions</span>
            <span>• Pause / Resume anytime</span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Active Subscriptions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Your Active Subscriptions</span>
            </h2>
            <p className="text-xs text-neutral-500">Scheduled drops arriving at your doorstep</p>
          </div>
          <span className="text-xs font-bold text-neutral-500">{subscriptions.length} active</span>
        </div>

        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-neutral-200/80 text-center space-y-2">
            <Milk className="w-10 h-10 text-neutral-300 mx-auto" />
            <h4 className="text-sm font-black text-neutral-800">No active subscriptions yet</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Choose from daily fresh milk, brown eggs, or bread below to start your hassle-free morning routine.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs flex items-start gap-3.5"
              >
                <img
                  src={sub.productImage}
                  alt={sub.productName}
                  className="w-16 h-16 rounded-xl object-cover bg-neutral-50 shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-neutral-900">{sub.productName}</h4>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      sub.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-neutral-700">
                    ₹{sub.productPrice} • {sub.weight} ({sub.quantity} pack)
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Next delivery: <strong className="text-neutral-800">{sub.nextDeliveryDate}</strong>
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => toggleSubscriptionPause(sub.id)}
                      className="text-xs font-bold px-3 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 flex items-center gap-1 text-neutral-700 cursor-pointer"
                    >
                      {sub.status === 'active' ? (
                        <>
                          <Pause className="w-3 h-3 text-amber-600" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-emerald-600" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Subscribable Items Catalogue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Popular Morning Staples to Subscribe</span>
            </h2>
            <p className="text-xs text-neutral-500">Choose frequency and set up in 1 click</p>
          </div>

          {/* Frequency selector tabs */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
            {(['daily', 'alternate', 'weekdays'] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFreq(freq)}
                className={`text-xs px-3 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                  selectedFreq === freq ? 'bg-white text-blue-800 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {freq === 'alternate' ? 'Alternate Days' : freq === 'weekdays' ? 'Mon-Fri' : 'Every Day'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subscribableItems.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <img
                  src={prod.primaryImage}
                  alt={prod.name}
                  className="w-full h-36 rounded-xl object-cover bg-neutral-50"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    {prod.brand}
                  </span>
                  <h4 className="text-xs font-black text-neutral-900 line-clamp-1">{prod.name}</h4>
                  <p className="text-xs font-bold text-neutral-500">{prod.weight}</p>
                  <p className="text-sm font-black text-neutral-900">₹{prod.price}</p>
                </div>
              </div>

              <button
                onClick={() => handleCreateSubscription(prod)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Subscribe ({selectedFreq})</span>
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
