import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Order } from '../types/grocery';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  Truck, 
  Package, 
  ArrowRight,
  Phone,
  Zap,
  ExternalLink,
  Globe,
  Receipt
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const {
    items,
    itemTotal,
    finalTotal,
    savings,
    selectedAddress,
    savedAddresses,
    setSelectedAddress,
    deliveryType,
    setDeliveryType,
    selectedSlot,
    setSelectedSlot,
    createOrder,
    totalItemsCount,
    storeSettings
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'wallet' | 'external_gateway'>('upi');
  const [upiOption, setUpiOption] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [customPaymentUrl, setCustomPaymentUrl] = useState<string>(
    storeSettings.customPaymentGatewayUrl || 'https://api.razorpay.com/v1/checkout/embedded'
  );
  const [deliveryNote, setDeliveryNote] = useState<string>('Leave at door if not answered');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [riderContactMessage, setRiderContactMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // If external payment URL is chosen or configured
    if (paymentMethod === 'external_gateway') {
      setTimeout(() => {
        const order = createOrder('upi', `Paid via External Payment URL (${customPaymentUrl}) | ${deliveryNote}`);
        setPlacedOrder(order);
        setIsProcessing(false);
        onOrderSuccess(order);
      }, 1500);
      return;
    }

    setTimeout(() => {
      const order = createOrder(paymentMethod as any, deliveryNote);
      setPlacedOrder(order);
      setIsProcessing(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-neutral-100 relative my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* If order is placed, show live tracking screen */}
        {placedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Order Placed Successfully!
              </span>
              <h2 className="text-2xl font-black text-neutral-900 font-display">
                Arriving in 10 Minutes
              </h2>
              <p className="text-xs text-neutral-500">
                Order ID: <strong className="text-neutral-800">{placedOrder.orderNumber}</strong> • {totalItemsCount} items
              </p>
            </div>

            {/* Live Tracking Visual Stepper */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 text-left space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-neutral-400 tracking-wider">
                  Live Dispatch Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Darkstore Packing
                </span>
              </div>

              {/* Stepper track */}
              <div className="relative pl-6 space-y-5 border-l-2 border-emerald-500">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-white" />
                  <h4 className="text-xs font-bold text-neutral-900">Order Confirmed & Payment Verified</h4>
                  <p className="text-[11px] text-neutral-400">Accepted by Bellandur Micro-Warehouse</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white animate-ping" />
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-white" />
                  <h4 className="text-xs font-bold text-neutral-900">Items Being Packed & Bagged</h4>
                  <p className="text-[11px] text-neutral-500">Picker: Ramesh K. (Temperature checked & sanitized)</p>
                </div>

                <div className="relative opacity-50">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-neutral-300 ring-4 ring-white" />
                  <h4 className="text-xs font-bold text-neutral-900">Out for 10-Minute Delivery</h4>
                  <p className="text-[11px] text-neutral-400">Rider assigned with GPS enabled tracking</p>
                </div>
              </div>

              {/* Rider card */}
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm shrink-0">
                    RK
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-neutral-900 truncate">Ramesh Kumar (Delivery Partner)</h5>
                    <p className="text-[11px] text-neutral-500 truncate">Yamaha Ray • KA 01 EK 8842</p>
                  </div>
                </div>
                <button 
                  onClick={() => setRiderContactMessage('Rider Ramesh is 1.2 km away. ETA 8 mins.')}
                  className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer shrink-0"
                  title="Call Rider"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>

              {riderContactMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-between gap-2">
                  <span className="min-w-0 break-words">{riderContactMessage}</span>
                  <button onClick={() => setRiderContactMessage(null)} className="text-xs text-neutral-500 hover:text-neutral-900 shrink-0">✕</button>
                </div>
              )}
            </div>

            {/* Delivery & Payment Confirmation Card (Structured, Anti-Floating Layout) */}
            <div className="bg-neutral-50/80 rounded-2xl p-4.5 border border-neutral-200/80 text-left text-xs shadow-2xs">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-3 pb-2 border-b border-neutral-200/60">
                Order Delivery & Payment Summary
              </h4>
              <div className="space-y-3">
                {/* Row 1: Delivering To */}
                <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] items-start gap-1.5 sm:gap-3 pb-3 border-b border-neutral-200/60">
                  <span className="text-neutral-500 font-semibold text-xs flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Delivering To:</span>
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-neutral-900 text-xs sm:text-right break-words leading-relaxed">
                      {placedOrder.deliveryAddress.flatNo}, {placedOrder.deliveryAddress.street}
                      {placedOrder.deliveryAddress.landmark ? `, ${placedOrder.deliveryAddress.landmark}` : ''}
                    </p>
                    <p className="text-[11px] text-neutral-500 sm:text-right mt-0.5">
                      {placedOrder.deliveryAddress.city} - {placedOrder.deliveryAddress.pincode}
                    </p>
                  </div>
                </div>

                {/* Row 2: Payment Mode */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-200/60">
                  <span className="text-neutral-500 font-semibold text-xs flex items-center gap-1.5 shrink-0">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Payment Mode:</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-black text-xs text-neutral-900 uppercase bg-white border border-neutral-200 px-2.5 py-1 rounded-lg shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {placedOrder.paymentMethod === 'external_gateway' ? 'External Payment URL' : placedOrder.paymentMethod}
                  </span>
                </div>

                {/* Row 3: Total Amount Paid */}
                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <span className="text-neutral-500 font-semibold text-xs flex items-center gap-1.5 shrink-0">
                    <Receipt className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Total Amount Paid:</span>
                  </span>
                  <div className="text-right">
                    <span className="font-black text-neutral-900 text-base text-emerald-700">
                      ₹{placedOrder.totalAmount}
                    </span>
                    <span className="block text-[10px] text-emerald-700 font-semibold">
                      Payment Successful • Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-sm transition-colors cursor-pointer"
              >
                Back to FreshMart Home
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Steps */
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-black text-neutral-900">Checkout</h2>
                  <p className="text-[11px] text-neutral-500">100% Safe & Secure Express Checkout</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto p-6 space-y-6 flex-1">
              
              {/* 1. Address Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>1. Delivery Address</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAddresses.map((addr) => {
                    const isSelected = selectedAddress.id === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-neutral-900 capitalize">
                            {addr.type} ({addr.name})
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-600 leading-snug">
                          {addr.flatNo}, {addr.street}, {addr.landmark}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-1">
                          {addr.city} - {addr.pincode} • {addr.phone}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Delivery Slot */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>2. Delivery Speed & Slot</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => {
                      setDeliveryType('instant');
                      setSelectedSlot('Express in 10 mins');
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      deliveryType === 'instant'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-neutral-900 flex items-center gap-1">
                        ⚡ Instant Delivery
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        10 Mins
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      Dispatched immediately from nearest micro dark-store.
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setDeliveryType('scheduled');
                      setSelectedSlot('Evening 6:00 PM - 8:00 PM');
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      deliveryType === 'scheduled'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-neutral-900 flex items-center gap-1">
                        📅 Scheduled Slot
                      </span>
                      <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">
                        Evening
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      Evening slot: 6:00 PM - 8:00 PM today.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Delivery Instructions */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 block">
                  Delivery Instruction Note (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Leave at door if not answered',
                    'Do not ring bell (Baby sleeping)',
                    'Call on arrival',
                    'Leave with security guard'
                  ].map((note) => (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setDeliveryNote(note)}
                      className={`text-[11px] px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        deliveryNote === note
                          ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-900'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                  <span>3. Select Payment Method</span>
                </h3>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">UPI Instant</div>
                      <p className="text-[10px] text-neutral-400">GPay, PhonePe, Paytm</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Cash on Delivery</div>
                      <p className="text-[10px] text-neutral-400">Pay cash or scan QR</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Debit / Credit Card</div>
                      <p className="text-[10px] text-neutral-400">Visa, Mastercard, RuPay</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'wallet'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-purple-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">FreshMart Wallet</div>
                      <p className="text-[10px] text-neutral-400">Balance: ₹500</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('external_gateway')}
                    className={`col-span-2 p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'external_gateway'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <Globe className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-neutral-900 flex items-center justify-between">
                        <span>External Payment Gateway / URL</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">Custom URL Gateway</span>
                      </div>
                      <p className="text-[10px] text-neutral-500">Pay via integrated custom merchant checkout URL</p>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'external_gateway' && (
                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 animate-in fade-in duration-200">
                    <label className="text-[11px] font-bold text-neutral-700 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Custom Payment Gateway Checkout URL:</span>
                    </label>
                    <input 
                      type="url"
                      value={customPaymentUrl}
                      onChange={(e) => setCustomPaymentUrl(e.target.value)}
                      placeholder="https://your-payment-gateway-endpoint.com/pay"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                    <p className="text-[10px] text-neutral-500">
                      Payment payload (₹{finalTotal}) will be dispatched to this custom endpoint. Orders will be verified automatically.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Amount Recap */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                <div>
                  <span className="text-[11px] text-neutral-500 font-medium block">Total Payable</span>
                  <span className="text-xl font-black text-neutral-900">₹{finalTotal}</span>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Includes ₹{savings} total savings
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Place Order CTA */}
            <div className="p-5 border-t border-neutral-100 bg-white sticky bottom-0 z-10">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-75 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting to Payment Gateway...
                  </span>
                ) : (
                  <>
                    <span>Place Order • ₹{finalTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
