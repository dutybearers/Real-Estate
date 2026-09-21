import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign 
} from 'lucide-react';
import { LeadSubmission } from '../types';

interface ValuationCalculatorProps {
  onCaptureValuationLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({
  onCaptureValuationLead
}) => {
  // Valuation inputs
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Beverly Hills, CA');
  const [propertyType, setPropertyType] = useState('Architectural Villa');
  const [sqft, setSqft] = useState(8500);
  const [beds, setBeds] = useState(5);
  const [baths, setBaths] = useState(7);
  const [condition, setCondition] = useState<'turnkey' | 'masterpiece' | 'restored'>('masterpiece');
  const [hasPool, setHasPool] = useState(true);
  const [hasWineCellar, setHasWineCellar] = useState(true);
  const [hasView, setHasView] = useState(true);
  const [hasSecurity, setHasSecurity] = useState(false);

  // Lead capture form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeframe, setTimeframe] = useState('3-6 Months');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calibration calculation
  const baseRatePerSqft: Record<string, number> = {
    'Architectural Villa': 2700,
    'Penthouse Suite': 3600,
    'Waterfront Estate': 3150,
    'Historic Brownstone': 2950,
    'Modern Compound': 2800,
    'Chalet': 3250
  };

  const conditionMultiplier = {
    turnkey: 1.0,
    masterpiece: 1.25,
    restored: 1.15
  }[condition];

  let amenityAddons = 0;
  if (hasPool) amenityAddons += 850000;
  if (hasWineCellar) amenityAddons += 450000;
  if (hasView) amenityAddons += 2500000;
  if (hasSecurity) amenityAddons += 600000;

  const baseRate = baseRatePerSqft[propertyType] || 2500;
  const calculatedEstimate = Math.round((sqft * baseRate * conditionMultiplier + amenityAddons) / 50000) * 50000;
  const lowRange = Math.round(calculatedEstimate * 0.94);
  const highRange = Math.round(calculatedEstimate * 1.06);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCaptureValuationLead({
      type: 'valuation',
      name,
      email,
      phone,
      timeframe,
      propertyDetails: {
        address: address || 'Private Prime Residence',
        propertyType,
        sqft,
        estimatedValue: calculatedEstimate
      },
      message: `Automated valuation estimate requested for ${address || 'Residence'} in ${city}. Estimated at $${(calculatedEstimate / 1000000).toFixed(2)}M.`
    });
    setIsSubmitted(true);
  };

