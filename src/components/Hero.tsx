import React from 'react';
import { Search, MapPin, Building2, SlidersHorizontal, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { FilterState } from '../types';

interface HeroProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onSearchSubmit: () => void;
  onOpenPrivateRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filterState,
  onFilterChange,
  onSearchSubmit,
  onOpenPrivateRegister
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#FAF8F5]">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F4EFEB]/50 pointer-events-none -z-10" />
      <div className="absolute top-48 left-8 w-64 h-64 rounded-full bg-[#EFE9DF]/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Brand Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-10 bg-[#C5A880]" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A7366] font-medium">
            Touch of Valentine Homes • Architectural Division
          </span>
        </div>

        {/* Hero Title and Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-8">
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.06] text-[#161513] tracking-tight">
              Curating <span className="italic font-normal">Architectural</span> Masterpieces & Exceptional Living
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-[#5A544A] text-base md:text-lg leading-relaxed font-sans mb-6 font-light">
              TOV is a private real estate advisory dedicated to rare, emotionally resonant residences across Beverly Hills, Manhattan, Aspen, Palm Beach, and Europe.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={onOpenPrivateRegister}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#161513] border-b border-[#161513] pb-1 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors cursor-pointer"
                id="hero-private-register-btn"
              >
                Access Confidential Off-Market Register
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Editorial Imagery Showcase with Maison Fav layout */}
        <div className="relative mb-12 group overflow-hidden border border-[#E8E2D8] bg-[#161513]">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=88"
              alt="The Bel Air Horizon Sanctuary - Touch of Valentine Homes"
              className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-1000"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Overlaid Editorial Caption */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 flex flex-col sm:flex-row sm:items-end justify-between text-[#FAF8F5] gap-4">
              <div>
                <span className="inline-block bg-[#FAF8F5]/15 backdrop-blur-md px-3 py-1 text-[11px] uppercase tracking-widest text-[#E8E2D8] mb-2 border border-white/20">
                  Signature Architectural Feature
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white">
                  The Bel Air Horizon Sanctuary
                </h3>
                <p className="text-xs sm:text-sm text-[#D1C9BC] font-sans">
                  Cantilevered Roman Travertine & 90ft Horizon Pool • Offered at $38,500,000
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#FAF8F5]/80 font-sans tracking-widest uppercase hidden md:inline">
                  Touch of Valentine Monogram Portfolio
                </span>
                <div className="w-9 h-9 border border-white/30 flex items-center justify-center text-xs font-editorial text-white bg-black/30 backdrop-blur-xs">
                  TOV
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Search Filter Console */}
        <div className="bg-white border border-[#E5DFD5] shadow-xl p-4 sm:p-6 relative z-20 -mt-16 sm:-mt-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Keyword / Location Search */}
            <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#EAE5DC] pb-3 sm:pb-0 sm:pr-4">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C8477] mb-1.5 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#C5A880]" />
                Keyword or Residence
              </label>
              <input
                type="text"
                placeholder="e.g. Bel Air, Penthouse, Pool..."
                value={filterState.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="text-sm text-[#161513] placeholder-[#A9A296] focus:outline-hidden py-1 bg-transparent"
                id="hero-search-input"
              />
            </div>

            {/* Location Select */}
            <div className="flex flex-col border-b sm:border-b-0 lg:border-r border-[#EAE5DC] pb-3 sm:pb-0 sm:px-4">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C8477] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                Prime Destination
              </label>
              <select
                value={filterState.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="text-sm text-[#161513] bg-transparent focus:outline-hidden py-1 cursor-pointer"
                id="hero-location-select"
              >
                <option value="all">All Global Locations</option>
                <option value="Bel Air">Bel Air, Los Angeles</option>
                <option value="Beverly Hills">Beverly Hills, California</option>
                <option value="Tribeca">Tribeca, New York</option>
                <option value="Aspen">Aspen, Colorado</option>
                <option value="Palm Beach">Palm Beach Oceanfront</option>
                <option value="Malibu">Malibu, California</option>
                <option value="Paris">Paris 8th, France</option>
                <option value="Mayfair">Mayfair, London</option>
              </select>
            </div>

            {/* Property Type Select */}
            <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#EAE5DC] pb-3 sm:pb-0 sm:px-4">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C8477] mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                Property Type
              </label>
              <select
                value={filterState.propertyType}
                onChange={(e) => onFilterChange({ propertyType: e.target.value })}
                className="text-sm text-[#161513] bg-transparent focus:outline-hidden py-1 cursor-pointer"
                id="hero-property-type-select"
              >
                <option value="all">All Architectural Types</option>
                <option value="Architectural Villa">Architectural Villa</option>
                <option value="Penthouse Suite">Penthouse Suite</option>
                <option value="Waterfront Estate">Waterfront Estate</option>
                <option value="Historic Brownstone">Historic Townhouse</option>
                <option value="Modern Compound">Modern Compound</option>
                <option value="Chalet">Alpine Chalet</option>
              </select>
            </div>

            {/* CTA Search Button */}
            <div className="flex items-center sm:pl-4 pt-2 sm:pt-0">
              <button
                onClick={onSearchSubmit}
                className="w-full h-full min-h-[46px] bg-[#161513] hover:bg-[#2C2926] text-[#FAF8F5] text-xs uppercase tracking-[0.16em] font-medium py-3 px-5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="hero-search-cta"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Explore Portfolio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Maison Fav Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#EAE5DC] mt-12 text-center md:text-left">
          <div className="flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#161513]">
              $1.85B+
            </span>
            <span className="text-xs uppercase tracking-wider text-[#7B746B] mt-1">
              Private Volume Transacted
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#161513]">
              65%
            </span>
            <span className="text-xs uppercase tracking-wider text-[#7B746B] mt-1">
              Off-Market Discretion
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#161513]">
              Top 0.01%
            </span>
            <span className="text-xs uppercase tracking-wider text-[#7B746B] mt-1">
              Global Architectural Pedigree
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#161513]">
              4 Desks
            </span>
            <span className="text-xs uppercase tracking-wider text-[#7B746B] mt-1">
              LA • NY • London • Paris
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
