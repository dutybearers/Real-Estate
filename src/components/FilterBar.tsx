import React from 'react';
import { FilterState } from '../types';
import { 
  SlidersHorizontal, 
  MapPin, 
  Building2, 
  DollarSign, 
  Bed, 
  RotateCcw, 
  LayoutGrid, 
  Map, 
  Columns2
} from 'lucide-react';

interface FilterBarProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  viewMode: 'grid' | 'split' | 'map';
  onViewModeChange: (mode: 'grid' | 'split' | 'map') => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalResults
}) => {
  const isFiltered =
    filterState.searchQuery !== '' ||
    filterState.propertyType !== 'all' ||
    filterState.location !== 'all' ||
    filterState.minPrice > 0 ||
    filterState.maxPrice < 65000000 ||
    filterState.beds !== 'any' ||
    filterState.status !== 'all';

  const priceOptions = [
    { label: 'All Price Ranges', min: 0, max: 65000000 },
    { label: 'Under $25,000,000', min: 0, max: 25000000 },
    { label: '$25,000,000 - $35,000,000', min: 25000000, max: 35000000 },
    { label: '$35,000,000 - $45,000,000', min: 35000000, max: 45000000 },
    { label: '$45,000,000+', min: 45000000, max: 65000000 }
  ];

  return (
    <div id="filter-bar" className="bg-white border-y border-[#EAE5DC] sticky top-[72px] lg:top-[98px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Main Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Property Type Dropdown */}
            <div className="relative">
              <select
                value={filterState.propertyType}
                onChange={(e) => onFilterChange({ propertyType: e.target.value })}
                className="appearance-none bg-[#FAF8F5] border border-[#E2DDD3] text-xs uppercase tracking-wider font-medium text-[#161513] py-2 px-3.5 pr-8 focus:outline-hidden focus:border-[#161513] cursor-pointer"
                id="filter-property-type"
              >
                <option value="all">Type: All Residences</option>
                <option value="Architectural Villa">Architectural Villa</option>
                <option value="Penthouse Suite">Penthouse Suite</option>
                <option value="Waterfront Estate">Waterfront Estate</option>
                <option value="Historic Brownstone">Historic Townhouse</option>
                <option value="Modern Compound">Modern Compound</option>
                <option value="Chalet">Alpine Chalet</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8C8477]">
                <Building2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <select
                value={filterState.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="appearance-none bg-[#FAF8F5] border border-[#E2DDD3] text-xs uppercase tracking-wider font-medium text-[#161513] py-2 px-3.5 pr-8 focus:outline-hidden focus:border-[#161513] cursor-pointer"
                id="filter-location"
              >
                <option value="all">Location: Global</option>
                <option value="Bel Air">Bel Air, CA</option>
                <option value="Beverly Hills">Beverly Hills, CA</option>
                <option value="Tribeca">Tribeca, NY</option>
                <option value="Aspen">Aspen, CO</option>
                <option value="Palm Beach">Palm Beach, FL</option>
                <option value="Malibu">Malibu, CA</option>
                <option value="Paris">Paris 8th, FR</option>
                <option value="Mayfair">Mayfair, UK</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8C8477]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Price Range Dropdown */}
            <div className="relative">
              <select
                value={`${filterState.minPrice}-${filterState.maxPrice}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  onFilterChange({ minPrice: min, maxPrice: max });
                }}
                className="appearance-none bg-[#FAF8F5] border border-[#E2DDD3] text-xs uppercase tracking-wider font-medium text-[#161513] py-2 px-3.5 pr-8 focus:outline-hidden focus:border-[#161513] cursor-pointer"
                id="filter-price-range"
              >
                {priceOptions.map((opt) => (
                  <option key={`${opt.min}-${opt.max}`} value={`${opt.min}-${opt.max}`}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8C8477]">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bedrooms Dropdown */}
            <div className="relative hidden sm:block">
              <select
                value={filterState.beds === 'any' ? 'any' : String(filterState.beds)}
                onChange={(e) =>
                  onFilterChange({ beds: e.target.value === 'any' ? 'any' : Number(e.target.value) })
                }
                className="appearance-none bg-[#FAF8F5] border border-[#E2DDD3] text-xs uppercase tracking-wider font-medium text-[#161513] py-2 px-3.5 pr-8 focus:outline-hidden focus:border-[#161513] cursor-pointer"
                id="filter-bedrooms"
              >
                <option value="any">Beds: Any</option>
                <option value="4">4+ Suites</option>
                <option value="5">5+ Suites</option>
                <option value="6">6+ Suites</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8C8477]">
                <Bed className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#A13A3A] hover:text-[#7A1F1F] font-semibold py-1.5 px-2 transition-colors cursor-pointer"
                id="filter-reset-btn"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Right Side: View Mode and Sort */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            {/* Results count */}
            <span className="text-xs text-[#7B746B] font-sans">
              <strong className="text-[#161513] font-semibold">{totalResults}</strong> residences found
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filterState.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="bg-transparent border-0 text-xs uppercase tracking-wider font-medium text-[#161513] py-1.5 pr-6 focus:outline-hidden cursor-pointer"
                id="filter-sort-by"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="sqft-desc">Size: Largest Sq Ft</option>
              </select>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center border border-[#E2DDD3] bg-[#FAF8F5] p-0.5">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#161513] text-[#FAF8F5]'
                    : 'text-[#655F55] hover:text-[#161513]'
                }`}
                title="Curated Grid View"
                aria-label="Grid View"
                id="view-mode-grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('split')}
                className={`p-1.5 transition-colors cursor-pointer hidden md:block ${
                  viewMode === 'split'
                    ? 'bg-[#161513] text-[#FAF8F5]'
                    : 'text-[#655F55] hover:text-[#161513]'
                }`}
                title="Split Map & Listings View"
                aria-label="Split View"
                id="view-mode-split"
              >
                <Columns2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('map')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-[#161513] text-[#FAF8F5]'
                    : 'text-[#655F55] hover:text-[#161513]'
                }`}
                title="Full Interactive Map View"
                aria-label="Map View"
                id="view-mode-map"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
