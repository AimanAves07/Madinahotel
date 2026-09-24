import React from 'react';
import { Users, Utensils, Calendar, ShieldCheck, HeartHandshake, Coffee } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Main Interior Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="Namma Oota Restaurant Interior with warm lighting and family tables"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                    Welcome to Our Dining Hall
                  </span>
                  <p className="text-sm font-semibold">
                    Spacious, clean, and air-conditioned for 60 guests
                  </p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Family Owned</div>
                  <div className="text-sm font-extrabold text-slate-900">Crafted with Love</div>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Specific Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-3">
                Our Story
              </span>
              <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Authentic Flavors in the Heart of Channapatna
              </h2>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              <strong>{RESTAURANT_INFO.name}</strong> is a family-owned restaurant bringing authentic Indian flavors to the heart of Channapatna. Our goal is simple — serve fresh, tasty and affordable food in a welcoming environment.
            </p>

            {/* Prompt Specific Key Data Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase text-slate-500">Established</span>
                </div>
                <div className="font-['Outfit',sans-serif] text-xl font-extrabold text-slate-900">
                  {RESTAURANT_INFO.established}
                </div>
                <div className="text-[11px] text-slate-500">Serving pure taste</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Utensils className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase text-slate-500">Speciality</span>
                </div>
                <div className="font-['Outfit',sans-serif] text-sm font-extrabold text-slate-900 leading-tight">
                  South & North Indian
                </div>
                <div className="text-[11px] text-slate-500">Dosas, Biryanis & Curries</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase text-slate-500">Capacity</span>
                </div>
                <div className="font-['Outfit',sans-serif] text-xl font-extrabold text-slate-900">
                  {RESTAURANT_INFO.seatingCapacity} People
                </div>
                <div className="text-[11px] text-slate-500">Comfortable seating</div>
              </div>
            </div>

            {/* Core Values Checklist */}
            <div className="pt-2 space-y-2.5">
              {RESTAURANT_INFO.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
