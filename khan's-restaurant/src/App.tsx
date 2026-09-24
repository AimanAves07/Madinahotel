import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TableBookingModal } from './components/TableBookingModal';
import { MENU_ITEMS } from './data/restaurantData';
import { MenuItem, CartItem, OrderType, OrderDetails } from './types';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('namma_oota_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('Delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('namma_oota_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.warn('Could not save cart state:', err);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to cart`);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: OrderDetails) => {
    handleClearCart();
    showToast(`Order #${order.orderId} placed successfully!`);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const featuredItems = MENU_ITEMS.filter((item) => item.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateMenu={() => scrollToSection('menu')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onViewMenu={() => scrollToSection('menu')}
          onOrderNow={() => {
            scrollToSection('menu');
            if (cartItems.length > 0) setIsCartOpen(true);
          }}
          onBookTable={() => setIsBookingOpen(true)}
        />

        {/* Featured Dishes Section (4 requested dishes) */}
        <FeaturedDishes
          featuredItems={featuredItems}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onExploreFullMenu={() => scrollToSection('menu')}
        />

        {/* Full Dynamic Menu Section (14 dishes, categories, search, veg/non-veg filter) */}
        <MenuSection
          items={MENU_ITEMS}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* About Us Section */}
        <AboutSection />

        {/* Customer Reviews Section */}
        <ReviewsSection />

        {/* Contact & Hours Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenMenu={() => scrollToSection('menu')}
      />

      {/* Floating Bottom Cart Bar for Mobile & Quick Orders */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-5 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl shadow-xl shadow-blue-600/30 font-bold text-sm flex items-center justify-between sm:gap-4 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-700 flex items-center justify-center text-xs">
                {totalCartCount}
              </div>
              <div className="text-left">
                <span className="block text-xs text-blue-200">View Order</span>
                <span className="font-['Outfit',sans-serif] text-sm">₹{totalCartPrice}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold pl-4">
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        onOrderPlaced={handleOrderPlaced}
      />

      <TableBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
