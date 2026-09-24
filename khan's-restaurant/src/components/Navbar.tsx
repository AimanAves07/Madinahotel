import React, { useState } from 'react';
import { UtensilsCrossed, Phone, Clock, ShoppingBag, Calendar, Menu, X, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onNavigateMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking,
  onNavigateMenu,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-blue-900 text-blue-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              Open Daily: {RESTAURANT_INFO.openingHours}
            </span>
            <span className="text-blue-400">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-300" />
              {RESTAURANT_INFO.location}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              Call: {RESTAURANT_INFO.phone}
            </a>
            <span className="bg-blue-800 text-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">
              Dine-in • Takeaway • Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="font-['Outfit',sans-serif] text-2xl font-bold tracking-tight text-slate-900 block leading-tight">
              {RESTAURANT_INFO.name}
            </span>
            <span className="text-xs text-blue-600 font-medium tracking-wide block">
              Authentic South & North Indian
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <a href="#hero" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#featured" className="hover:text-blue-600 transition-colors">
            Featured
          </a>
          <a href="#menu" onClick={onNavigateMenu} className="hover:text-blue-600 transition-colors">
            Menu
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            About Us
          </a>
          <a href="#reviews" className="hover:text-blue-600 transition-colors">
            Reviews
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">
            Contact
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Table Reservation Button */}
          <button
            id="book-table-nav-btn"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Table</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            id="cart-nav-btn"
            onClick={onOpenCart}
            aria-label="View Food Order Cart"
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-blue-950 text-xs font-bold px-2 py-0.5 rounded-full ml-1 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#featured"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Featured Dishes
            </a>
            <a
              href="#menu"
              onClick={() => {
                onNavigateMenu();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Full Menu
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              About Story
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Customer Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Location & Hours
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-lg border border-blue-600 text-blue-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-50"
            >
              <Calendar className="w-4 h-4" />
              Book a Table (60 Seater)
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-200"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              Call {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
