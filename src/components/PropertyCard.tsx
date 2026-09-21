import React, { useState } from 'react';
import { Property } from '../types';
import { Heart, ChevronLeft, ChevronRight, Bed, Bath, Maximize2, Calendar, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onScheduleTour
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group bg-white border border-[#EAE5DC] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D5CDC0] cursor-pointer"
      id={`property-card-${property.id}`}
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[4/3] w-full bg-[#161513] overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-1.5">
          <span
            className={`text-[10px] font-sans font-semibold uppercase tracking-[0.14em] px-2.5 py-1 backdrop-blur-xs border ${
              property.status === 'Exclusive Off-Market'
                ? 'bg-[#161513]/90 text-[#FAF8F5] border-[#C5A880]'
                : property.status === 'Private Treaty'
                ? 'bg-[#2A2723]/90 text-[#E8E2D8] border-[#AFA89E]'
                : 'bg-white/90 text-[#161513] border-white/40'
            }`}
          >
            {property.status}
          </span>
          {property.isFeatured && (
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] px-2 py-1 bg-[#C5A880] text-[#161513] flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              TOV Curated
            </span>
          )}
        </div>

        {/* Favorite Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
          aria-label={isFavorite ? 'Remove from saved' : 'Save property'}
          id={`favorite-btn-${property.id}`}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isFavorite ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'
            }`}
          />
        </button>

        {/* Image Navigation Arrows (Desktop visible on group hover) */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-xs"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-xs"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Carousel Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
            {property.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'w-4 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Architect */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#8C8477] mb-1.5 font-medium">
            <span>{property.location}</span>
            {property.architect && (
              <span className="truncate max-w-[140px] text-right" title={property.architect}>
                {property.architect}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-editorial text-xl font-medium text-[#161513] group-hover:text-[#9A7B4F] transition-colors leading-snug line-clamp-1 mb-1">
            {property.title}
          </h3>

          {/* Subtitle / Teaser */}
          <p className="text-xs text-[#6A6357] line-clamp-2 leading-relaxed mb-4 font-sans">
            {property.subtitle}
          </p>
        </div>

        {/* Bottom Specifications Bar */}
        <div>
          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#EAE5DC] text-[#423D35] text-xs font-sans mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#8C8477]" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#8C8477]" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#8C8477]" />
              <span>{property.sqft.toLocaleString()} sq ft</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block leading-none mb-1">
                Guide Price
              </span>
              <span className="font-editorial text-2xl font-medium text-[#161513]">
                {property.priceFormatted}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onScheduleTour(property);
                }}
                className="bg-[#FAF8F5] hover:bg-[#161513] hover:text-[#FAF8F5] text-[#161513] border border-[#D5CDC0] text-[11px] uppercase tracking-wider font-semibold py-2 px-3 transition-colors flex items-center gap-1 cursor-pointer"
                title="Book a private tour"
              >
                <Calendar className="w-3 h-3" />
                Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
