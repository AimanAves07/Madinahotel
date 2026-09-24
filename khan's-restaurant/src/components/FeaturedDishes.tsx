import React from 'react';
import { Star, Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface FeaturedDishesProps {
  featuredItems: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onExploreFullMenu: () => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  featuredItems,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onExploreFullMenu,
}) => {
  const getCartQuantity = (itemId: string) => {
    const item = cartItems.find((ci) => ci.item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="featured" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
              <Star className="w-3.5 h-3.5 fill-blue-600" />
              Customer Favorites
            </div>
            <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Dishes
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              Hand-picked culinary highlights cherished by local foodies and travelers on Bangalore-Mysore Highway.
            </p>
          </div>

          <button
            onClick={onExploreFullMenu}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>Explore Full 14-Item Menu</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* 4 Featured Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((dish) => {
            const quantity = getCartQuantity(dish.id);

            return (
              <div
                key={dish.id}
                id={`featured-card-${dish.id}`}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Veg / Non-Veg Standard Indicator */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs flex items-center justify-center">
                      <div
                        className={`w-4 h-4 border-2 flex items-center justify-center ${
                          dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                        }`}
                        title={dish.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Category Pill */}
                    <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {dish.category}
                    </span>

                    {/* Spicy indicator if applicable */}
                    {dish.spicyLevel && dish.spicyLevel > 1 && (
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 text-amber-300 text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-amber-400" />
                        <span>Spiced</span>
                      </div>
                    )}
                  </div>

                  {/* Dish Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 leading-snug">
                        {dish.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{dish.rating || 4.8}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price & Add to Cart Controls */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block leading-none">Price</span>
                    <span className="font-['Outfit',sans-serif] text-xl font-extrabold text-blue-700">
                      ₹{dish.price}
                    </span>
                  </div>

                  {quantity === 0 ? (
                    <button
                      id={`add-featured-${dish.id}`}
                      onClick={() => onAddToCart(dish)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(dish.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-blue-700 hover:bg-blue-100 font-bold text-sm shadow-xs transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-blue-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(dish.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm shadow-xs transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
