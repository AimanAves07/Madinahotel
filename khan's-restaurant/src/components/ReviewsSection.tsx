import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, MapPin } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Karnataka',
      rating,
      comment: comment.trim(),
      date: 'Just now',
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
      setAuthor('');
      setLocation('');
      setComment('');
      setRating(5);
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-3">
              Real Diners, Real Love
            </span>
            <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Hear what our regular guests and highway travelers have to say about {RESTAURANT_INFO.name}.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-sm border border-blue-200 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-['Outfit',sans-serif] text-sm font-bold text-slate-900">
                    — {rev.author}
                  </div>
                  <div className="text-xs text-blue-700 font-medium">
                    {rev.location}
                  </div>
                </div>
                {rev.date && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    {rev.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 relative">
            <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900 mb-1">
              Share Your Dining Experience
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Your feedback helps {RESTAURANT_INFO.name} continually serve the best taste.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-base font-bold text-slate-800">Thank you for your review!</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className={`p-2 rounded-lg border flex items-center gap-1 text-sm font-bold transition-colors cursor-pointer ${
                          rating >= s
                            ? 'bg-blue-50 border-blue-500 text-blue-800'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Anand"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mandya / Mysore / Bengaluru"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what dish you tried and how it tasted..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
