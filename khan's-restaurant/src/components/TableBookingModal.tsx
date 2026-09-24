import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Phone, User, MessageSquare, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { TableBooking } from '../types';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [seatingPreference, setSeatingPreference] = useState<'Indoor AC' | 'Traditional Family' | 'Window View'>('Traditional Family');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    const bookingId = `TBL-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: TableBooking = {
      bookingId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      guests: parseInt(guests, 10),
      date,
      time,
      seatingPreference,
      notes: notes.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    setConfirmedBooking(newBooking);
  };

  const handleDone = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-blue-300" />
            <div>
              <h2 className="font-['Outfit',sans-serif] text-lg font-bold">
                {confirmedBooking ? 'Reservation Confirmed' : `Reserve a Table at ${RESTAURANT_INFO.name}`}
              </h2>
              <p className="text-[11px] text-blue-200">
                Seating Capacity: {RESTAURANT_INFO.seatingCapacity} Guests • Channapatna
              </p>
            </div>
          </div>
          <button
            onClick={handleDone}
            className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {confirmedBooking ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
                Booking Reference #{confirmedBooking.bookingId}
              </span>
              <h3 className="font-['Outfit',sans-serif] text-2xl font-extrabold text-slate-900 mt-1">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We have saved a table for {confirmedBooking.customerName} on {confirmedBooking.date} at {confirmedBooking.time}.
              </p>
            </div>

            {/* Booking Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Party Size:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.guests} Guests</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Seating Preference:</span>
                <span className="font-bold text-blue-700">{confirmedBooking.seatingPreference}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.phone}</span>
              </div>
              {confirmedBooking.notes && (
                <div className="text-slate-600 pt-1">
                  <strong>Notes:</strong> {confirmedBooking.notes}
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Need to reschedule or add more guests? Call us directly at{' '}
              <strong className="text-blue-700">{RESTAURANT_INFO.phone}</strong>.
            </p>

            <button
              onClick={handleDone}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <optgroup label="Breakfast (7:00 AM - 11:30 AM)">
                    <option value="07:30">7:30 AM</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:30">10:30 AM</option>
                  </optgroup>
                  <optgroup label="Lunch (12:00 PM - 3:30 PM)">
                    <option value="12:30">12:30 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:30">2:30 PM</option>
                  </optgroup>
                  <optgroup label="Dinner (6:30 PM - 10:00 PM)">
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:15">8:15 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Seating Section
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Traditional Family', 'Indoor AC', 'Window View'] as const).map((pref) => (
                  <button
                    type="button"
                    key={pref}
                    onClick={() => setSeatingPreference(pref)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                      seatingPreference === pref
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Special Occasion / Dietary Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Birthday celebration, high chair needed, near quiet corner"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div className="bg-blue-50 text-blue-900 text-xs p-3 rounded-xl border border-blue-200 flex items-center gap-2.5">
              <Utensils className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>We hold reserved tables for up to 15 minutes past reservation time.</span>
            </div>

            <button
              id="confirm-table-reservation-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-colors cursor-pointer"
            >
              Confirm Reservation ({guests} Guests)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
