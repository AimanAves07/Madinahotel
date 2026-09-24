import React from 'react';
import { Star, Utensils, Calendar, ArrowRight, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onViewMenu: () => void;
  onOrderNow: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewMenu, onOrderNow, onBookTable }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24 lg:py-28">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Traditional Pattern Subtlety */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-repeat pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H22v2h18v2H22v2h18v2H22v2h18v2H22v2h18v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Information Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{RESTAURANT_INFO.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Taste the Tradition of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">Karnataka</span>
            </h1>

            {/* Hero Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Enjoy delicious South Indian and Indian cuisine prepared with fresh ingredients and traditional recipes. From crispy dosas to flavorful biryanis, there's something for everyone.
            </p>

            {/* Action Buttons: View Menu, Order Now, Book a Table */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-order-now-btn"
                onClick={onOrderNow}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-menu-btn"
                onClick={onViewMenu}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-slate-800 text-white border border-slate-700 font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-blue-400" />
                <span>View Menu</span>
              </button>

              <button
                id="hero-book-table-btn"
                onClick={onBookTable}
                className="px-6 py-3.5 rounded-xl border border-blue-400/50 hover:border-blue-400 text-blue-300 hover:text-white hover:bg-blue-900/40 font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">4.5 / 5.0</div>
                  <div className="text-xs text-slate-400">Top Rated Dining</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">7:00 AM – 10:30 PM</div>
                  <div className="text-xs text-slate-400">Open 7 Days a Week</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">100% Pure Ghee</div>
                  <div className="text-xs text-slate-400">Authentic Recipes</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">Channapatna</div>
                  <div className="text-xs text-slate-400">Market Road</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Showcase Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 group">
                <img
                  src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80"
                  alt="Crispy Masala Dosa with Chutney and Sambar at Namma Oota"
                  className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Card Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
                      Today's Kitchen Star
                    </span>
                    <h3 className="text-lg font-bold text-white">Crispy Masala Dosa</h3>
                    <p className="text-xs text-slate-300">Served with 2 chutneys & shallot sambar</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-400">₹80</span>
                    <span className="text-[11px] block text-emerald-400 font-medium">● Pure Veg</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Experience Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-blue-600 text-white p-3 rounded-xl shadow-xl border border-blue-400/40 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg">
                  ☕
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium text-blue-100">Signature Drink</div>
                  <div className="text-sm font-bold">Filter Coffee ₹40</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
