import React from 'react';
import { Property } from '../types';
import { X, Trash2, Calendar, ArrowRight, Heart } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectProperty,
  onScheduleTour
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in" id="favorites-drawer">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EAE5DC] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAE5DC] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C5A880] fill-[#C5A880]" />
              <h3 className="font-editorial text-2xl text-[#161513]">
                Saved Residences ({favorites.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#555] hover:text-[#161513] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of saved homes */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-[#D5CDC0] mx-auto mb-3 stroke-[1.2]" />
                <h4 className="font-editorial text-xl text-[#161513] mb-1">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-[#7B746B] max-w-xs mx-auto leading-relaxed">
                  Click the heart icon on any residence to bookmark properties for private comparison or tour scheduling.
                </p>
              </div>
            ) : (
              favorites.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white border border-[#EAE5DC] p-3.5 flex gap-3.5 group hover:border-[#C5A880] transition-colors"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-24 h-24 object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#8C8477] block truncate">
                        {prop.location}
                      </span>
                      <h4
                        onClick={() => {
                          onSelectProperty(prop);
                          onClose();
                        }}
                        className="font-editorial text-base text-[#161513] font-medium truncate group-hover:text-[#9A7B4F] cursor-pointer"
                      >
                        {prop.title}
                      </h4>
                      <span className="font-editorial text-base text-[#161513] font-semibold block mt-0.5">
                        {prop.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EAE5DC]/80">
                      <button
                        onClick={() => {
                          onScheduleTour(prop);
                          onClose();
                        }}
                        className="text-[10px] uppercase tracking-wider text-[#161513] hover:text-[#C5A880] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3" />
                        Book Tour
                      </button>

                      <button
                        onClick={() => onRemoveFavorite(prop.id)}
                        className="text-[#9A9387] hover:text-rose-600 transition-colors cursor-pointer p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          {favorites.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE5DC] space-y-3">
              <button
                onClick={() => {
                  onScheduleTour(favorites[0]);
                  onClose();
                }}
                className="w-full bg-[#161513] hover:bg-[#2C2926] text-white py-3 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                Schedule Tour for All Saved Homes
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
