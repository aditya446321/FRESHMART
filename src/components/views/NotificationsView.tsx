import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Bell, 
  CheckCheck, 
  Tag, 
  Truck, 
  ShieldAlert, 
  Clock, 
  ArrowRight
} from 'lucide-react';

interface NotificationsViewProps {
  onGoToTab: (tab: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onGoToTab }) => {
  const { notifications, markAllNotificationsAsRead } = useCart();
  const [filterType, setFilterType] = useState<'all' | 'order' | 'offer' | 'system'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header (Stitch basketfresh_notifications) */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 font-display flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-700" />
            <span>Activity & Notifications</span>
          </h1>
          <p className="text-xs text-neutral-500">Live order status, discount drops & delivery alerts</p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer px-3 py-1.5 bg-emerald-50 rounded-xl"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as const, label: 'All Alerts' },
          { id: 'order' as const, label: '📦 Orders' },
          { id: 'offer' as const, label: '🏷️ Deals & Offers' },
          { id: 'system' as const, label: '⚡ Delivery Updates' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterType === tab.id
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-neutral-200/80 space-y-2">
            <Bell className="w-10 h-10 text-neutral-300 mx-auto" />
            <h4 className="text-sm font-black text-neutral-800">No notifications right now</h4>
            <p className="text-xs text-neutral-500">You're completely caught up with your grocery orders and offers.</p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                !n.read
                  ? 'bg-white border-emerald-200 shadow-2xs'
                  : 'bg-neutral-50/70 border-neutral-200/60 opacity-80'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  n.type === 'order' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : n.type === 'offer'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {n.type === 'order' ? <Truck className="w-4 h-4" /> : n.type === 'offer' ? <Tag className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-neutral-900">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-medium pt-0.5">
                    <Clock className="w-3 h-3" /> {n.timestamp}
                  </span>
                </div>
              </div>

              {n.linkTab && (
                <button
                  onClick={() => onGoToTab(n.linkTab || 'orders')}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-bold rounded-lg shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
