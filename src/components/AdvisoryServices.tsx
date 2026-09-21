import React from 'react';
import { SERVICES } from '../data/testimonials';
import { Shield, Compass, Globe, TrendingUp, Check, ArrowRight } from 'lucide-react';

interface AdvisoryServicesProps {
  onOpenContact: () => void;
  onOpenPrivateRegister: () => void;
}

export const AdvisoryServices: React.FC<AdvisoryServicesProps> = ({
  onOpenContact,
  onOpenPrivateRegister
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#C5A880]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#C5A880]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#C5A880]" />;
      default:
        return <TrendingUp className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-t border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C8477]">
                Private Advisory Pillars
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#161513]">
              Bespoke Real Estate Representation
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#161513] border-b border-[#161513] pb-1 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors cursor-pointer"
            >
              Consult With a Principal Advisor
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#FAF8F5] border border-[#EAE5DC] p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]/50"
              id={`service-card-${srv.id}`}
            >
              <div>
                <div className="w-10 h-10 bg-white border border-[#E2DDD3] flex items-center justify-center mb-6">
                  {getIcon(srv.icon)}
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#8C8477] block mb-1">
                  {srv.tagline}
                </span>
                <h3 className="font-editorial text-2xl font-medium text-[#161513] mb-3 leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#5C5549] leading-relaxed mb-6 font-sans">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE5DC]">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-2">
                  Scope of Representation
                </span>
                <ul className="space-y-1.5">
                  {srv.deliverables.map((item, idx) => (
                    <li key={idx} className="text-[11px] text-[#2C2926] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Maison Fav Style Quote / Editorial Manifesto */}
        <div className="mt-16 bg-[#161513] text-[#FAF8F5] p-8 sm:p-14 border border-[#2C2926] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              The Touch of Valentine Standard
            </span>
            <blockquote className="font-editorial text-2xl sm:text-3xl font-normal leading-snug text-white">
              “A home is an emotional sanctuary, a sculptural manifestation of light, and an heirloom of your life’s legacy.”
            </blockquote>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={onOpenPrivateRegister}
              className="bg-[#C5A880] hover:bg-[#B39366] text-[#161513] px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer"
            >
              Access Off-Market Register
            </button>
            <button
              onClick={onOpenContact}
              className="border border-[#FAF8F5]/40 hover:border-white text-white px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer"
            >
              Private Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
