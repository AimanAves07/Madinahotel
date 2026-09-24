import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import { CartItem, OrderType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  orderType: OrderType;
  onChangeOrderType: (type: OrderType) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  onChangeOrderType,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0; // 10% discount
  const discountedSubtotal = subtotal - discountAmount;
  const gst = Math.round(discountedSubtotal * 0.05); // 5% GST

  // Delivery fee: ₹30 if Delivery and subtotal < ₹300, otherwise ₹0
  const deliveryFee = orderType === 'Delivery' ? (subtotal >= 300 ? 0 : 30) : 0;
  const total = discountedSubtotal + gst + deliveryFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'NAMMA10') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "NAMMA10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-blue-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center text-blue-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-['Outfit',sans-serif] text-lg font-bold text-white">Your Order</h2>
                <p className="text-xs text-blue-200">
                  {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {cartItems.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore our crispy dosas, flavorful biryanis, and filter coffee to start your order!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Toggle */}
              <div className="p-3 bg-slate-50 border-b border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 px-1">
                  Select Dining Mode
                </span>
                <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-slate-200">
                  {(['Delivery', 'Takeaway', 'Dine-in'] as OrderType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => onChangeOrderType(type)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        orderType === type
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
                {cartItems.map(({ item, quantity }) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-slate-100"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <span className="text-xs font-semibold text-blue-700">₹{item.price} each</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-700 hover:bg-slate-100 shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700 shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code box */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                {!discountApplied ? (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder='Coupon code (use "NAMMA10")'
                          className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs uppercase text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-600 px-1">{couponError}</p>}
                  </form>
                ) : (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      NAMMA10 applied (10% OFF)
                    </span>
                    <button
                      onClick={() => setDiscountApplied(false)}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 space-y-2 bg-white">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>Coupon Discount (10%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-slate-600">
                  <span>GST (5% Restaurant)</span>
                  <span className="font-semibold text-slate-800">₹{gst}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>
                    Delivery Charge {orderType === 'Delivery' && subtotal >= 300 && '(Free > ₹300)'}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {orderType === 'Delivery' ? (deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`) : '₹0'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-base font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="font-['Outfit',sans-serif] text-xl font-extrabold text-blue-700">
                    ₹{total}
                  </span>
                </div>

                <button
                  id="cart-checkout-proceed-btn"
                  onClick={onProceedToCheckout}
                  className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
