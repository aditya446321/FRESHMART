import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  PackageCheck, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Truck, 
  ShoppingBag, 
  ChevronRight,
  Receipt,
  MapPin
} from 'lucide-react';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const { orders, addToCart, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      addToCart(item.product, item.product.variants?.find(v => v.id === item.variantId));
    });
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-neutral-100 relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-neutral-900">My Orders & Invoices</h2>
              <p className="text-[11px] text-neutral-500">Track current deliveries & repeat past favorites</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-black text-neutral-900">No past orders yet</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Once you place an order, live tracking and past receipts will appear right here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div 
                key={order.id}
                className="bg-neutral-50/70 rounded-2xl border border-neutral-200/80 p-4 sm:p-5 space-y-3.5 hover:border-emerald-500/40 transition-colors shadow-2xs"
              >
                {/* Order Top Bar (Stable Alignment) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-neutral-200/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-neutral-900 font-mono">
                        {order.orderNumber}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {order.status === 'confirmed' ? 'Arriving in 15 mins' : 'Delivered'}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 block mt-0.5">
                      Placed on {new Date(order.date).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-200/40 flex sm:block items-center justify-between">
                    <span className="text-base font-black text-neutral-900 block font-mono">
                      ₹{order.totalAmount}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase bg-neutral-200/60 px-1.5 py-0.5 rounded">
                      {order.paymentMethod === 'external_gateway' ? 'Payment URL' : order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Items preview (Anti-Floating Layout) */}
                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <img 
                          src={it.image} 
                          alt="" 
                          className="w-8 h-8 object-contain bg-white rounded-lg border border-neutral-200 p-0.5 shrink-0" 
                        />
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-neutral-800 truncate block">{it.name}</span>
                          <span className="text-[10px] text-neutral-400 font-medium block">({it.weight})</span>
                        </div>
                      </div>
                      <div className="font-semibold text-neutral-700 shrink-0 font-mono text-xs">
                        {it.quantity} × ₹{it.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom address & reorder action */}
                <div className="pt-2.5 border-t border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-start gap-1.5 min-w-0 flex-1 text-[11px] text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-semibold text-neutral-500">Delivered to: </span>
                      <span className="font-bold text-neutral-800 break-words">
                        {order.deliveryAddress.flatNo}, {order.deliveryAddress.street}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleReorder(order)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-600 px-3.5 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder All Items</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
