import React from 'react';
import { NEIGHBORHOODS } from '../data/neighborhoods';
import { ArrowUpRight, Compass, MapPin } from 'lucide-react';

interface NeighborhoodsSectionProps {
  onSelectNeighborhood: (neighborhoodName: string) => void;
}

export const NeighborhoodsSection: React.FC<NeighborhoodsSectionProps> = ({
  onSelectNeighborhood
}) => {
  return (
    <section id="neighborhoods" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8C8477]">
                Areas of Distinction
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#161513]">
              Curated Prime Destinations
            </h2>
          </div>
          <p className="text-sm text-[#655F55] max-w-md mt-4 md:mt-0 font-sans font-light leading-relaxed">
            Touch of Valentine maintains permanent private treaty desks across the world’s most sought-after architectural and cultural epicenters.
          </p>
        </div>

        {/* Neighborhoods Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEIGHBORHOODS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNeighborhood(item.name)}
              className="group relative bg-white border border-[#EAE5DC] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#C5A880]/60 cursor-pointer"
              id={`destination-card-${item.id}`}
            >
              {/* Photo */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#161513]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-[#161513]">
                  {item.region}
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="font-editorial text-2xl text-white font-medium">
                      {item.name}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#C5A880] group-hover:text-[#161513] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Description & Average Benchmark */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#5C5549] leading-relaxed mb-4 font-sans">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#EAE5DC] text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block">Avg Benchmark</span>
                    <span className="font-editorial text-lg font-medium text-[#161513]">{item.averagePrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block">Active Portfolio</span>
                    <span className="text-xs font-semibold text-[#161513]">{item.propertyCount} Residences</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
