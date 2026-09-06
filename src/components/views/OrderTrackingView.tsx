import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Order } from '../../types/grocery';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  PackageCheck, 
  Bike, 
  Home, 
  AlertCircle
} from 'lucide-react';

interface OrderTrackingViewProps {
  orderId?: string;
  onContinueShopping: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ orderId, onContinueShopping }) => {
  const { orders = [] } = useCart();
  
  // Find order or take the most recent
  const activeOrder = orders.find(o => o.id === orderId) || orders[0];

  const [etaMinutes, setEtaMinutes] = useState(8);
  const [etaSeconds, setEtaSeconds] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaSeconds((prev) => {
        if (prev > 0) return prev - 1;
        if (etaMinutes > 0) {
          setEtaMinutes(m => m - 1);
          return 59;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [etaMinutes]);

  if (!activeOrder) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 max-w-lg mx-auto space-y-4">
        <Navigation className="w-12 h-12 text-neutral-300 mx-auto" />
        <h3 className="text-base font-black text-neutral-900">No active delivery to track</h3>
        <p className="text-xs text-neutral-500">Place an order to see live darkstore picking, dispatch and rider location.</p>
        <button
          onClick={onContinueShopping}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const steps = [
    { label: 'Order Confirmed', time: 'Just now', done: true, icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
    { label: 'Packed at Micro Darkstore', time: '2 mins ago', done: true, icon: <PackageCheck className="w-4 h-4 text-emerald-600" /> },
    { label: 'Out for Delivery (Rider Dispatched)', time: 'In transit', done: true, active: true, icon: <Bike className="w-4 h-4 text-amber-500" /> },
    { label: 'Arriving at Doorstep', time: `${etaMinutes}m ${etaSeconds}s`, done: false, icon: <Home className="w-4 h-4 text-neutral-400" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header Card (Stitch basketfresh_order_tracking) */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-neutral-100 pb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              ⚡ 10-Minute Express Delivery
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1">
              Arriving in {etaMinutes} mins {etaSeconds < 10 ? `0${etaSeconds}` : etaSeconds} secs
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Order ID: <strong className="text-neutral-800 font-mono">{activeOrder.id}</strong>
            </p>
          </div>

          {/* Delivery OTP Box */}
          <div className="bg-neutral-900 text-white p-3 rounded-2xl text-center shrink-0">
            <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider block">Delivery OTP</span>
            <span className="text-lg font-black font-mono tracking-widest text-emerald-400">4829</span>
          </div>
        </div>

        {/* 4-Step Progress Line */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className={`p-3 rounded-2xl border transition-all ${
                step.active
                  ? 'bg-amber-50/70 border-amber-200'
                  : step.done
                  ? 'bg-emerald-50/50 border-emerald-100'
                  : 'bg-neutral-50 border-neutral-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {step.icon}
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Step {idx + 1}
                </span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 leading-snug">{step.label}</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">{step.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Map Representation */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-black text-neutral-900">Live Rider GPS Telemetry</h3>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Speed: 28 km/h • 1.2 km away
          </span>
        </div>

        {/* Map Canvas Frame */}
        <div className="relative w-full h-64 bg-slate-100 rounded-2xl border border-neutral-200 overflow-hidden flex items-center justify-center">
          {/* Map Grid decorative background */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
          
          {/* Simulated Road Paths */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 60,180 Q 220,120 400,140 T 700,90"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 60,180 Q 220,120 400,140 T 700,90"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8,8"
              className="animate-pulse"
            />
          </svg>

          {/* Darkstore Pin */}
          <div className="absolute left-16 bottom-16 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md">
              <PackageCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-md shadow-xs border mt-1">
              Micro Darkstore #4
            </span>
          </div>

          {/* Animated Rider Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Bike className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black bg-neutral-900 text-emerald-300 px-2.5 py-0.5 rounded-md shadow-xs mt-1">
              Ramesh (Rider)
            </span>
          </div>

          {/* Customer Delivery Pin */}
          <div className="absolute right-16 top-16 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-md shadow-xs border mt-1">
              Delivery Address
            </span>
          </div>
        </div>

        {/* Rider Profile Card */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-200 text-emerald-900 font-black text-base flex items-center justify-center shrink-0 border-2 border-emerald-400">
              RK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-black text-neutral-900">Ramesh Kumar</h4>
                <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                  4.9 ⭐ (1,240 drops)
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Temperature verified & Vaccinated
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:9876543210"
              className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call Rider</span>
            </a>
            <button
              onClick={() => alert('Opening live chat with delivery partner Ramesh...')}
              className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>
          </div>
        </div>

      </div>

      {/* Order Items & Bill Recap */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-black text-neutral-900">Items in this Package ({activeOrder.items?.length || 0})</h3>
        <div className="divide-y divide-neutral-100">
          {activeOrder.items?.map((item, idx) => (
            <div key={item.id || item.productId || `track-item-${idx}`} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src={item.product?.primaryImage || item.image}
                  alt={item.product?.name || item.name}
                  className="w-10 h-10 rounded-lg object-cover bg-neutral-50 border border-neutral-100"
                />
                <div>
                  <h5 className="font-bold text-neutral-900">{item.product?.name || item.name}</h5>
                  <span className="text-neutral-500 text-[11px]">Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="font-bold text-neutral-900">₹{(item.price || 0) * (item.quantity || 1)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-bold text-neutral-700">
          <span>Total Paid ({activeOrder.paymentMethod?.toUpperCase() || 'PAID'})</span>
          <span className="text-sm font-black text-neutral-900">₹{activeOrder.totalAmount ?? activeOrder.finalTotal ?? 0}</span>
        </div>
      </div>

    </div>
  );
};
