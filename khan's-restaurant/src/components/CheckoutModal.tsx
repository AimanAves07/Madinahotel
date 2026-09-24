import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, Phone, User, CreditCard, Sparkles, Receipt, ArrowLeft } from 'lucide-react';
import { CartItem, OrderType, OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType: initialOrderType,
  onOrderPlaced,
}) => {
  const [orderType, setOrderType] = useState<OrderType>(initialOrderType);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card'>('UPI');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const deliveryFee = orderType === 'Delivery' ? (subtotal >= 300 ? 0 : 30) : 0;
  const grandTotal = subtotal + gst + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }
    if (orderType === 'Delivery' && !address.trim()) {
      alert('Please enter your delivery address in Channapatna or surrounding areas.');
      return;
    }

    const orderId = `NO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderDetails = {
      orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      orderType,
      address: orderType === 'Delivery' ? address.trim() : undefined,
      tableNumber: orderType === 'Dine-in' ? tableNumber.trim() || 'Counter Assignment' : undefined,
      specialInstructions: specialInstructions.trim(),
      paymentMethod,
      items: [...cartItems],
      subtotal,
      tax: gst,
      deliveryFee,
      total: grandTotal,
      status: 'Confirmed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedOrder(newOrder);
    onOrderPlaced(newOrder);
  };

  const resetForm = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Receipt className="w-5 h-5 text-blue-300" />
            <h2 className="font-['Outfit',sans-serif] text-lg font-bold">
              {confirmedOrder ? 'Order Confirmed!' : 'Complete Your Order'}
            </h2>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {confirmedOrder ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
                {RESTAURANT_INFO.name} Kitchen Notification
              </span>
              <h3 className="font-['Outfit',sans-serif] text-2xl font-extrabold text-slate-900 mt-1">
                Order #{confirmedOrder.orderId} Confirmed
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Thank you, {confirmedOrder.customerName}! Your food is being freshly prepared with love.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-slate-200 pb-2 font-semibold text-slate-700">
                <span>Mode: <strong className="text-blue-700">{confirmedOrder.orderType}</strong></span>
                <span>Time: {confirmedOrder.createdAt}</span>
              </div>

              {confirmedOrder.address && (
                <div className="text-slate-600">
                  <strong>Delivery to:</strong> {confirmedOrder.address}
                </div>
              )}
              {confirmedOrder.tableNumber && (
                <div className="text-slate-600">
                  <strong>Table:</strong> {confirmedOrder.tableNumber}
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 space-y-1">
                {confirmedOrder.items.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between text-slate-700">
                    <span>
                      {quantity}x {item.name}
                    </span>
                    <span className="font-medium">₹{item.price * quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Amount Paid ({confirmedOrder.paymentMethod})</span>
                <span className="text-blue-700">₹{confirmedOrder.total}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3 text-left">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-xs text-blue-900">
                <span className="font-bold block">Estimated Ready Time: 20 – 30 Minutes</span>
                <span>We'll call you at {confirmedOrder.phone} for any kitchen updates.</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Dining Mode selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Delivery', 'Takeaway', 'Dine-in'] as OrderType[]).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      orderType === t
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Gowda"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address or Table Number */}
            {orderType === 'Delivery' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Delivery Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Landmark, Apartment or House No in Channapatna"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {orderType === 'Dine-in' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Table Number (Optional)
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 4 or leave empty for counter token"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            )}

            {/* Cooking Instructions */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Cooking Instructions / Notes
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Crisp dosa roasted, less spicy, extra chutney"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'Instant UPI', desc: 'GPay, PhonePe, Paytm' },
                  { id: 'Cash', label: 'Cash', desc: 'Pay on Delivery/Counter' },
                  { id: 'Card', label: 'Card', desc: 'Debit / Credit' },
                ].map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as 'Cash' | 'UPI' | 'Card')}
                    className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">{pm.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{pm.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total breakdown preview */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600">
                Total Payable: <strong className="text-slate-900">{cartItems.length} items</strong>
              </span>
              <span className="font-['Outfit',sans-serif] text-xl font-black text-blue-700">
                ₹{grandTotal}
              </span>
            </div>

            {/* Submit button */}
            <button
              id="submit-order-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              Confirm & Place Order (₹{grandTotal})
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
