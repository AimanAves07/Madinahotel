import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact & Location
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Visit us in Channapatna, call ahead for takeout, or enquire about bulk catering and private family parties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Details Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                    {RESTAURANT_INFO.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium">{RESTAURANT_INFO.tagline}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Restaurant Address</span>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {RESTAURANT_INFO.address}
                    </span>
                    <span className="text-xs text-blue-600 font-semibold mt-1 inline-block">
                      Landmark: Central Market Road, near Channapatna Craft Hub
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Telephone</span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneClean}`}
                      className="text-blue-700 hover:text-blue-900 font-semibold block mt-0.5 text-base"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <span className="text-xs text-slate-500">
                      Table booking, takeout and quick delivery queries
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Address</span>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-blue-700 hover:text-blue-900 font-medium block mt-0.5"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-blue-300 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold">Operating Hours</h3>
                  <p className="text-xs text-blue-200">Open all 7 days of the week</p>
                </div>
              </div>

              <div className="bg-blue-950/60 rounded-xl p-4 border border-blue-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-300 block font-medium">
                    {RESTAURANT_INFO.operatingDays}
                  </span>
                  <span className="font-['Outfit',sans-serif] text-2xl font-black text-white">
                    {RESTAURANT_INFO.openingHours}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                    ● Kitchen Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs text-blue-200 pt-1">
                <div className="bg-blue-800/60 p-2 rounded-lg font-semibold">Breakfast & Kaapi</div>
                <div className="bg-blue-800/60 p-2 rounded-lg font-semibold">Executive Meals</div>
                <div className="bg-blue-800/60 p-2 rounded-lg font-semibold">Tandoor & Dinner</div>
              </div>
            </div>
          </div>

          {/* Quick Enquiry / Catering Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900 mb-1">
              Send an Enquiry or Catering Request
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Have a special catering requirement or feedback for the chef? Send us a note!
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-3 bg-blue-50/60 rounded-xl border border-blue-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Our manager will reach back to you at <strong>{phone || email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Karthik Rao"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="karthik@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Message / Requirement <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your event, bulk food order, or general inquiry..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
