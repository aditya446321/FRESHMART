import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Order } from '../../types/grocery';
import { 
  Package, 
  Clock, 
  RotateCcw, 
  FileText, 
  Navigation, 
  CheckCircle2, 
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

interface MyOrdersPageViewProps {
  onTrackOrder: (orderId: string) => void;
  onContinueShopping: () => void;
}

export const MyOrdersPageView: React.FC<MyOrdersPageViewProps> = ({ onTrackOrder, onContinueShopping }) => {
  const { orders = [], addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'delivered' | 'processing'>('all');

  const filteredOrders = (orders || []).filter((o) => {
    if (activeTab === 'delivered') return o.status === 'delivered';
    if (activeTab === 'processing') return o.status !== 'delivered' && o.status !== 'cancelled';
    return true;
  });

  const handleReorder = (order: Order) => {
    order.items?.forEach(item => {
      if (item.product) {
        addToCart(item.product);
      }
    });
    alert('Items added back to your cart!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header (Stitch basketfresh_my_orders) */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 font-display">
            My Past & Active Orders
          </h1>
          <p className="text-xs text-neutral-500">Track current 10-min drops or reorder daily staples</p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
          {[
            { id: 'all' as const, label: 'All Orders' },
            { id: 'processing' as const, label: 'Active (Express)' },
            { id: 'delivered' as const, label: 'Past Delivered' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === tab.id ? 'bg-white text-emerald-800 shadow-2xs font-extrabold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 space-y-4 shadow-xs">
          <ShoppingBag className="w-14 h-14 text-neutral-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-black text-neutral-900">No orders found in this section</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Your grocery deliveries will show up here with live rider tracking and itemized invoices.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, orderIdx) => {
            const isDelivered = order.status === 'delivered';
            const orderDate = order.date || order.createdAt || new Date().toISOString();
            const totalAmount = order.totalAmount ?? order.finalTotal ?? 0;
            const orderKey = order.id || `order-${orderIdx}`;
            return (
              <div
                key={orderKey}
                className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-2xs space-y-4"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-neutral-100 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-neutral-900">{order.orderNumber || order.id}</span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isDelivered
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Placed on {new Date(orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-neutral-900">₹{totalAmount}</span>
                    <span className="block text-[10px] text-neutral-500 uppercase font-bold">{order.paymentMethod}</span>
                  </div>
                </div>

                {/* Items Thumbnails Row */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                  {order.items?.map((item, idx) => (
                    <div 
                      key={item.id || item.productId || `${orderKey}-item-${idx}`} 
                      className="flex items-center gap-2 shrink-0 bg-neutral-50 p-1.5 rounded-xl border border-neutral-100"
                    >
                      <img
                        src={item.product?.primaryImage || item.image}
                        alt={item.product?.name || item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-white"
                      />
                      <div className="pr-1 text-xs">
                        <p className="font-bold text-neutral-800 max-w-[120px] truncate">{item.product?.name || item.name}</p>
                        <p className="text-[11px] text-neutral-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="text-[11px] text-neutral-500">
                    Delivery to: <strong className="text-neutral-700">{order.deliveryAddress?.street || 'Home'}, {order.deliveryAddress?.city || 'Bengaluru'}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isDelivered && (
                      <button
                        onClick={() => onTrackOrder(order.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Track Live</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>
                    <button
                      onClick={() => alert(`Invoice for Order #${order.orderNumber || order.id}\nAmount: ₹${totalAmount}\nStatus: ${order.status}\nGST: Included`)}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