  return (
    <section id="valuation" className="py-20 md:py-28 bg-[#F4F1EA] border-t border-[#EAE5DC] relative overflow-hidden">
      {/* Subtle architectural background line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#C5A880]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C8477]">
              Touch of Valentine Market Intelligence
            </span>
            <span className="w-6 h-px bg-[#C5A880]" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#161513] mb-4">
            Instant Private Property Valuation
          </h2>
          <p className="text-sm sm:text-base text-[#655F55] font-sans font-light leading-relaxed">
            Calibrated using proprietary micro-neighborhood sales, architectural pedigree indexes, and private treaty off-market transactions.
          </p>
        </div>

        {/* Valuation Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#E5DFD5] shadow-2xl p-6 sm:p-10">
          
          {/* Left Column: Interactive Parameters */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-[#EAE5DC] pb-4">
              <h3 className="font-editorial text-2xl text-[#161513] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#C5A880]" />
                1. Property Profile & Specifications
              </h3>
              <p className="text-xs text-[#7B746B] mt-1">
                Configure your residence parameters to generate an instant baseline estimate.
              </p>
            </div>

            {/* Address & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Street Address (Confidential)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10400 Bellagio Road"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E2DDD3] text-xs focus:outline-hidden focus:border-[#161513]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Prime Region / Market
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E2DDD3] text-xs focus:outline-hidden focus:border-[#161513]"
                >
                  <option>Beverly Hills, CA</option>
                  <option>Bel Air / Holmby Hills, CA</option>
                  <option>Tribeca / Soho, NY</option>
                  <option>Aspen / Red Mountain, CO</option>
                  <option>Palm Beach Oceanfront, FL</option>
                  <option>Malibu Bluffs, CA</option>
                  <option>Paris 8th / Rive Gauche, FR</option>
                  <option>Mayfair / Belgravia, London</option>
                </select>
              </div>
            </div>

            {/* Property Type & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Architectural Typology
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E2DDD3] text-xs focus:outline-hidden focus:border-[#161513]"
                >
                  <option>Architectural Villa</option>
                  <option>Penthouse Suite</option>
                  <option>Waterfront Estate</option>
                  <option>Historic Brownstone</option>
                  <option>Modern Compound</option>
                  <option>Chalet</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Finish & Architecture Pedigree
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E2DDD3] text-xs focus:outline-hidden focus:border-[#161513]"
                >
                  <option value="masterpiece">Architectural Masterwork / Bespoke</option>
                  <option value="turnkey">Ultra-Luxury Turnkey Standard</option>
                  <option value="restored">Heritage Meticulously Restored</option>
                </select>
              </div>
            </div>

            {/* Sqft Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477]">
                  Interior Living Area
                </span>
                <span className="font-editorial text-lg font-medium text-[#161513]">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="25000"
                step="250"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-[#161513] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C8477] mt-1">
                <span>3,000 sq ft</span>
                <span>12,000 sq ft</span>
                <span>25,000+ sq ft</span>
              </div>
            </div>

            {/* Beds and Baths */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Bedrooms
                </label>
                <div className="flex items-center border border-[#E2DDD3] bg-[#FAF8F5]">
                  {[3, 4, 5, 6, '7+'].map((num, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setBeds(typeof num === 'number' ? num : 7)}
                      className={`flex-1 py-2 text-xs font-medium cursor-pointer transition-colors ${
                        (typeof num === 'number' ? beds === num : beds >= 7)
                          ? 'bg-[#161513] text-white'
                          : 'text-[#555] hover:text-[#161513]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Bathrooms
                </label>
                <div className="flex items-center border border-[#E2DDD3] bg-[#FAF8F5]">
                  {[4, 5, 6, 8, '10+'].map((num, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setBaths(typeof num === 'number' ? num : 10)}
                      className={`flex-1 py-2 text-xs font-medium cursor-pointer transition-colors ${
                        (typeof num === 'number' ? baths === num : baths >= 10)
                          ? 'bg-[#161513] text-white'
                          : 'text-[#555] hover:text-[#161513]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Luxury Add-on Features */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-2">
                Trophy Property Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: 'Infinity Pool & Spa', checked: hasPool, toggle: () => setHasPool(!hasPool) },
                  { label: 'Wine Cellar / Cave', checked: hasWineCellar, toggle: () => setHasWineCellar(!hasWineCellar) },
                  { label: 'Panoramic Views', checked: hasView, toggle: () => setHasView(!hasView) },
                  { label: 'Gated Guardhouse', checked: hasSecurity, toggle: () => setHasSecurity(!hasSecurity) }
                ].map((amenity, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={amenity.toggle}
                    className={`p-2.5 border text-left flex items-center justify-between cursor-pointer transition-colors ${
                      amenity.checked
                        ? 'bg-[#161513] text-white border-[#161513]'
                        : 'bg-[#FAF8F5] text-[#555] border-[#E2DDD3] hover:border-[#161513]'
                    }`}
                  >
                    <span className="text-[11px] leading-tight">{amenity.label}</span>
                    <span className="text-[10px]">{amenity.checked ? '✓' : '+'}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Valuation Display & Lead Capture Form */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E5DFD5] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C8477]">
                  Instant Market Estimate
                </span>
                <span className="text-[10px] bg-[#C5A880]/20 text-[#846332] px-2 py-0.5 font-medium">
                  Confidential
                </span>
              </div>

              {/* Big Valuation Display */}
              <div className="py-4 border-b border-[#EAE5DC]">
                <span className="font-editorial text-4xl sm:text-5xl font-medium text-[#161513] block">
                  ${(calculatedEstimate / 1000000).toFixed(2)}M
                </span>
                <span className="text-xs text-[#7B746B] mt-1 block font-sans">
                  Target Range: ${(lowRange / 1000000).toFixed(2)}M – ${(highRange / 1000000).toFixed(2)}M
                </span>
                <span className="text-[11px] text-[#8C8477] mt-0.5 block">
                  Est. ${(Math.round(calculatedEstimate / sqft)).toLocaleString()} per sq ft
                </span>
              </div>

              {/* Lead Capture Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div className="mb-2">
                    <h4 className="font-editorial text-lg text-[#161513] font-medium leading-snug">
                      Claim Full 24-Page TOV Market Dossier
                    </h4>
                    <p className="text-[11px] text-[#6A6357] leading-relaxed">
                      Receive granular comps, international buyer pool demographics, and tailored off-market advisory.
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Charles Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="owner@estatemail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (310) 555-0198"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Target Timeframe
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    >
                      <option>Immediate Private Sale (0-3 Months)</option>
                      <option>Planning Stage (3-6 Months)</option>
                      <option>Curious / Annual Portfolio Review</option>
                      <option>Refinancing / Family Office Valuation</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#161513] hover:bg-[#2C2926] text-white py-3 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer shadow-md mt-3 flex items-center justify-center gap-2"
                    id="submit-valuation-lead"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                    Send Me Comprehensive Dossier
                  </button>
                </form>
              ) : (
                <div className="mt-6 p-5 bg-white border border-[#C5A880]/50 text-center animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto mb-2" />
                  <h4 className="font-editorial text-xl text-[#161513] mb-1">
                    Dossier Dispatched
                  </h4>
                  <p className="text-xs text-[#6A6357] leading-relaxed mb-4">
                    Thank you, {name}. A tailored 24-page valuation prospectus for {address || 'your residence'} (${(calculatedEstimate / 1000000).toFixed(2)}M) has been registered with our private desk.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs uppercase tracking-wider text-[#161513] font-semibold underline cursor-pointer"
                  >
                    Calculate Another Residence
                  </button>
                </div>
              )}
            </div>

            {/* Privacy Guarantee */}
            <div className="pt-4 mt-6 border-t border-[#EAE5DC] flex items-center gap-2 text-[10px] text-[#7B746B]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>
                Fiduciary standard. Your address and email are protected by institutional-grade non-disclosure protocols.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
