import React from 'react';
import { UtensilsCrossed, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenMenu }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-['Outfit',sans-serif] text-xl font-bold text-white tracking-tight">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {RESTAURANT_INFO.tagline}. Serving genuine South Indian tiffin, aromatic biryanis, and North Indian curries in Channapatna since {RESTAURANT_INFO.established}.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Pure Filter Kaapi & Fresh Ingredients</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-blue-400 transition-colors">
                  Featured Specialties
                </a>
              </li>
              <li>
                <a href="#menu" onClick={onOpenMenu} className="hover:text-blue-400 transition-colors">
                  Full Food Menu (14 Items)
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Our Restaurant
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-blue-400 transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Reserve a Table (60 Seats)
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Service */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white uppercase tracking-wider">
              Service Hours
            </h4>
            <p className="text-slate-300 font-semibold">{RESTAURANT_INFO.operatingDays}</p>
            <p className="text-blue-400 text-sm font-bold">{RESTAURANT_INFO.openingHours}</p>
            <div className="pt-1 space-y-1 text-[11px] text-slate-400">
              <p>• Dine-in: 7:00 AM – 10:30 PM</p>
              <p>• Takeaway: 7:00 AM – 10:30 PM</p>
              <p>• Home Delivery: 8:00 AM – 10:00 PM</p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white uppercase tracking-wider">
              Visit Us
            </h4>
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneClean}`} className="hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic South Indian & Indian cuisine lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
