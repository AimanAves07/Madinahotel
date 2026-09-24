import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, X, Utensils, SlidersHorizontal, Flame, Star } from 'lucide-react';
import { MenuItem, MenuCategory, CartItem } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: MenuCategory[] = [
    'All',
    'South Indian',
    'Breakfast',
    'North Indian',
    'Biryani',
    'Rice',
    'Starter',
    'Beverage',
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Veg filter match
      if (vegFilter === 'veg' && !item.isVeg) return false;
      if (vegFilter === 'non-veg' && item.isVeg) return false;

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [items, selectedCategory, vegFilter, searchQuery]);

  const getCartQuantity = (itemId: string) => {
    const ci = cartItems.find((c) => c.item.id === itemId);
    return ci ? ci.quantity : 0;
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-3">
            Handcrafted With Passion
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Complete Menu
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Prepared fresh to order using heirloom spices, farm-fresh dairy, and authentic South & North Indian culinary methods.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 mb-10 space-y-4 shadow-xs">
          {/* Top Row: Search bar & Dietary toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dosas, biryani, starters, coffee..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Veg / Non-Veg Quick Selector */}
            <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setVegFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  vegFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Diet
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  vegFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-300" />
                Pure Veg
              </button>
              <button
                onClick={() => setVegFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  vegFilter === 'non-veg'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-rose-700'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-300" />
                Non-Veg
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count Indicator & Active Filter Tag */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredItems.length}</strong> items
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          {(selectedCategory !== 'All' || vegFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setVegFilter('all');
                setSearchQuery('');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getCartQuantity(item.id);

              return (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-4 p-4 sm:p-5">
                    {/* Item Image */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Dietary Icon */}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs">
                        <div
                          className={`w-3.5 h-3.5 border-2 flex items-center justify-center ${
                            item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                          {item.isFeatured && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                              ★ Chef Special
                            </span>
                          )}
                        </div>

                        <h3 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900 truncate">
                          {item.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-['Outfit',sans-serif] text-lg font-black text-blue-700">
                          ₹{item.price}
                        </span>

                        {qty === 0 ? (
                          <button
                            id={`add-to-cart-${item.id}`}
                            onClick={() => onAddToCart(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="flex items-center bg-blue-50 border border-blue-300 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-blue-700 hover:bg-blue-100 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-blue-900">
                              {qty}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Utensils className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No dishes match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your category, diet preference, or search terms to find dishes from Namma Oota.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setVegFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
            >
              Show All 14 Menu Items
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
