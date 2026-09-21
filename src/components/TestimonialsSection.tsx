import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { ChevronLeft, ChevronRight, Quote, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const active = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8C8477]">
                Client Testimonials & Discretion
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#161513]">
              Endorsements of Distinction
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#D5CDC0] bg-white hover:bg-[#161513] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-[#D5CDC0] bg-white hover:bg-[#161513] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Showcase */}
        <div className="bg-white border border-[#E5DFD5] shadow-xl p-8 sm:p-14 relative overflow-hidden">
          <Quote className="absolute -top-6 -right-6 w-36 h-36 text-[#F4F1EA] pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#846332] bg-[#C5A880]/15 px-2.5 py-1 mb-6">
                <Award className="w-3 h-3 text-[#C5A880]" />
                Verified Private Transaction Record
              </span>

              <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.3] text-[#161513] mb-8">
                “{active.quote}”
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={active.avatar}
                  alt={active.clientName}
                  className="w-13 h-13 rounded-full object-cover border-2 border-[#C5A880]"
                />
                <div>
                  <h4 className="font-editorial text-xl font-medium text-[#161513]">
                    {active.clientName}
                  </h4>
                  <p className="text-xs text-[#7B746B] font-sans">
                    {active.clientTitle} • {active.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FAF8F5] p-6 border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-wider text-[#8C8477] font-semibold block mb-2">
                Transaction Profile
              </span>
              <div className="space-y-3 text-xs font-sans">
                <div>
                  <span className="text-[#8C8477] block text-[10px] uppercase">Engagement</span>
                  <span className="font-semibold text-[#161513]">{active.transaction}</span>
                </div>
                <div>
                  <span className="text-[#8C8477] block text-[10px] uppercase">Year Completed</span>
                  <span className="font-semibold text-[#161513]">{active.year}</span>
                </div>
                <div>
                  <span className="text-[#8C8477] block text-[10px] uppercase">Fiduciary Discretion</span>
                  <span className="font-semibold text-[#161513]">Strict NDA Off-Market Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 mini cards on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-6 border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-white border-[#161513] shadow-md'
                  : 'bg-[#FAF8F5] border-[#EAE5DC] hover:border-[#D5CDC0]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-editorial text-lg text-[#161513] font-medium truncate">
                  {t.clientName}
                </span>
                <span className="text-[10px] text-[#8C8477] uppercase tracking-wider">{t.year}</span>
              </div>
              <p className="text-xs text-[#5C5549] line-clamp-2 leading-relaxed mb-3">
                “{t.quote}”
              </p>
              <span className="text-[11px] text-[#846332] font-semibold block truncate">
                {t.transaction}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
